import { useState, useEffect } from "react";
import api from "../api";
import ServiceOrder from "../components/ServiceOrder"
import Calibration from "../components/Calibration"
import UpperBar from "../components/UpperBar";
import "../styles/Home.css"
import '../styles/DynamicList.css'; // Import CSS for styling
import '../styles/Table.css'; // Import CSS for styling
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Home() {

    const location = useLocation();
    const navigate = useNavigate();
    const equip = location.state.attribute;
    const [orders, setOrder] = useState([]);
    const [calibrations, setCalibration] = useState([]);

    useEffect(() => {
        getServiceOrder();
        getCalibrations();
    }, []);

    const deleteEquip = (id) => {
        api
            .delete(`/api/equipments/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Equipment deleted!");
                else alert("Failed to delete Equipment.");
                getEquipments();
            })
            .catch((error) => alert(error));
    };
    const getServiceOrder = () => {
        // Define query parameters
        const value = equip.id;
        const field = "equip_id";
        const queryParams = {
            field, value // Example equip_id value
        // Add more parameters as needed
        };
        console.log(queryParams)
        api
            .get('/api/serviceorders/',{ params: queryParams })
            .then((res) => {
                console.log(res.data)
                setOrder(res.data);
            })
            .catch((err) => alert(err));
    
    };
    const deleteServiceOrder = (id) => {
        api
            .delete(`/api/serviceorders/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Service Order deleted!");
                else alert("Failed to delete Service Order.");
                getServiceOrder();
            })
            .catch((error) => alert(error));
    };
    const getCalibrations = () => {
   
        // Define query parameters
        const value = equip.id;
        const field = "equip_id";
        const queryParams = {
            field, value // Example equip_id value
        // Add more parameters as needed
        };
        api
            .get('/api/calibrations/',{ params: queryParams })
            .then((res) => {
                setCalibration(res.data);
            })
            .catch((err) => alert(err));
            
    };
    const deleteCalib = (id) => {
        api
            .delete(`/api/calibrations/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Calibration deleted!");
                else alert("Failed to delete Calibration.");
                getCalibrations();
            })
            .catch((error) => alert(error));
    };
    const addCalib = (equip_id) => {

        navigate("/add-calib", { state: { attribute: equip_id } })
    };
    const createOrder = (equip_id) => {

        navigate("/create-so", { state: { attribute: equip_id } })
    };

    return (
        <div>
            
            <UpperBar />
            <h2>Informações Basicas</h2>
            <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th>Proprietario</th>
                        <th>Modelo</th>
                        <th>Fabricante</th>
                        <th>Identificação</th>
                        <th>Numero de Serie</th>
                        <th>Adicionado por</th>
                        <th>Adicionado em</th> 
                        <th> </th>
                    </tr>
 
                </thead>
                <tbody>
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
                        <td>{equip.created_at}</td>
                        <td>
                            <button className="delete-button" onClick={() => deleteEquip(equip.id)}>Delete</button>
                        </td>
                    </tr>   
                </tbody>
            </table>
            </div>
            <br/><br/><br/><br/>

            <button className="link"  onClick={() => createOrder(equip.id)}>Criar Ordem de Serviço</button>
            <h2>Lista de Ordem de Serviços</h2>
            <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Equipamento</th>
                        <th>Numero</th>
                        <th>Solicitante</th>
                        <th>Responsavel</th>
                        <th>Tipo de Serviço</th>
                        <th>Criado em</th>
                        <th>Fechado em</th>
                        <th>Prioridade</th>
                        <th>Titulo</th> 
                        <th>Descrição do Problema</th>
                        <th>Apagar</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <ServiceOrder order={order} onDelete={deleteServiceOrder} key={order.id} />
                    ))}
                </tbody>
            </table>
            </div>
            <br/><br/><br/><br/>
            
            <button className="link"  onClick={() => addCalib(equip.id)}>Adicionar Calibração</button>
            <h2>Lista de Calibrações</h2>
            <table className="dynamic-list-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id do Equipamento</th>
                        <th>Numero</th>
                        <th>Solicitante</th>
                        <th>Responsavel</th>
                        <th>Criado em</th>
                        <th>Validade</th>
                        <th>Apagar</th>
                    </tr>
                </thead>
                <tbody>
                    {calibrations.map((calib) => (
                        <Calibration calib={calib} onDelete={deleteCalib} key={calib.id} />
                    ))}
                </tbody>
            </table>
                       
        </div>
    );
}

export default Home;
