import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function ServiceOrderForm() {

        const [number, setNumber] = useState("");
        const [requester, setRequester] = useState("");
        const [executor, setExecutor] = useState("");
        const [service_type, setServiceType] = useState("");
        const [closed_at, setClosedAt] = useState("");
        const [priority, setPriority] = useState("");
        const [title, setTitle] = useState("");
        const [issue_description, setIssueDescription] = useState("");

        const navigate = useNavigate();
        const location = useLocation();
        const equip_id = location.state.attribute;

        const createServiceOrder = (e) => {
            e.preventDefault();
            console.log({number, requester, executor,
                service_type, closed_at, priority, title, issue_description,equip_id})
            api
                .post("/api/serviceorders/", {number, requester, executor,
                    service_type, closed_at, priority, title, issue_description, equip_id})
                .then((res) => {
                    if (res.status === 201)
                    {
                        alert("Service Order created!");
                        navigate("/")
                    } 
                    else alert("Failed to create Service Order.");
                })
                .catch((err) => alert(err));

    };

    return (
        <form onSubmit={createServiceOrder}>
        <h2>Criar Ordem de Serviço</h2>
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
            <label htmlFor="closed_at">Fechada em:</label>
            <br />
            <input
                type="text"
                id="closed_at"
                name="closed_at"
                //required
                onChange={(e) => setClosedAt(e.target.value)}
                value={closed_at}
            />
            <label htmlFor="priority">Prioridade:</label>
            <br />
            <input
                type="text"
                id="priority"
                name="priority"
                //required
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
            />
            <label htmlFor="title">Titulo:</label>
            <br />
            <input
                type="text"
                id="title"
                name="title"
                //required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="issue_description">Descrição do Problema:</label>
            <br />
            <input
                type="text"
                id="issue_description"
                name="issue_description"
                //required
                onChange={(e) => setIssueDescription(e.target.value)}
                value={issue_description}
            />
            
            <input type="submit" value="Criar"></input>
        </form>
    );
}

export default ServiceOrderForm