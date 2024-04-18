import { useState, useEffect } from "react";
import api from "../api";
import ServiceOrderList from "../components/ServiceOrderList"
import CalibrationList from "../components/CalibrationList"
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button, IconButton } from "@material-ui/core";

function DetailedEquipment() {

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
            <Button
                variant="contained"
                color="primary"
                onClick={() => {createOrder(equip.id);}}
            >
                Criar Ordem de Serviço
            </Button>
            <ServiceOrderList rows={orders} onDelete={deleteServiceOrder}/>  

            <Button
                variant="contained"
                color="primary"
                onClick={() => {addCalib(equip.id);}}
            >
                Adicionar Calibração
            </Button> 
            <CalibrationList rows={calibrations} onDelete={deleteCalib}/>
        </div>
    );
}

export default DetailedEquipment;
