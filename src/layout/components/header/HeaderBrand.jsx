import { VolunteerActivism } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { BRAND_NAME } from "./headerData";

export default function HeaderBrand({
    iconBoxSize = 28,
    iconSize = 16,
    textVariant = "subtitle2",
    gap = 0.8,
    iconBg = (theme) => alpha(theme.palette.common.white, 0.22),
}) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap }}>
            <Box
                sx={{
                    width: iconBoxSize,
                    height: iconBoxSize,
                    borderRadius: "50%",
                    bgcolor: iconBg,
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <VolunteerActivism sx={{ color: "#fff", fontSize: iconSize }} />
            </Box>
            <Typography variant={textVariant} fontWeight={700} letterSpacing={0.2}>
                {BRAND_NAME}
            </Typography>
        </Box>
    );
}
