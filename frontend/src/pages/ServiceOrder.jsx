import { useState, useEffect } from "react";
import api from "../api";
import {ServiceOrderColumns} from "../headers/ListHeaders"
import { Box } from "@mui/material";
import CustomList from "../components/CustomList";
import Header from "../components/Header";
import { useNavigate, createSearchParams } from 'react-router-dom';

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
                console.log(sortedData)
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

        const selectedOrder = orders.find(item => item.id === params.id);
        navigate({
          pathname: "/view-order",
          search: createSearchParams({
              order: JSON.stringify(params.id)
          }).toString()
        })
      };
    const onEdit = (event,params) => {

        const selectedOrder = orders.find(item => item.id === params.id);
        navigate({
            pathname: "/edit-order",
            search: createSearchParams({
                order: JSON.stringify(selectedOrder)
            }).toString()
        })
    };
    return (
 
        <Box m="30px">
        <Header title="Ordem de Serviço" subtitle="Lista de todas as Ordem de Serviços" />
            <CustomList 
            rows={orders}
            columns={ServiceOrderColumns(onDelete,onEdit,onViewMore)}
            height={"100vh"}
            />
        </Box>

    );
}

export default ServiceOrder;
