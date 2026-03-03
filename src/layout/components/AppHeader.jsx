import { useEffect, useState } from "react";
import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Button,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
    Close,
    ContactMailOutlined,
    EmailOutlined,
    Facebook,
    FavoriteRounded,
    HomeRounded,
    InfoOutlined,
    KeyboardArrowDown,
    KeyboardArrowRight,
    Menu,
    PhoneInTalk,
    Twitter,
    YouTube,
    VolunteerActivism,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AppHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState({});
    const [isDesktopNavSticky, setIsDesktopNavSticky] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
    const toggleSubmenu = (key) => setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));

    useEffect(() => {
        const desktopMediaQuery = window.matchMedia("(min-width:900px)");

        const updateDesktopSticky = () => {
            if (!desktopMediaQuery.matches) {
                setIsDesktopNavSticky(false);
                return;
            }
            setIsDesktopNavSticky(window.scrollY > 56);
        };

        updateDesktopSticky();
        window.addEventListener("scroll", updateDesktopSticky, { passive: true });

        if (desktopMediaQuery.addEventListener) {
            desktopMediaQuery.addEventListener("change", updateDesktopSticky);
        } else {
            desktopMediaQuery.addListener(updateDesktopSticky);
        }

        return () => {
            window.removeEventListener("scroll", updateDesktopSticky);
            if (desktopMediaQuery.removeEventListener) {
                desktopMediaQuery.removeEventListener("change", updateDesktopSticky);
            } else {
                desktopMediaQuery.removeListener(updateDesktopSticky);
            }
        };
    }, []);

    const mobileBottomNavItems = [
        { label: "Home", to: "/", icon: <HomeRounded fontSize="small" /> },
        { label: "About", to: "/about", icon: <InfoOutlined fontSize="small" /> },
        { label: "Contact", to: "/contact", icon: <ContactMailOutlined fontSize="small" /> },
        { label: "Donate", to: "/donate", icon: <FavoriteRounded fontSize="small" /> },
    ];

    const mobileBottomNavValue =
        mobileBottomNavItems.find((item) =>
            item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)
        )?.to ?? "/";

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
        fontSize: depth === 0 ? "0.92rem" : "0.88rem",
        textTransform: "none",
        color: "text.primary",
        px: depth === 0 ? { md: 1.2, lg: 1.5 } : 1.25,
        py: depth === 0 ? 0.65 : 0.55,
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
                                minWidth: 196,
                                bgcolor: "#fff",
                                borderRadius: 1.25,
                                py: 0.5,
                                boxShadow: "0 10px 22px rgba(0,0,0,0.12)",
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
                <Button
                    fullWidth
                    variant="contained"
                    component={Link}
                    to="/donate"
                    onClick={handleDrawerToggle}
                    sx={{ borderRadius: 999 }}
                >
                    Donate Now
                </Button>
            </Box>
        </Box>
    );

    const topIconBubbleSx = (theme) => ({
        width: { xs: 28, md: 30 },
        height: { xs: 28, md: 30 },
        borderRadius: "50%",
        bgcolor: alpha(theme.palette.common.white, 0.2),
        display: "grid",
        placeItems: "center",
    });

    return (
        <Box component="header" sx={{ position: "relative", pb: { xs: 0, md: 1 } }}>
            {/* Top strip */}
            <Box
                sx={{
                    bgcolor: "primary.main",
                    // borderBottom: (t) => `1px solid ${alpha(t.palette.common.white, 0.2)}`,
                }}
            >
                <Box
                    sx={{
                        maxWidth: (t) => t.breakpoints.values.lg,
                        mx: "auto",
                        px: { xs: 2, sm: 3, md: 4 },
                        py: { xs: 1.5   , md: 0.45 },
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
                                display: { xs: "flex", md: "none" },
                                alignItems: "center",
                                gap: 0.8,
                            }}
                        >
                            <IconButton
                                onClick={handleDrawerToggle}
                                aria-label="Open menu"
                                size="small"
                                sx={{
                                    width: 30,
                                    height: 30,
                                    color: "primary.contrastText",
                                    bgcolor: (t) => alpha(t.palette.common.white, 0.2),
                                }}
                            >
                                <Menu fontSize="small" />
                            </IconButton>
                            <Box
                                sx={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    bgcolor: alpha("#ffffff", 0.22),
                                    display: "grid",
                                    placeItems: "center",
                                }}
                            >
                                <VolunteerActivism sx={{ color: "#fff", fontSize: 16 }} />
                            </Box>
                            <Typography variant="subtitle2" fontWeight={700} letterSpacing={0.2}>
                                Lifeline
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 2.5,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={topIconBubbleSx}>
                                    <PhoneInTalk fontSize="small" />
                                </Box>
                                <Typography variant="body2" fontWeight={500}>
                                    +00 666 000 999
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={topIconBubbleSx}>
                                    <EmailOutlined fontSize="small" />
                                </Box>
                                <Typography variant="body2" fontWeight={500}>
                                    info@loveussmart.com
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
                            {[
                                { id: "facebook", Icon: Facebook },
                                { id: "twitter", Icon: Twitter },
                                { id: "youtube", Icon: YouTube },
                            ].map(({ id, Icon }) => (
                                <IconButton
                                    key={id}
                                    sx={{
                                        width: 32,
                                        height: 32,
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
                    display: { xs: "none", md: "block" },
                    position: isDesktopNavSticky ? "fixed" : "relative",
                    top: isDesktopNavSticky ? 10 : "auto",
                    left: isDesktopNavSticky ? "50%" : "auto",
                    transform: isDesktopNavSticky ? "translateX(-50%)" : "none",
                    zIndex: (theme) => theme.zIndex.appBar + 3,
                    width: "100%",
                    maxWidth: (t) => t.breakpoints.values.lg,
                    boxSizing: "border-box",
                    mx: "auto",
                    mt: isDesktopNavSticky ? 0 : { md: 1, lg: 1.25 },
                    mb: isDesktopNavSticky ? 0 : { md: 0.5, lg: 1 },
                    px: { xs: 2, sm: 3, md: 4 },
                    transition: "top 180ms ease",
                }}
            >
                <Box
                    sx={{
                        bgcolor: "#fff",
                        px: { xs: 2, sm: 2.5, md: 3 },
                        py: { xs: 1.15, md: 1.35 },
                        borderRadius: 1.5,
                        boxShadow: isDesktopNavSticky
                            ? "0 10px 24px rgba(0,0,0,0.13)"
                            : "0 8px 20px rgba(0,0,0,0.08)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1.5,
                        }}
                    >
                        {/* Logo */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IconButton
                                sx={{ display: { xs: "inline-flex", md: "none" }, p: 0.7 }}
                                onClick={handleDrawerToggle}
                                aria-label="Open menu"
                            >
                                <Menu fontSize="small" />
                            </IconButton>
                            <Box
                                sx={{
                                    width: { xs: 34, md: 38 },
                                    height: { xs: 34, md: 38 },
                                    borderRadius: "50%",
                                    bgcolor: "primary.main",
                                    display: "grid",
                                    placeItems: "center",
                                }}
                            >
                                <VolunteerActivism sx={{ color: "#fff", fontSize: { xs: 18, md: 20 } }} />
                            </Box>
                            <Typography variant="h6" fontWeight={700} letterSpacing={0.2}>
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
                            sx={{
                                display: { xs: "none", sm: "inline-flex" },
                                borderRadius: 999,
                                px: { sm: 2.5, md: 3.5 },
                                py: 0.8,
                                minHeight: 38,
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                textTransform: "none",
                            }}
                        >
                            Donate Now
                        </Button>
                    </Box>
                </Box>
            </Box>

            {isDesktopNavSticky && (
                <Box
                    sx={{
                        display: { xs: "none", md: "block" },
                        height: { md: 84, lg: 88 },
                    }}
                />
            )}

            <Paper
                elevation={10}
                sx={{
                    display: { xs: "block", md: "none" },
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: (theme) => theme.zIndex.appBar + 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    pb: "env(safe-area-inset-bottom)",
                }}
            >
                <BottomNavigation
                    showLabels
                    value={mobileBottomNavValue}
                    onChange={(_, nextValue) => navigate(nextValue)}
                    sx={{ height: 62 }}
                >
                    {mobileBottomNavItems.map((item) => (
                        <BottomNavigationAction
                            key={item.to}
                            label={item.label}
                            value={item.to}
                            icon={item.icon}
                            sx={{
                                minWidth: 0,
                                "& .MuiBottomNavigationAction-label": {
                                    fontSize: "0.7rem",
                                    fontWeight: 600,
                                },
                                ...(item.to === "/donate" && {
                                    color: "secondary.dark",
                                }),
                            }}
                        />
                    ))}
                </BottomNavigation>
            </Paper>

            <Drawer open={mobileOpen} onClose={handleDrawerToggle} sx={{ display: { xs: "block", md: "none" } }}>
                {drawer}
            </Drawer>
        </Box>
    );
}
