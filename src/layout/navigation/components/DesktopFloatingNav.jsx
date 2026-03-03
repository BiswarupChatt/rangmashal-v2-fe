import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DesktopNavItems from "./DesktopNavItems";
import HeaderBrand from "./HeaderBrand";
import { DONATE_ROUTE } from "./headerData";

export default function DesktopFloatingNav({ isSticky, navItems }) {
    return (
        <>
            <Box
                sx={{
                    display: { xs: "none", md: "block" },
                    position: isSticky ? "fixed" : "relative",
                    top: isSticky ? 10 : "auto",
                    left: isSticky ? "50%" : "auto",
                    transform: isSticky ? "translateX(-50%)" : "none",
                    zIndex: (theme) => theme.zIndex.appBar + 3,
                    width: "100%",
                    maxWidth: (theme) => theme.breakpoints.values.lg,
                    boxSizing: "border-box",
                    mx: "auto",
                    mt: isSticky ? 0 : { md: 1, lg: 1.25 },
                    mb: isSticky ? 0 : { md: 0.5, lg: 1 },
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
                        boxShadow: isSticky ? "0 10px 24px rgba(0,0,0,0.13)" : "0 8px 20px rgba(0,0,0,0.08)",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
                        <HeaderBrand iconBoxSize={38} iconSize={20} textVariant="h6" gap={1} iconBg="primary.main" />

                        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                            <DesktopNavItems items={navItems} />
                        </Box>

                        <Button
                            variant="contained"
                            component={Link}
                            to={DONATE_ROUTE}
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

            {isSticky && (
                <Box
                    sx={{
                        display: { xs: "none", md: "block" },
                        height: { md: 84, lg: 88 },
                    }}
                />
            )}
        </>
    );
}
