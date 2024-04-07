import React from "react";
import "../styles/DynamicList.css"

function Equipment({ equip, onDelete,showMore }) {

    const formattedDate = new Date(equip.created_at).toLocaleDateString("en-US")

    return (
        <tr key={equip.id}>
            <td>{equip.id}</td>
            <td>{equip.type}</td>
            <td>{equip.state}</td>
            <td>{equip.owner}</td>
            <td>{equip.model}</td>
            <td>{equip.manufacturer}</td>
            <td>{equip.identification}</td>
            <td>{equip.serial_number}</td>
            <td>{equip.author}</td>
            <td>{formattedDate}</td>
            <td>
                <button className="delete-button" onClick={() => onDelete(equip.id)}>Delete</button>
                <button className="delete-button" onClick={() => showMore(equip.id)}>Ver mais</button>
            </td>
        </tr>            
    );
}

export default Equipment
