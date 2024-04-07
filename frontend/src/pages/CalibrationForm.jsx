import { useState } from "react";
import api from "../api";
import "../styles/Form.css"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function CalibrationForm() {

        const [number, setNumber] = useState("");
        const [requester, setRequester] = useState("");
        const [executor, setExecutor] = useState("");
        const [service_type, setServiceType] = useState("");
        const [expiration, setExpiration] = useState("");

        const navigate = useNavigate();
        const location = useLocation();
        const equip_id = location.state.attribute;
     
        const addCalibration = (e) => {
            e.preventDefault();
            console.log({ equip_id, number, requester, executor,
                service_type, expiration})
            api
                .post("/api/calibrations/", { number, requester, executor,
                    expiration, equip_id})
                .then((res) => {
                    if (res.status === 201)
                    {
                        alert("Calibration added!");
                        navigate("/")
                    } 
                    else alert("Failed to add Calibration.");
                })
                .catch((err) => alert(err));

    };

    return (
        <form onSubmit={addCalibration}>
            <h2>Adicionar Calibração</h2>
            <label htmlFor="number">Numero:</label>
            <br />
            <input
                type="text"
                id="number"
                name="number"
                //required
                onChange={(e) => setNumber(e.target.value)}
                value={number}
            />
            <label htmlFor="requester">Solicitante:</label>
            <br />
            <input
                type="text"
                id="requester"
                name="requester"
                //required
                onChange={(e) => setRequester(e.target.value)}
                value={requester}
            />
            <label htmlFor="executor">Responsavel:</label>
            <br />
            <input
                type="text"
                id="executor"
                name="executor"
                //required
                onChange={(e) => setExecutor(e.target.value)}
                value={executor}
            />
            <label htmlFor="service_type">Tipo de Serviço:</label>
            <br />
            <input
                type="text"
                id="service_type"
                name="service_type"
                //required
                onChange={(e) => setServiceType(e.target.value)}
                value={service_type}
            />
            <label htmlFor="expiration">Validade:</label>
            <br />
            <input
                type="text"
                id="expiration"
                name="expiration"
                //required
                onChange={(e) => setExpiration(e.target.value)}
                value={expiration}
            />
            
            <input type="submit" value="Adicionar"></input>
        </form>
    );
}

export default CalibrationForm