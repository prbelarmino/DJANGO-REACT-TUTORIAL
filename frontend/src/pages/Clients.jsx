import { useState, useEffect } from "react";
import api from "../api";
import {ClientColumns, LocationColumns} from "../headers/ListHeaders"
import { Box } from "@mui/material";
import CustomList from "../components/CustomList";
import Header from "../components/Header";

function Clients() {

    const [clients, setclients] = useState([]);
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        getClients();
        getLocations();
    }, []);

    const getClients = () => {

        api
            .get('/api/clients/')
            .then((res) => {
                setclients(res.data);
                //console.log(res.data[0].equip);
            })
            .catch((err) => alert(err));
    };
    const deleteClient = (id) => {
        api
            .delete(`/api/clients/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("client deleted!");
                else alert("Failed to delete client.");
                getclients();
            })
            .catch((error) => alert(error));
    };
    const getLocations = () => {

        api
            .get('/api/locations/')
            .then((res) => {
                setLocations(res.data);
                //console.log(res.data[0].equip);
            })
            .catch((err) => alert(err));
    };

    const deleteLocation = (id) => {
        api
            .delete(`/api/locations/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("location deleted!");
                else alert("Failed to delete location.");
                getlocations();
            })
            .catch((error) => alert(error));
    };

    return (
        <div>
            <Box m="20px">
            <Header title="Clientes" subtitle="Lista de todos os Clientes" />
                <CustomList 
                    rows={clients}
                    columns={ClientColumns(deleteClient)}
                    height={"50vh"}
                />
                <Header title="Localidades" subtitle="Lista de todas as Localidades" />
                <CustomList 
                    rows={locations}
                    columns={LocationColumns(deleteLocation)}
                    height={"100vh"}
                />
            </Box>
        </div>
    );
}

export default Clients;
