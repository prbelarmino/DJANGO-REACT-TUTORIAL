import { useState, useEffect } from "react";
import api from "../api";
import ServiceOrderEquip from "../components/ServiceOrderEquip";
import CalibrationEquip from "../components/CalibrationEquip";
import { useNavigate, useSearchParams} from 'react-router-dom';
import { formatDate } from '../components/dateUtils';
import Typography from '@mui/material/Typography';
import CardInfo from "../components/CardInfo";
import EquipMetrics from "../components/EquipMetrics";

function DetailedEquipment() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const equip = JSON.parse(searchParams.get('equip'));
    const equip_id = equip.id;
    const [orders, setOrder] = useState([]);
    const [calibrations, setCalibrations] = useState([]);
    const EquipBasicInfo = ["identification", "state", "type", "owner", "manufacturer"];

    useEffect(() => {
        getServiceOrder();
        getCalibrations();
    }, []);

    const getServiceOrder = (event) => {
        // Define query parameter
        const queryParams = {
            equip // Example equip value
        // Add more parameters as needed
        };
        //console.log(queryParams)
        api
            .get('/api/serviceorders/',{ params: queryParams })
            .then((res) => {
                const formattedData = res.data.map(item => ({
                    ...item,
                    created_at: formatDate(item.created_at) // Apply formatDate to format the date
                  }));
                setOrder(formattedData);
                console.log(res.data[0])
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
   
        const field = "equip";
        const queryParams = {
            equip_id // Example equip value
        // Add more parameters as needed
        };
        api
            .get('/api/calibrations/',{ params: queryParams })
            .then((res) => {
                const formattedData = res.data.map(item => ({
                    ...item,
                    created_at: formatDate(item.created_at), // Apply formatDate to format the date
                    expiration: formatDate(item.expiration) 
                }));
                setCalibrations(formattedData);
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
    const printCalib = (event,cellValues) => {
        api
            .get(`/api/calibrations/${cellValues.id}/generate-pdf/`)
            .then(response => {
                // Create a Blob from the PDF file data
                const blob = new Blob([response.data], { type: 'application/pdf' });
                // Create a URL for the Blob
                const url = window.URL.createObjectURL(blob);
                // Open the PDF file in a new browser tab
                window.open(url, '_blank');
                })
            .catch((err) => alert(err));
    };
    const addCalib = () => {

        navigate("/add-calib", { state: { attribute: equip_id } })
    };
    const createOrder = (e) => {
        e.preventDefault();
        navigate("/create-so", { state: { attribute: equip_id } })
    };
    
    return (
        <div>
            <Typography sx={{ fontSize: 30, m: "0px 0px 50px 20px"}} color="text.secondary" gutterBottom>
                    {equip.type} {equip.model}
            </Typography>
            
            <EquipMetrics/>
            
            <CardInfo data={equip} keysToDisplay={EquipBasicInfo}/>

            <ServiceOrderEquip 
                rows={orders} 
                onDelete={deleteServiceOrder} 
                onCreate={createOrder}
            />  
            <CalibrationEquip 
                rows={calibrations} 
                onDelete={deleteCalib}
                onAdd={() => {addCalib();}}
                onPrint={printCalib}  
            />
        </div>
    );
}

export default DetailedEquipment;
