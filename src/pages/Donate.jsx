import { Box, Typography } from "@mui/material";

export default function Donate() {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 1 }}>
                Donate
            </Typography>
            <Typography color="text.secondary">
                Support our mission by contributing to active campaigns.
            </Typography>
        </Box>
    );
}
