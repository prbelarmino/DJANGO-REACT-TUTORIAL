import { useState, useEffect } from "react";
import api from "../api";
import {ServiceOrderColumns} from "../headers/ListHeaders"
import { Box } from "@mui/material";
import CustomList from "../components/CustomList";
import Header from "../components/Header";
import { formatDate } from '../components/dateUtils';

function ServiceOrder() {

    const [orders, setOrder] = useState([]);
    useEffect(() => {
        getServiceOrder();
    }, []);

    const getServiceOrder = () => {

        //console.log(queryParams)
        api
            .get('/api/serviceorders/')
            .then((res) => {
                console.log(res.data)
                setOrder(res.data);
            })
            .catch((err) => alert(err));
    };

    return (
 
        <Box m="30px">
        <Header title="Ordem de Serviço" subtitle="Lista de todas as Ordem de Serviços" />
            <CustomList 
            rows={orders}
            columns={ServiceOrderColumns(()=>{})}
            height={"100vh"}
            />
        </Box>

    );
}

export default ServiceOrder;
