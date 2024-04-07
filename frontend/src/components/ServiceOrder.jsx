import React from "react";
import "../styles/DynamicList.css"

function ServiceOrder({ order, onDelete }) {

    const formattedDate = new Date(equip.created_at).toLocaleDateString("en-US")

    return (
        <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.number}</td>
            <td>{order.requester}</td>
            <td>{order.executor}</td>
            <td>{order.service_type}</td>
            <td>{formattedDate}</td>
            <td>{order.closed_at}</td>
            <td>{order.priority}</td>
            <td>{order.title}</td>
            <td>{order.issue_description}</td>
            <td>
                <button className="delete-button" onClick={() => onDelete(order.id)}>Delete</button>
            </td>
        </tr>            
    );
}

export default ServiceOrder
