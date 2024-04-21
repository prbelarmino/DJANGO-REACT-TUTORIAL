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
                //console.log(res.data)
                setCalibrations(res.data);
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <Box m="20px">
            <Header title="Calibrações" subtitle="Lista de todas as Calibrações" />
                <CustomList 
                    rows={calibrations}
                    columns={CalibrationColumns(()=>{})}
                    height={"80vh"}
                />
            </Box>
        </div>
    );
}

export default Calibration;
