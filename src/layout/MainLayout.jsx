import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AppHeader from "./components/AppHeader";

export default function MainLayout() {
    return (
        <Box sx={{ minHeight: "100dvh", backgroundColor: "background.default" }}>

            <AppHeader />

            <Box sx={{ px: 13 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
