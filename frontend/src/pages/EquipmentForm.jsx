import { useState } from "react";
import api from "../api";
import "../styles/Form.css"
import { useNavigate } from "react-router-dom";

function EquipmentForm() {

        const [type, setType] = useState("");
        const [state, setState] = useState("");
        const [owner, setOwner] = useState("");
        const [model, setModel] = useState("");
        const [manufacturer, setManufacturer] = useState("");
        const [identification, setIdentification] = useState("");
        const [serial_number, setSerialNumber] = useState("");

        const navigate = useNavigate();

        const addEquipment = (e) => {
            e.preventDefault();
            api
                .post("/api/equipments/", { type, state, owner,
                    model, manufacturer, identification, serial_number})
                .then((res) => {
                    if (res.status === 201)
                    {
                        alert("Equipment added!");
                        navigate("/")
                    } 
                    else alert("Failed to add Equipment.");
                })
                .catch((err) => alert(err));

    };

    return (
        <form onSubmit={addEquipment}>
        <h2>Adicionar Equipamento</h2>
            <label htmlFor="type">Tipo:</label>
            <br />
            <input
                type="text"
                id="type"
                name="type"
                //required
                onChange={(e) => setType(e.target.value)}
                value={type}
            />
            <label htmlFor="state">Estado:</label>
            <br />
            <input
                type="text"
                id="state"
                name="state"
                //required
                onChange={(e) => setState(e.target.value)}
                value={state}
            />
            <label htmlFor="owner">Proprietário:</label>
            <br />
            <input
                type="text"
                id="owner"
                name="owner"
                //required
                onChange={(e) => setOwner(e.target.value)}
                value={owner}
            />
            <label htmlFor="model">Modelo:</label>
            <br />
            <input
                type="text"
                id="model"
                name="model"
                //required
                onChange={(e) => setModel(e.target.value)}
                value={model}
            />
            <label htmlFor="manufacturer">Fabricante:</label>
            <br />
            <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                //required
                onChange={(e) => setManufacturer(e.target.value)}
                value={manufacturer}
            />
            <label htmlFor="identification">Identificação:</label>
            <br />
            <input
                type="text"
                id="identification"
                name="identification"
                //required
                onChange={(e) => setIdentification(e.target.value)}
                value={identification}
            />
            <label htmlFor="serial_number">Numero de Serie:</label>
            <br />
            <input
                type="text"
                id="serial_number"
                name="serial_number"
                //required
                onChange={(e) => setSerialNumber(e.target.value)}
                value={serial_number}
            />
            <input type="submit" value="Cadastrar"></input>
        </form>
    );
}

export default EquipmentForm