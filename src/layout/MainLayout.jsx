import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";

export default function MainLayout() {
    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
            {/* 🔝 Top AppBar */}
            <AppBar position="sticky" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My MUI App
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/about">About</Button>
                        <Button color="inherit" component={Link} to="/contact">Contact</Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* 🔽 Pages Render Here */}
            <Box sx={{ p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
