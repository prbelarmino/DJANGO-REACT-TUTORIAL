import { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { LOGGED_USER } from "../constants";
import api from "../api";
import myImage from "../assets/logo.png"; // Import the image

const SidebarItem = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ListItem
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      
      component={Link}
      to={to}
      selected={selected === title}
      onClick={() => setSelected(title)}
      fontWeight={isCollapsed ? "bold" : "bold"}
      sx={{
        ml: isCollapsed ? "15px" : "5px",
        color: colors.grey[100],
        "&.Mui-selected": {
          backgroundColor: colors.primary[400],
          //fontWeight: "bold",
          color: colors.blueAccent[600],
          transition: 'color 0.3s',
          '& .MuiListItemIcon-root': {
            color: colors.blueAccent[600],
          },
        },
        "&:hover": {
          color: colors.blueAccent[500],
          transition: 'color 0.3s',
          '& .MuiListItemIcon-root': {
            color: colors.blueAccent[500],
            transform: 'scale(1.1)', // Slightly enlarge the icon
            transition: 'transform 0.3s, color 0.3s', // Smooth transition
          },
        },
      }}
    >
      <ListItemIcon >
          {icon}
      </ListItemIcon>
      {!isCollapsed && 
        <ListItemText primary={title}/>
      }
    </ListItem>
  );
};

const routeDictionary = {
  "/": "Dashboard",
  "/team": "Equipe",
  "/equipments": "Equipamentos",
  "/orders": "Ordem de Serviços",
  "/calibrations": "Calibrações",
};

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(routeDictionary[location.pathname]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [func, setFunction] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    const value = localStorage.getItem(LOGGED_USER);
    const field = "username";
    const queryParams = {
      field,
      value,
    };
    api
      .get("/api/user/register/", { params: queryParams })
      .then((res) => {
        setFirstName(res.data[0].first_name);
        setLastName(res.data[0].last_name);
        setFunction(res.data[0].function);
      })
      .catch((err) => alert(err));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={true}
        sx={{
          width: isCollapsed ? 80 : 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isCollapsed ? 80 : 240,
            boxSizing: "border-box",
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          },
        }}
      >
        <List
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              // margin: "0px 0 0px 0",
              color: colors.grey[100],
            }}
          >           
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="25px"
              >
                {!isCollapsed && (
                <Typography variant="h4" color={colors.grey[100]}>
                  Menu
                </Typography>
                )}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            
          </List>
          {!isCollapsed && (
          <Box
            mb={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            
            <img alt="profile-user" width="130" height="130" src={myImage} />
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              align="center"
              sx={{
                margin: "0px 5px 0px 5px",
              }}
            >
              {firstName + " " + lastName}
            </Typography>
            
            <Typography variant="h6" color={colors.greenAccent[500]}>
              {func}
            </Typography>
          </Box>
          )}
        <List>
          <SidebarItem
            title="Dashboard"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{
              margin: isCollapsed ? '2px 0px 2px 7px' : '2px 0px 2px 25px', // Change margin when collapsed
              transition: 'margin 0.3s', // Smooth transition for margin change
            }}
          >
            Cadastros
          </Typography>
          <SidebarItem
            title="Clientes"
            to="/clients"
            icon={<PersonOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            title="Equipe"
            to="/team"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            title="Equipamentos"
            to="/equipments"
            icon={<PrecisionManufacturingOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            title="Ordem de Serviços"
            to="/orders"
            icon={<HomeRepairServiceOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            title="Calibrações"
            to="/calibrations"
            icon={<TuneOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
