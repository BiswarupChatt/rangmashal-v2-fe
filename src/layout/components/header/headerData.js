import {
    ContactMailOutlined,
    EmailOutlined,
    Facebook,
    FavoriteRounded,
    HomeRounded,
    InfoOutlined,
    PhoneInTalk,
    Twitter,
    YouTube,
} from "@mui/icons-material";

export const BRAND_NAME = "Lifeline";
export const DONATE_ROUTE = "/donate";

export const NAV_ITEMS = [
    { label: "Home", to: "/" },
    {
        label: "Demos",
        to: "/demos",
        submenu: [
            { label: "Home Classic", to: "/" },
            { label: "About Us", to: "/about" },
            { label: "Contact", to: "/contact" },
        ],
    },
    {
        label: "Causes",
        to: "/causes",
        submenu: [
            { label: "Medical Support", to: "/causes/medical-support" },
            { label: "Food Donation", to: "/causes/food-donation" },
        ],
    },
    {
        label: "Pages",
        to: "/pages",
        submenu: [
            { label: "About Us", to: "/about" },
            { label: "Contact", to: "/contact" },
            {
                label: "More Pages",
                submenu: [
                    { label: "FAQ", to: "/pages/faq" },
                    { label: "Team", to: "/pages/team" },
                ],
            },
        ],
    },
    { label: "About Us", to: "/about" },
];

export const MOBILE_BOTTOM_NAV_ITEMS = [
    { label: "Home", to: "/", Icon: HomeRounded },
    { label: "About", to: "/about", Icon: InfoOutlined },
    { label: "Contact", to: "/contact", Icon: ContactMailOutlined },
    { label: "Donate", to: DONATE_ROUTE, Icon: FavoriteRounded },
];

export const TOP_CONTACT_ITEMS = [
    { id: "phone", value: "+00 666 000 999", Icon: PhoneInTalk },
    { id: "email", value: "info@loveussmart.com", Icon: EmailOutlined },
];

export const SOCIAL_ITEMS = [
    { id: "facebook", Icon: Facebook },
    { id: "twitter", Icon: Twitter },
    { id: "youtube", Icon: YouTube },
];
