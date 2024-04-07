import React from "react";
import "../styles/Buttons.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

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
                <div className="button-container">   
                <button className="delete-button" onClick={() => onDelete(equip.id)}>
                    <FontAwesomeIcon icon={faTrash} /> {/* Remover */}
                </button>
                <button className="details-button" onClick={() => showMore(equip.id)}>
                    <FontAwesomeIcon icon={faEye} /> {/* Ver mais */}
                </button>
                </div>
            </td>
        </tr>            
    );
}

export default Equipment
