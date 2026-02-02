import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",

        // 🌊 PRIMARY (Brand Color)
        primary: {
            main: "#32BFC2",
            light: "#6ED9DB",
            dark: "#24999C",
            contrastText: "#ffffff",
        },

        // 🌟 SECONDARY (Accent / CTA)
        secondary: {
            main: "#FFD041",
            light: "#FFE27A",
            dark: "#E6B800",
            contrastText: "#1a1a1a",
        },

        // ⚪ Backgrounds
        background: {
            default: "#F7FBFB",
            paper: "#FFFFFF",
        },

        // 🧱 Surfaces & UI structure
        divider: "#E0F2F3",

        // 📄 Text hierarchy
        text: {
            primary: "#1E2A2A",
            secondary: "#5F7A7A",
            disabled: "#9BB5B5",
        },

        // 🚦 Status colors
        success: { main: "#4CAF50" },
        error: { main: "#E53935" },
        warning: { main: "#FB8C00" },
        info: { main: "#0288D1" },
    },

    typography: {
        fontFamily: "'Inter', 'Roboto', sans-serif",

        h1: { fontSize: "2.5rem", fontWeight: 700 },
        h2: { fontSize: "2rem", fontWeight: 700 },
        h3: { fontSize: "1.75rem", fontWeight: 600 },
        h4: { fontSize: "1.5rem", fontWeight: 600 },
        body1: { fontSize: "1rem" },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 12,
    },

    shadows: [
        "none",
        "0 2px 6px rgba(50,191,194,0.08)",
        "0 4px 12px rgba(50,191,194,0.10)",
        ...Array(22).fill("0 6px 20px rgba(0,0,0,0.05)")
    ],

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: "8px 18px",
                },
                containedPrimary: {
                    // boxShadow: "0 4px 14px rgba(50,191,194,0.35)",
                    // "&:hover": {
                    //     boxShadow: "0 6px 18px rgba(50,191,194,0.45)",
                    // },
                },
                containedSecondary: {
                    boxShadow: "0 4px 14px rgba(255,208,65,0.35)",
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: "1px solid #E0F2F3",
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 10,
                    },
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "#FFFFFF",
                    color: "#1E2A2A",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
    },
});

export default theme;
