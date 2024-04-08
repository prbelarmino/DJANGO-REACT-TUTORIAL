import React from "react";
import "../styles/DynamicList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
function Calibration({ calib, onDelete }) {

    const formattedDate = new Date(calib.created_at).toLocaleDateString("en-US")

    return (
        <tr key={calib.id}>
            <td>{calib.id}</td>
            <td>{calib.equip_id}</td>
            <td>{calib.number}</td>
            <td>{calib.requester}</td>
            <td>{calib.executor}</td>
            <td>{formattedDate}</td>
            <td>{calib.expiration}</td>
            <td>
            <button className="delete-button" onClick={() => onDelete(calib.id)}>
                    <FontAwesomeIcon icon={faTrash} /> {/* Remover */}
                </button>
        


                </td>
        </tr>            
    );
}

export default Calibration
