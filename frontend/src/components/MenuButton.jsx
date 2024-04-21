import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useNavigate } from "react-router-dom";

function MenuButton() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOption1 = () => {
    // Handle option 1 click
    handleClose();
    navigate("/logout")
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <PersonOutlinedIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'menu' }}
      >
        <MenuItem onClick={handleOption1}>Sair</MenuItem>

      </Menu>
    </div>
  );
}

export default MenuButton;
