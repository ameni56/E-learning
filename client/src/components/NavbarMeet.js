import React from "react";
import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import logo from "../assets/logoTT.png";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "90vw",
          mx: "auto",
        }}
      >
        {/* Left */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={logo} alt="Logo" sx={{ width: 48, height: 48, mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ color: "white", fontWeight: "bold", flexGrow: 1 }}>
            TT ACADEMY MEET
          </Typography>
        </Box>

        {/* Right */}
        {/* <Box>
          <ul
            style={{ listStyle: "none", display: "flex", alignItems: "center" }}
          >
            <li style={{ color: "white", fontWeight: "bold", cursor: "pointer", marginRight: "10px" }}>
              About Us
            </li>
            <li style={{ color: "white", fontWeight: "bold", cursor: "pointer", marginRight: "10px" }}>
              Product
            </li>
            <li style={{ color: "white", fontWeight: "bold", cursor: "pointer" }}>
              Blogs
            </li>
          </ul>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
