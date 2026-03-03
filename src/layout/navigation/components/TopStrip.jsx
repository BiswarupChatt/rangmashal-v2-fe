import { Menu } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import HeaderBrand from "./HeaderBrand";
import { SOCIAL_ITEMS, TOP_CONTACT_ITEMS } from "./headerData";

const topIconBubbleSx = (theme) => ({
    width: { xs: 28, md: 30 },
    height: { xs: 28, md: 30 },
    borderRadius: "50%",
    bgcolor: alpha(theme.palette.common.white, 0.2),
    display: "grid",
    placeItems: "center",
});

export default function TopStrip({ onMenuClick }) {
    return (
        <Box
            sx={{
                bgcolor: "primary.main",
                borderBottom: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
            }}
        >
            <Box
                sx={{
                    maxWidth: (theme) => theme.breakpoints.values.lg,
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 1.5, md: 0.45 },
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
                    <Box sx={{ display: { xs: "flex", md: "none" }, width: "100%", justifyContent: "space-between", alignItems: "center", gap: 0.8 }}>
                        <IconButton
                            onClick={onMenuClick}
                            aria-label="Open menu"
                            size="small"
                            sx={{
                                width: 30,
                                height: 30,
                                color: "primary.contrastText",
                                bgcolor: (theme) => alpha(theme.palette.common.white, 0.2),
                            }}
                        >
                            <Menu fontSize="small" />
                        </IconButton>
                        <HeaderBrand />
                    </Box>

                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2.5 }}>
                        {TOP_CONTACT_ITEMS.map(({ id, value, Icon }) => (
                            <Box key={id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={topIconBubbleSx}>
                                    <Icon fontSize="small" />
                                </Box>
                                <Typography variant="body2" fontWeight={500}>
                                    {value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
                        {SOCIAL_ITEMS.map(({ id, Icon }) => (
                            <IconButton
                                key={id}
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: (theme) => alpha(theme.palette.common.white, 0.2),
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
    );
}
