import { useState, useEffect } from "react";
import api from "../api";
import {CalibrationColumns} from "../headers/ListHeaders"
import { Box } from "@mui/material";
import CustomList from "../components/CustomList";
import Header from "../components/Header";

function Calibration() {

    const [calibrations, setCalibrations] = useState([]);
    useEffect(() => {
        getCalibrations();
    }, []);

    const getCalibrations = () => {

        //console.log(queryParams)
        api
            .get('/api/calibrations/')
            .then((res) => {
                setCalibrations(res.data);
                //console.log(res.data[0].equip);
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
        <div>
            <Box m="20px">
            <Header title="Calibrações" subtitle="Lista de todas as Calibrações" />
                <CustomList 
                    rows={calibrations}
                    columns={CalibrationColumns(deleteCalib, printCalib)}
                    height={"100vh"}
                />
            </Box>
        </div>
    );
}

export default Calibration;
