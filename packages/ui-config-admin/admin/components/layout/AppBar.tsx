import * as React from "react";
import { AppBar, Logout, ToggleThemeButton, UserMenu, useTranslate, defaultTheme } from "react-admin";
import { Link } from "react-router-dom";
import {
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import SettingsIcon from "@mui/icons-material/Settings";
import { forwardRef } from "react";
// import { darkTheme, lightTheme } from "./themes";
// import { darkTheme, lightTheme } from "./themes";



// eslint-disable-next-line react/display-name
// const ConfigurationMenu = forwardRef((props, ref) => {
//     const translate = useTranslate();
//     return (
//         <MenuItem
//             component={Link}
//             // @ts-ignore
//             ref={ref}
//             {...props}
//             to="/configuration"
//         >
//             <ListItemIcon>
//                 <SettingsIcon />
//             </ListItemIcon>
//             <ListItemText>{translate("pos.configuration")}</ListItemText>
//         </MenuItem>
//     );
// });

const CustomAppBar = (props: any) => {
    return (
        <>
            <AppBar
                {...props}
                elevation={1}
                // userMenu={<Logout />}
            >
                <Typography sx={{ flex: 1 }} />
            </AppBar>
            {/* <style>
                {`
                    .RaUserMenu-avatar {
                        display: none !important;
                    }
                `}
            </style> */}
        </>
    );
};

export default CustomAppBar;
