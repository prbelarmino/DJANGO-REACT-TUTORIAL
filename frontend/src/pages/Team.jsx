
import { tokens } from "../theme";
import {TeamColumns} from "../headers/ListHeaders"
import { useState, useEffect } from "react";
import api from "../api";
import CustomList from "../components/CustomList";
import { Box, useTheme } from "@mui/material";

function Team() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        getTeam();
    }, []);

    const getTeam = () => {
        api
            .get("api/user/register/")
            .then((res) => res.data)
            .then((data) => {
                //console.log(data);
                setTeam(data);
                
            })
            .catch((err) => alert(err));
    };

  return (
    <Box m="20px">
      <CustomList 
        title={"Equipe"}
        rows={team}
        columns={TeamColumns}
        height={"75vh"}
        width={"1050px"}
      />
    </Box>
  );
};

export default Team;