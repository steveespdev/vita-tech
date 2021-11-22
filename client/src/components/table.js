import React from 'react';
import { Table } from 'react-bootstrap';

function table(props) {

    const receivedInfo = props;

    // const renderInfo = (receivedInfo, index) => {
    //     return (
    //         <tr key={index}>
    //             <td>{receivedInfo.hour}</td>
    //             <td>{receivedInfo.description}</td>
    //             <td>{receivedInfo.currentPlace}</td>
    //         </tr>
    //     )
    // }

    console.log(receivedInfo);




    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Hora</th>
                    <th>Descripción</th>
                    <th>Lugar Actual</th>
                </tr>
            </thead>
            <tbody>
                {/* {receivedInfo.map(renderInfo)} */}
            </tbody>
        </Table>
    )
}

export default table;
