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
import { FC, useCallback } from "react";
import { molecules, pages } from "../../molecules/index.json";
import { Link } from "@mui/material";
import { capitalize } from "lodash";
export const Sidebar: FC<{
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
}> = ({ isOpen, onToggle }) => {

    const getLabel =useCallback((label:string)=>{
      return  label.split('-').map(subText=>capitalize(subText)).join(" ")
    },[])
  const DrawerList = (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <Box sx={{ width: 250 }} role="presentation" onClick={onToggle}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            {/* <ListItemIcon>
                              
                            </ListItemIcon> */}
            <ListItemText primary="Pages" />
          </ListItemButton>
        </ListItem>
        {pages.map((page, index) => (
          <ListItem key={page} disablePadding>
            <Link href={`/${page}`} underline="none">
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={getLabel(page)} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>     
            
              <ListItemText primary="Molecules" />
     
          </ListItemButton>
        </ListItem>
        <ListItem  disablePadding>
                <Link href={`/molecules`} underline="none">
                  <ListItemButton>
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Molecules'} />
                  </ListItemButton>
                </Link>
              </ListItem>
        {molecules.map((molecule, index) => (
              <ListItem key={molecule} disablePadding>
                <Link href={`/${molecule}`} underline="none">
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={getLabel(molecule)} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
      </List>
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
