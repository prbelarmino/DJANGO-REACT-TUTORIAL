import { useState, useEffect } from "react";
import api from "../api";
import {ServiceOrderColumns} from "../headers/ListHeaders"
import { Box } from "@mui/material";
import CustomList from "../components/CustomList";
import { useNavigate } from 'react-router-dom';

function ServiceOrder() {

    const [orders, setOrder] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getServiceOrders();
    }, []);

    const getServiceOrders = () => {

        //console.log(queryParams)
        api
            .get('/api/serviceorders/')
            .then((res) => {

                const sortedData = res.data.sort((b, a) => a.id - b.id);
                setOrder(sortedData);

            })
            .catch((err) => alert(err));
    };
    const onDelete = (event, params) => {
        api
            .delete(`/api/serviceorders/delete/${params.id}/`)
            .then((res) => {
                if (res.status === 204) alert("Order deleted!");
                else alert("Failed to delete Order.");
                getServiceOrders();
            })
            .catch((error) => alert(error));
    };

    const onViewMore = (event,params) => {
        navigate(`/orders/${params.id}`)
      };
    const onEdit = (event,params) => {

        navigate(`/orders/update/${params.id}`)
    };
    return (
 
        <Box m="30px">
            <CustomList 
            title={"Ordem de Serviços"}
            rows={orders}
            columns={ServiceOrderColumns(onDelete,onEdit,onViewMore)}
            height={"75vh"}
            />
        </Box>

    );
}

export default ServiceOrder;
