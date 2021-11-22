import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';


import { Button, Form, Table } from 'react-bootstrap';
const Tracker = () => {
    const [isAValidProduct, setIsaValidProduct] = useState(false);
    const [productID, changeProductID] = useState('');
    const [orderData, setOrderData] = useState([]);


    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/track-order", {
            trackingNumber: productID,

        }).then((response) => {
            console.log(response);
            if (response.data === false) {
                setIsaValidProduct(false);
                toast.error("El número de rastreo no se encuentra en la base de datos.", { position: 'bottom-right' });
                console.log("no se encontro");
            } else {
                // console.log(response);
                setIsaValidProduct(true);
                setOrderData(response.data);
            }
        });
    }

    const validateForm = () => {
        return productID.length > 2;
    }

    const renderInfo = (orderData, index) => {
        return (
            <tr key={index}>
                <td>{orderData.hour}</td>
                <td>{orderData.description}</td>
                <td>{orderData.currentPlace}</td>
            </tr>
        )
    }

    return (
        <>
            <div align="center">
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ fontSize: "22px", marginTop: 25 }}>Código del producto</Form.Label>
                        <Form.Control type="text" style={{ width: "300px" }} onChange={(e) => { changeProductID(e.target.value) }} placeholder="Digite el código del producto" />
                    </Form.Group>
                    <Button style={{ marginBottom: "20px" }} variant="primary" type="submit" disabled={!validateForm()}>
                        Enviar
                    </Button>
                </Form>
            </div>
            {isAValidProduct === true ?
                <div style={{ width: "800px", height: "300px", align: 'center', margin: "auto" }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Hora</th>
                                <th>Descripción</th>
                                <th>Lugar Actual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.map(renderInfo)}
                        </tbody>
                    </Table>
                </div>
                :
                <div align="center">
                </div>
            }
        </>
    )
}
export default Tracker;