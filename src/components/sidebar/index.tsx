import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { FC } from "react";
import{ molecules} from '../../molecules/index.json'
import { Link } from "@mui/material";
export const Sidebar: FC<{
    isOpen: boolean;
    onToggle: (arg: boolean) => void;
}> = ({ isOpen, onToggle }) => {

  
    const DrawerList = (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        <Box sx={{ width: 250 }} role="presentation" onClick={onToggle}>
            <List>
            <ListItem  disablePadding>
                        
                        <ListItemButton>
                            {/* <ListItemIcon>
                              
                            </ListItemIcon> */}
                            <ListItemText primary='Molecules' />
                        </ListItemButton>
                       
                    </ListItem>
                {molecules.map((molecule, index) => (
                    <ListItem key={molecule} disablePadding>
                        <Link href={`/${molecule}`} underline="none">
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={molecule} />
                        </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider />
            
        </Box>
    );

    return (
        <div>
            <Drawer open={isOpen} onClose={onToggle}>
                {DrawerList}
            </Drawer>
        </div>
    );
};
