import React, { useState } from 'react';

import { Button, Form, Table } from 'react-bootstrap';
const Tracker = () => {
    const isAValidProduct = false;
    const [productID, changeProductID] = useState('');


    const onSubmit = (e) => {
        e.preventDefault();
        // props.onSubmit(productID);
        // changeProductID('');
    }

    const validateForm = () => {
        return productID.length > 4;
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
                            <tr>
                                <td>3:00 p.m</td>
                                <td>Aceptado en la sucursal mi casa</td>
                                <td>San José</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                :
                <div align="center">
                    <span>

                    </span>
                </div>
            }
        </>
    )
}
export default Tracker;