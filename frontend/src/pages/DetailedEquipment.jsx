import { useState, useEffect } from "react";
import api from "../api";
import ServiceOrderList from "../components/ServiceOrderList";
import CalibrationList from "../components/CalibrationList";
import EquipmentRow from "../components/EquipmentRow";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';

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

    const getServiceOrder = () => {
        // Define query parameters
        const value = equip.id;
        const field = "equip_id";
        const queryParams = {
            field, value // Example equip_id value
        // Add more parameters as needed
        };
        //console.log(queryParams)
        api
            .get('/api/serviceorders/',{ params: queryParams })
            .then((res) => {
                //console.log(res.data)
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
            <EquipmentRow rows={[equip]}/>

            <ServiceOrderList 
                rows={orders} 
                onDelete={deleteServiceOrder} 
                onCreate={() => {createOrder(equip.id);}}
            />  
            <CalibrationList 
                rows={calibrations} 
                onDelete={deleteCalib}
                onAdd={() => {addCalib(equip.id);}}    
            />
        </div>
    );
}

export default DetailedEquipment;
