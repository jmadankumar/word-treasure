import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { Avatar, Popover } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <Typography variant="h6" className="flex-grow" component={Link} to="/">
          Word Treasure
        </Typography>
        {!user && (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
        {user && (
          <Avatar onClick={handleAvatarClick} className="cursor-pointer" />
        )}
        <Popover
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <List disablePadding>
            <ListItem divider>
              <ListItemText primary={user?.email} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Logout" onClick={handleLogout} />
            </ListItem>
          </List>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
