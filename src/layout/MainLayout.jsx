import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Fab, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import AppNavigation from "./components/AppNavigation";

export default function MainLayout() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowScrollTop(window.scrollY > 240);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

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

            <Zoom in={showScrollTop}>
                <Fab
                    color="primary"
                    onClick={handleScrollTop}
                    aria-label="Scroll to top"
                    sx={{
                        position: "fixed",
                        right: { xs: 16, md: 24 },
                        bottom: { xs: 86, md: 24 },
                        zIndex: (theme) => theme.zIndex.tooltip,
                    }}
                >
                    <KeyboardArrowUp />
                </Fab>
            </Zoom>
        </Box>
    );
}
