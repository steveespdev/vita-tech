import React, { useState } from 'react'
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from 'react-toastify';

//Function that obtains the price of dollar
function getDollarPrice() {
    axios.get("https://tipodecambio.paginasweb.cr/api")
        .then((response) => {
            console.log(response.data);
            if (response.data) {
                console.log("Precio compra: " + response.data.compra);
                return response.data.compra;
            } else {
                console.log("error");
            }
        });
}

// getDollarPrice();

function BuyerForm() {

    axios.defaults.withCredentials = true;
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [units, setUnits] = useState(1);

    //Function that rejects the input if it is not a integer number
    function validateCorrectExtension(e) {
        if (e % 1 === 0 && e <= 100) {
            console.log('Unidades: ' + e);
            setUnits(e);
        }
    }

    //Al enviar el formulario
    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/purchase", {
            name: name,
            lastName: lastName,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            units: units,
        }).then((response) => {
            // console.log(response.data);
            if (response.data.received) {
                toast.success(response.data.message, { position: "bottom-right" });
                setName("");
                setLastName("");
                setAddress("");
                setPhoneNumber("");
                setEmail("");
            } else {
                toast.info(response.data.message, { position: "bottom-right" });
                setName("");
                setLastName("");
                setAddress("");
                setPhoneNumber("");
                setEmail("");
                console.log("error");
            }
        });
    };

    return (
        <div align="left">
            <Card
                style={{
                    width: "25%",
                    marginTop: "25px",
                    marginLeft: "40px",
                    position: "relative",
                }}
            >
                <Card.Header style={{ fontSize: 20, marginBottom: 20 }}>
                    Ingrese sus datos de compra
                </Card.Header>
                <Card.Body style={{ textAlign: "left" }}>
                    <Form onSubmit={login}>
                        <Form.Group className="mb-2" controlId="formBasicText">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control required value={name} type="text" placeholder="Ingrese su nombre" onChange={(e) => {
                                setName(e.currentTarget.value);
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicText">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control required value={lastName} type="text" placeholder="Ingrese sus apellidos" onChange={(e) => {
                                setLastName(e.currentTarget.value);
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicText">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control required value={address} type="text" placeholder="Ingrese su dirección" onChange={(e) => {
                                setAddress(e.currentTarget.value);
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicNumber">
                            <Form.Label>Número de teléfono</Form.Label>
                            <Form.Control required value={phoneNumber} type="number" placeholder="Ingrese su teléfono" onChange={(e) => {
                                setPhoneNumber(e.currentTarget.value);
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control required value={email} type="email" placeholder="Ingrese su correo"
                                onChange={(e) => {
                                    setEmail(e.currentTarget.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicNumber">
                            <Form.Label>Unidades a comprar</Form.Label>
                            <Form.Control required value={units} type="number" min="1" max="100" placeholder="Ingrese su teléfono" onChange={(e) => {
                                validateCorrectExtension(e.currentTarget.value);
                            }} />
                        </Form.Group>

                        <Form.Text className="text-muted">
                            Su información no se compartirá con nadie más.
                        </Form.Text>
                        <Button variant="primary" type="submit" style={{ marginTop: "8px", width: '100%' }}>
                            Comprar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BuyerForm;
