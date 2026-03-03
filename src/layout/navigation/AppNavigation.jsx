import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DesktopFloatingNav from "./components/DesktopFloatingNav";
import MobileBottomNavBar from "./components/MobileBottomNavBar";
import MobileHeaderDrawer from "./components/MobileHeaderDrawer";
import TopStrip from "./components/TopStrip";
import { MOBILE_BOTTOM_NAV_ITEMS, NAV_ITEMS } from "./components/headerData";

export default function AppNavigation() {
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

    const mobileBottomNavValue =
        MOBILE_BOTTOM_NAV_ITEMS.find((item) =>
            item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)
        )?.to ?? "/";

    return (
        <Box component="header" sx={{ position: "relative", pb: { xs: 0, md: 1 } }}>
            <TopStrip onMenuClick={handleDrawerToggle} />   

            <DesktopFloatingNav isSticky={isDesktopNavSticky} navItems={NAV_ITEMS} />

            <MobileBottomNavBar items={MOBILE_BOTTOM_NAV_ITEMS} value={mobileBottomNavValue} onChange={navigate} />

            <MobileHeaderDrawer
                open={mobileOpen}
                onClose={handleDrawerToggle}
                navItems={NAV_ITEMS}
                openSubmenus={openSubmenus}
                onToggleSubmenu={toggleSubmenu}
            />
        </Box>
    );
}
