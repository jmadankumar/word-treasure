import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className="flex-grow">
          Word Treasure
        </Typography>
        {!user && (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
        {user && (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
