import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";

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
        bgcolor: depth === 0 ? "transparent" : (theme) => alpha(theme.palette.primary.main, 0.08),
    },
});

export default function DesktopNavItems({ items, depth = 0 }) {
    return items.map((item, index) => {
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
                <Button component={item.to ? Link : "button"} to={item.to} endIcon={arrowIcon} sx={desktopNavButtonSx(depth)}>
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
                        <DesktopNavItems items={item.submenu} depth={depth + 1} />
                    </Box>
                )}
            </Box>
        );
    });
}
