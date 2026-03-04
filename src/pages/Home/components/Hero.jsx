import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const HERO_BACKGROUND_IMAGE =
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=80";

export default function Hero() {
    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                isolation: "isolate",
                overflow: "hidden",
                minHeight: { xs: "74dvh", md: "82dvh" },
                display: "flex",
                alignItems: "center",
                mx: { xs: -2, sm: -3, md: -6, lg: -10 },
                mt: { xs: 1.5, md: 2 },
            }}
        >
            <Box
                aria-hidden
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(92deg, rgba(9, 15, 33, 0.58) 0%, rgba(9, 15, 33, 0.42) 42%, rgba(9, 15, 33, 0.16) 100%), url("${HERO_BACKGROUND_IMAGE}")`,
                    backgroundSize: "cover",
                    backgroundPosition: { xs: "66% center", md: "center" },
                    zIndex: -2,
                }}
            />

            <Box
                sx={{
                    width: "100%",
                    px: { xs: 2, sm: 4, md: 8, lg: 12 },
                    py: { xs: 8, sm: 10, md: 12 },
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", sm: "86%", md: "58%", lg: "52%" },
                        color: "#fff",
                        px: { xs: 3, sm: 5, md: 6 },
                        py: { xs: 4, sm: 5, md: 6.5 },
                        bgcolor: "#2F54C7",
                        borderRadius: "36% 7% 30% 9% / 9% 32% 11% 25%",
                        boxShadow: "0 20px 48px rgba(10, 24, 76, 0.4)",
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: { xs: -9, md: -12 },
                            borderRadius: "40% 8% 33% 10% / 10% 30% 12% 22%",
                            border: "2px solid rgba(100, 152, 255, 0.36)",
                            pointerEvents: "none",
                            zIndex: -1,
                        },
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: "12%",
                            right: "18%",
                            bottom: -20,
                            height: 28,
                            background:
                                "radial-gradient(ellipse at center, rgba(77, 126, 245, 0.55) 0%, rgba(77, 126, 245, 0) 75%)",
                            pointerEvents: "none",
                            zIndex: -1,
                        },
                    }}
                >
                    <Typography
                        component="h1"
                        sx={{
                            fontSize: { xs: "2.05rem", sm: "2.7rem", md: "3.6rem" },
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.08,
                            mb: 2,
                        }}
                    >
                        Let&apos;s Deliver Meals That Matter
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 400,
                            color: "rgba(255,255,255,0.9)",
                            maxWidth: "34ch",
                            mb: { xs: 3.5, md: 4.5 },
                            lineHeight: 1.45,
                            fontSize: { xs: "0.98rem", sm: "1.08rem", md: "1.24rem" },
                        }}
                    >
                        Markets nor aid alone can solve the problems of poverty.
                    </Typography>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <Button
                            component={RouterLink}
                            to="/donate"
                            variant="contained"
                            sx={{
                                alignSelf: { xs: "stretch", sm: "flex-start" },
                                borderRadius: 999,
                                px: 4,
                                py: 1.2,
                                minWidth: 172,
                                bgcolor: "#FF5F47",
                                fontWeight: 700,
                                "&:hover": {
                                    bgcolor: "#f34d34",
                                },
                            }}
                        >
                            Donate Now
                        </Button>

                        <Button
                            component={RouterLink}
                            to="/about"
                            variant="outlined"
                            sx={{
                                alignSelf: { xs: "stretch", sm: "flex-start" },
                                borderRadius: 999,
                                px: 4,
                                py: 1.2,
                                minWidth: 172,
                                borderColor: "rgba(255,255,255,0.88)",
                                color: "#fff",
                                fontWeight: 700,
                                "&:hover": {
                                    borderColor: "#fff",
                                    bgcolor: "rgba(255,255,255,0.08)",
                                },
                            }}
                        >
                            Read Details
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
