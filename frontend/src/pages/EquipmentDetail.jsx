import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import api from "../api";
import Typography from '@mui/material/Typography';
import CardInfo from "../components/CardInfo";
import EquipMetrics from "../components/EquipMetrics";
import EquipMenu from "../components/EquipMenu";
import {EquipmentDictionary} from "../headers/ModelDictionaries"
import { Box } from "@mui/material";
import CustomList from "../components/CustomList";
import {ServiceOrderColumns, CalibrationColumns} from "../headers/ListHeaders"

function EquipmentDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [equipments, setEquipments] = useState([]);
    const [valuesFlag, setValuesFlag] = useState(false);
    const [orders, setOrder] = useState([]);
    const [calibrations, setCalibrations] = useState([]);
    const EquipBasicInfo = ["identification", "state", "type", "owner", "manufacturer", "added_by"];
    
    useEffect(() => {
        getEquipment();
        getServiceOrder();
        getCalibrations();
    }, []);

    
    const getEquipment = (event) => {

        api
            .get(`/api/equipments/retrieve/${id}/`)
            .then((res) => {
              setEquipments(res.data);
              setValuesFlag(true);
            })
            .catch((err) => alert(err));
    
    };
    const getServiceOrder = (event) => {

        const equip_id = id;
        const queryParams = {
            equip_id
            // Example equip value
        // Add more parameters as needed
        };
        //console.log(queryParams)
        api
            .get('/api/serviceorders/',{ params: queryParams })
            .then((res) => {
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
    const onOrderViewMore = (event,params) => {
        navigate(`/orders/${params.id}`)
      };
    const onOrderEdit = (event,params) => {

        navigate(`/orders/update/${params.id}`)
    };
    const getCalibrations = () => {
   
        const equip_id = id;
        const queryParams = {
            equip_id
            // Example equip value
        // Add more parameters as needed
        };
        api
            .get('/api/calibrations/',{ params: queryParams })
            .then((res) => {
                setCalibrations(res.data);
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
    return (
        
        <Box>
            
            <Typography sx={{ fontSize: 30, m: "0px 0px 50px 20px"}} color="text.secondary" gutterBottom>
                    {equipments.type} {equipments.model}
            </Typography>
            
            <EquipMenu id_equipment={id}/>
  
            <EquipMetrics created_at={equipments.created_at} orders_len={orders.length}/>
            {valuesFlag && (
                <CardInfo 
                    data={equipments} 
                    keysToDisplay={EquipBasicInfo} 
                    dictionary={EquipmentDictionary}
                />
            )}
            <Box m="20px">
                <CustomList 
                title={"Ordem de Serviços"}
                rows={orders} 
                columns={ServiceOrderColumns(onOrderEdit, deleteServiceOrder, onOrderViewMore)} 
                height={"40vh"}
                />
                <CustomList 
                title={"Calibrações"}
                rows={calibrations} 
                columns={CalibrationColumns(deleteCalib, printCalib)} 
                height={"40vh"}
                width={"950px"}
                />
            </Box>
     </Box>
    );
}

export default EquipmentDetail;
