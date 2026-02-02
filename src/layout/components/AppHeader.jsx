import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function AppHeader() {
    return (
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
    );
}
