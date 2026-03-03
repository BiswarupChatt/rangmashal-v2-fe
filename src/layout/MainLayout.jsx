import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Fab, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import AppNavigation from "./components/AppNavigation";

export default function MainLayout() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    return (
        <Box sx={{ minHeight: "100dvh", backgroundColor: "background.default" }}>

            <AppNavigation />

            <Box
                sx={{
                    px: { xs: 2, sm: 3, md: 6, lg: 10 },
                    pb: { xs: 10, md: 0 },
                }}
            >
                <Outlet />
            </Box>

        </Box>
    );
}
