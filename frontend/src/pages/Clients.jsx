import { useState, useEffect } from "react";
import api from "../api";
import {ClientColumns, LocationColumns} from "../headers/ListHeaders"
import { Box } from "@mui/material";
import CustomList from "../components/CustomList";

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
                <CustomList 
                    title={"Clientes"}
                    rows={clients}
                    columns={ClientColumns(deleteClient)}
                    height={"50%"}
                    width = {"650px"}
                />
                
                <CustomList 
                    title={"Localidades"}
                    rows={locations}
                    columns={LocationColumns(deleteLocation)}
                    height={"50%"}
                    sx={{ m: "30px"}}
                />
            </Box>
        </div>
    );
}

export default Clients;
