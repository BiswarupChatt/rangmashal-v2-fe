import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { DONATE_ROUTE } from "./headerData";

export default function MobileBottomNavBar({ items, value, onChange }) {
    return (
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
            <BottomNavigation showLabels value={value} onChange={(_, nextValue) => onChange(nextValue)} sx={{ height: 62 }}>
                {items.map(({ label, to, Icon }) => (
                    <BottomNavigationAction
                        key={to}
                        label={label}
                        value={to}
                        icon={<Icon fontSize="small" />}
                        sx={{
                            minWidth: 0,
                            "& .MuiBottomNavigationAction-label": {
                                fontSize: "0.7rem",
                                fontWeight: 600,
                            },
                            ...(to === DONATE_ROUTE && { color: "secondary.dark" }),
                        }}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    );
}
