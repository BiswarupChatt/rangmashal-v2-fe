import { Close, KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, Collapse, Divider, Drawer, IconButton, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderBrand from "./HeaderBrand";
import { DONATE_ROUTE } from "./headerData";

const hasSubmenu = (item) => Array.isArray(item?.submenu) && item.submenu.length > 0;

function MobileNavItems({ items, openSubmenus, onToggleSubmenu, onClose, depth = 0, parentKey = "root" }) {
    return items.map((item, index) => {
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
                            onToggleSubmenu(key);
                            return;
                        }
                        onClose();
                    }}
                    sx={{
                        borderRadius: 2,
                        my: 0.5,
                        pl: 2 + depth * 2,
                    }}
                >
                    <ListItemText primary={item.label} />
                    {submenu ? isOpen ? <KeyboardArrowDown fontSize="small" /> : <KeyboardArrowRight fontSize="small" /> : null}
                </ListItemButton>

                {submenu && (
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <MobileNavItems
                                items={item.submenu}
                                openSubmenus={openSubmenus}
                                onToggleSubmenu={onToggleSubmenu}
                                onClose={onClose}
                                depth={depth + 1}
                                parentKey={key}
                            />
                        </List>
                    </Collapse>
                )}
            </Box>
        );
    });
}

export default function MobileHeaderDrawer({ open, onClose, navItems, openSubmenus, onToggleSubmenu }) {
    return (
        <Drawer open={open} onClose={onClose} sx={{ display: { xs: "block", md: "none" } }}>
            <Box sx={{ width: 280 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                    <HeaderBrand iconBoxSize={32} iconSize={18} textVariant="h6" gap={1} iconBg="primary.main" />
                    <IconButton onClick={onClose} aria-label="Close menu">
                        <Close />
                    </IconButton>
                </Box>

                <Divider />

                <List sx={{ px: 1 }}>
                    <MobileNavItems
                        items={navItems}
                        openSubmenus={openSubmenus}
                        onToggleSubmenu={onToggleSubmenu}
                        onClose={onClose}
                    />
                </List>

                <Box sx={{ p: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        component={Link}
                        to={DONATE_ROUTE}
                        onClick={onClose}
                        sx={{ borderRadius: 999 }}
                    >
                        Donate Now
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
}
