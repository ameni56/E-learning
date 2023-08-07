import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetAgentsQuery } from "../../state/api";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Agents = () => {
    const theme=useTheme();
    const{data,isLoading}=useGetAgentsQuery();
    console.log("data",data)
    const columns=[
        // {
        //     field:"_id",
        //     headerName:"ID",
        //     flex:1,
        // },
        {
            field:"firstName",
            headerName:"Nom",
            flex:1,
        },
        {
            field:"lastName",
            headerName:"Prénom",
            flex:1,
        },
        {
            field:"matricule",
            headerName:"Matricule",
            flex:0.5,
        },
        {
            field:"email",
            headerName:"Email",
            flex:1,
        },
        
        // {
        //     field: "phoneNumber",
        //     headerName: "Phone Number",
        //     flex: 0.5,
        //     renderCell: (params) => {
        //       return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
        //     },
        //   },
        //   {
        //     field: "country",
        //     headerName: "Country",
        //     flex: 0.4,
        //   },
        {
            field: "role",
            headerName: "Rôle",
            flex: 0.5,
          },
        
        
        

    ]


  return  ( <Box m="1.5rem 2.5rem">
      <Header title="Agents" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          "& .Mui-selected, .Mui-selected .MuiDataGrid-cell": {
            backgroundColor: "transparent",
            color: "inherit",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Agents;
