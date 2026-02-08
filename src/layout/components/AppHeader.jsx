import { useState } from "react";
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
    Close,
    EmailOutlined,
    Facebook,
    HomeRounded,
    KeyboardArrowDown,
    Menu,
    PhoneInTalk,
    Twitter,
    YouTube,
    VolunteerActivism,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function AppHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

    const navItems = [
        { label: "Home", to: "/" },
        { label: "Demos", to: "/demos", menu: true },
        { label: "Causes", to: "/causes", menu: true },
        { label: "Events", to: "/events", menu: true },
        { label: "Features", to: "/features", menu: true },
        { label: "Pages", to: "/pages", menu: true },
        { label: "About Us", to: "/about" },
    ];

    const drawer = (
        <Box sx={{ width: 280 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                <Typography variant="h6" fontWeight={800}>
                    Lifeline
                </Typography>
                <IconButton onClick={handleDrawerToggle} aria-label="Close menu">
                    <Close />
                </IconButton>
            </Box>
            <Divider />
            <List sx={{ px: 1 }}>
                {navItems.map((item) => (
                    <ListItemButton
                        key={item.label}
                        component={Link}
                        to={item.to}
                        onClick={handleDrawerToggle}
                        sx={{ borderRadius: 2, my: 0.5 }}
                    >
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>
            <Box sx={{ p: 2 }}>
                <Button fullWidth variant="contained" sx={{ borderRadius: 999 }}>
                    Donate Now
                </Button>
            </Box>
        </Box>
    );

    const topIconBubbleSx = (theme) => ({
        width: 34,
        height: 34,
        borderRadius: "50%",
        bgcolor: alpha(theme.palette.common.white, 0.2),
        display: "grid",
        placeItems: "center",
    });

    return (
        <Box component="header" sx={{ position: "relative", bgcolor: "primary.main", pb: { xs: 3, md: 5 } }}>
            {/* Top strip */}
            <Box sx={{ borderBottom: (t) => `1px solid ${alpha(t.palette.common.white, 0.2)}` }}>
                <Box
                    sx={{
                        maxWidth: (t) => t.breakpoints.values.lg,
                        mx: "auto",
                        px: { xs: 2, sm: 3, md: 4 },
                        py: 0.8,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: "primary.contrastText",
                        }}
                    >
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 3.5,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={topIconBubbleSx}>
                                    <PhoneInTalk fontSize="small" />
                                </Box>
                                <Typography fontWeight={600}>+00 666 000 999</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={topIconBubbleSx}>
                                    <EmailOutlined fontSize="small" />
                                </Box>
                                <Typography fontWeight={600}>info@loveussmart.com</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {[
                                { id: "facebook", Icon: Facebook },
                                { id: "twitter", Icon: Twitter },
                                { id: "youtube", Icon: YouTube },
                            ].map(({ id, Icon }) => (
                                <IconButton
                                    key={id}
                                    sx={{
                                        bgcolor: (t) => alpha(t.palette.common.white, 0.2),
                                        color: "#fff",
                                    }}
                                    aria-label={id}
                                >
                                    <Icon fontSize="small" />
                                </IconButton>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Floating navbar */}
            <Box
                sx={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: 60,
                    zIndex: 20,
                    width: "100%",
                    maxWidth: (t) => t.breakpoints.values.lg,
                    px: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Box
                    sx={{
                        bgcolor: "#fff",
                        px: 3,
                        py:2,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        {/* Logo */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <IconButton
                                sx={{ display: { xs: "inline-flex", md: "none" } }}
                                onClick={handleDrawerToggle}
                                aria-label="Open menu"
                            >
                                <Menu />
                            </IconButton>
                            <Box
                                sx={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    bgcolor: "primary.main",
                                    display: "grid",
                                    placeItems: "center",
                                }}
                            >
                                <VolunteerActivism sx={{ color: "#fff" }} />
                            </Box>
                            <Typography variant="h5" fontWeight={800} letterSpacing={0.5}>
                                Lifeline
                            </Typography>
                        </Box>

                        {/* Nav Items */}
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                            }}
                        >
                            {navItems.map((item) => (
                                <Button
                                    key={item.label}
                                    component={Link}
                                    to={item.to}
                                    endIcon={item.menu ? <KeyboardArrowDown /> : null}
                                    sx={{
                                        fontWeight: 500,
                                        textTransform: "none",
                                        color: "text.primary",
                                        "&:hover": { color: "primary.main", bgcolor: "transparent" },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>

                        {/* Donate Button */}
                        <Button
                            variant="contained"
                            sx={{ borderRadius: 999, px: 4.5, py: 1.3, fontWeight: 700, textTransform: "none" }}
                        >
                            Donate Now
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Drawer open={mobileOpen} onClose={handleDrawerToggle} sx={{ display: { xs: "block", md: "none" } }}>
                {drawer}
            </Drawer>
        </Box>
    );
}
