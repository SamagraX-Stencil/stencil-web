import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import MuiList from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { ListType } from "./index.d";
import { map } from "lodash";
import { Avatar, Divider, ListItem, ListItemAvatar, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


export const List: React.FC<ListType> = ({ items, label ,noItem }) => {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const handleClick = React.useCallback(
    (id: string) => {
      if (id === openItem) setOpenItem(null);
      else setOpenItem(id);
    },
    [openItem]
  );

  const hasItems = React.useMemo(() => items?.length > 0, [items]);

  if (!hasItems)
    return (
      <MuiList
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <ListItemIcon>
          {noItem?.icon ? React.cloneElement(noItem?.icon) : <ErrorOutlineIcon /> }  
          </ListItemIcon>
          <ListItemText primary={noItem?.label ?? "Nothing available"} />
        </ListItemButton>
      </MuiList>
    );
  return (
    <MuiList
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <>{label && <ListSubheader component="div">{label}</ListSubheader>}</>
      }
    >
      {map(items, (item) => {
        console.log({ item });
        return (
          <>
            <ListItem secondaryAction={
                item?.secondaryAction ?? null
            }>
              <ListItemButton
            
                onClick={
                    (ev)=>{
                        ev.stopPropagation()
                        if(item?.items){
                          return  handleClick(item?.id)
                        }
                       if(item?.onClick)
                       return item?.onClick(item)
                    return null
                    }
                 
                }
              >
                {item.icon && (
                  <ListItemIcon>{React.cloneElement(item.icon)}</ListItemIcon>
                )}
                {item.avatar && (
                  <ListItemAvatar>
                    <Avatar alt="Travis Howard" src={item.avatar} />
                  </ListItemAvatar>
                )}
                {item.label && (
                  <ListItemText
                    primary={item.label}
                    secondary={
                      <React.Fragment>
                        {item?.secondaryLabel && (
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item?.secondaryLabel}
                          </Typography>
                        )}
                      </React.Fragment>
                    }
                  />
                )}
                {item?.items && (
                  <>{openItem === item?.id ? <ExpandLess /> : <ExpandMore />}</>
                )}
              </ListItemButton>
            </ListItem>
            <Collapse in={openItem === item?.id} timeout="auto" unmountOnExit>
              <MuiList component="div" disablePadding>
                <ListItemButton sx={{ pl: 8 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </MuiList>
            </Collapse>
           {item?.isDivider && <Divider />}
          </>
        );
      })}
    </MuiList>
  );
};
