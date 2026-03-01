import { useState } from "react";
import {
    Box,
    Button,
    Collapse,
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
    KeyboardArrowRight,
    Menu,
    PhoneInTalk,
    Twitter,
    YouTube,
    VolunteerActivism,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function AppHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState({});
    const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
    const toggleSubmenu = (key) => setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));

    const navItems = [
        { label: "Home", to: "/" },
        {
            label: "Demos",
            to: "/demos",
            submenu: [
                { label: "Home Classic", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
            ],
        },
        {
            label: "Causes",
            to: "/causes",
            submenu: [
                { label: "Medical Support", to: "/causes/medical-support" },
                { label: "Food Donation", to: "/causes/food-donation" },
            ],
        },
        {
            label: "Pages",
            to: "/pages",
            submenu: [
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
                {
                    label: "More Pages",
                    submenu: [
                        { label: "FAQ", to: "/pages/faq" },
                        { label: "Team", to: "/pages/team" },
                    ],
                },
            ],
        },
        { label: "About Us", to: "/about" },
    ];

    const hasSubmenu = (item) => Array.isArray(item?.submenu) && item.submenu.length > 0;

    const desktopNavButtonSx = (depth) => ({
        fontWeight: 500,
        textTransform: "none",
        color: "text.primary",
        px: depth === 0 ? 2 : 1.75,
        py: depth === 0 ? 1 : 0.8,
        minWidth: depth === 0 ? "auto" : "100%",
        borderRadius: depth === 0 ? 0 : 1,
        justifyContent: depth === 0 ? "center" : "space-between",
        "&:hover": {
            color: "primary.main",
            bgcolor: depth === 0 ? "transparent" : (t) => alpha(t.palette.primary.main, 0.08),
        },
    });

    const renderDesktopNavItems = (items, depth = 0) =>
        items.map((item, index) => {
            const submenu = hasSubmenu(item);
            const key = `${item.label}-${depth}-${index}`;
            const arrowIcon = submenu ? (depth === 0 ? <KeyboardArrowDown /> : <KeyboardArrowRight />) : null;
            const menuPositionSx =
                depth === 0
                    ? {
                          top: "100%",
                          left: 0,
                          transform: "translateY(8px)",
                      }
                    : {
                          top: 0,
                          left: "100%",
                          transform: "translateX(8px)",
                      };

            return (
                <Box
                    key={key}
                    sx={{
                        position: "relative",
                        "&:hover > .submenu-panel": {
                            opacity: 1,
                            visibility: "visible",
                            pointerEvents: "auto",
                            transform: "translate(0, 0)",
                        },
                    }}
                >
                    <Button
                        component={item.to ? Link : "button"}
                        to={item.to}
                        endIcon={arrowIcon}
                        sx={desktopNavButtonSx(depth)}
                    >
                        {item.label}
                    </Button>

                    {submenu && (
                        <Box
                            className="submenu-panel"
                            sx={{
                                position: "absolute",
                                minWidth: 220,
                                bgcolor: "#fff",
                                borderRadius: 1.5,
                                py: 1,
                                boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
                                border: "1px solid",
                                borderColor: "divider",
                                zIndex: 30 + depth,
                                opacity: 0,
                                visibility: "hidden",
                                pointerEvents: "none",
                                transition: "all 160ms ease",
                                ...menuPositionSx,
                            }}
                        >
                            {renderDesktopNavItems(item.submenu, depth + 1)}
                        </Box>
                    )}
                </Box>
            );
        });

    const renderMobileNavItems = (items, depth = 0, parentKey = "root") =>
        items.map((item, index) => {
            const submenu = hasSubmenu(item);
            const key = `${parentKey}-${index}-${item.label}`;
            const isOpen = !!openSubmenus[key];

            return (
                <Box key={key}>
                    <ListItemButton
                        component={!submenu && item.to ? Link : "button"}
                        to={!submenu ? item.to : undefined}
                        onClick={() => {
                            if (submenu) {
                                toggleSubmenu(key);
                                return;
                            }
                            handleDrawerToggle();
                        }}
                        sx={{
                            borderRadius: 2,
                            my: 0.5,
                            pl: 2 + depth * 2,
                        }}
                    >
                        <ListItemText primary={item.label} />
                        {submenu ? (isOpen ? <KeyboardArrowDown fontSize="small" /> : <KeyboardArrowRight fontSize="small" />) : null}
                    </ListItemButton>

                    {submenu && (
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            <List disablePadding>{renderMobileNavItems(item.submenu, depth + 1, key)}</List>
                        </Collapse>
                    )}
                </Box>
            );
        });

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
            <List sx={{ px: 1 }}>{renderMobileNavItems(navItems)}</List>
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
                        py: 2,
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
                            {renderDesktopNavItems(navItems)}
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
