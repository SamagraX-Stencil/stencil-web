import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import MuiList from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { map } from 'lodash';
import { Avatar, Divider, ListItem, ListItemAvatar, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type ListItemType = {
  id: string;
  label?: string;
  secondaryLabel?: string;
  icon?: React.ReactElement;
  secondaryAction?: React.ReactElement;
  avatar?: string;
  items?: Array<ListItemType>;
  onClick?: (arg?: any) => void;
  isDivider?: boolean;
};

type ListType = {
  items: Array<ListItemType>;
  label?: string;
  noItem?: {
    label?: string;
    icon?: React.ReactElement;
  };
  config: any;
  globalStyles?: {
    list?: React.CSSProperties;
    listItem?: React.CSSProperties;
    listItemButton?: React.CSSProperties;
    listItemIcon?: React.CSSProperties;
    listItemText?: React.CSSProperties;
    collapse?: React.CSSProperties;
  };
};

const defaultGlobalStyles = {
  list: {
    width: '100%',
    bgcolor: 'background.paper',
  },
  listItem: {},
  listItemButton: {},
  listItemIcon: {},
  listItemText: {},
  collapse: {},
};

export const List: React.FC<ListType> = ({ items, label, noItem, config, globalStyles = {} }) => {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const mergedStyles = React.useMemo(
    () => ({
      list: { ...defaultGlobalStyles.list, ...globalStyles.list },
      listItem: { ...defaultGlobalStyles.listItem, ...globalStyles.listItem },
      listItemButton: { ...defaultGlobalStyles.listItemButton, ...globalStyles.listItemButton },
      listItemIcon: { ...defaultGlobalStyles.listItemIcon, ...globalStyles.listItemIcon },
      listItemText: { ...defaultGlobalStyles.listItemText, ...globalStyles.listItemText },
      collapse: { ...defaultGlobalStyles.collapse, ...globalStyles.collapse },
    }),
    [globalStyles],
  );

  const handleClick = React.useCallback(
    (id: string) => {
      if (id === openItem) setOpenItem(null);
      else setOpenItem(id);
    },
    [openItem],
  );

  const hasItems = React.useMemo(() => items?.length > 0, [items]);

  if (!hasItems)
    return (
      <MuiList sx={mergedStyles.list} component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton sx={mergedStyles.listItemButton}>
          <ListItemIcon sx={mergedStyles.listItemIcon}>
            {noItem?.icon ? React.cloneElement(noItem?.icon) : <ErrorOutlineIcon />}
          </ListItemIcon>
          <ListItemText
            sx={mergedStyles.listItemText}
            primary={noItem?.label ?? 'Nothing available'}
          />
        </ListItemButton>
      </MuiList>
    );

  return (
    <MuiList
      sx={mergedStyles.list}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<>{label && <ListSubheader component="div">{label}</ListSubheader>}</>}
    >
      {map(items, (item) => (
        <React.Fragment key={item.id}>
          <ListItem sx={mergedStyles.listItem} secondaryAction={item?.secondaryAction ?? null}>
            <ListItemButton
              sx={mergedStyles.listItemButton}
              onClick={(ev) => {
                ev.stopPropagation();
                if (item?.items) {
                  return handleClick(item?.id);
                }
                if (item?.onClick) return item?.onClick(item);
                return null;
              }}
            >
              {item.icon && (
                <ListItemIcon sx={mergedStyles.listItemIcon}>
                  {React.cloneElement(item.icon)}
                </ListItemIcon>
              )}
              {item.avatar && (
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src={item.avatar} />
                </ListItemAvatar>
              )}
              {item.label && (
                <ListItemText
                  sx={mergedStyles.listItemText}
                  primary={item.label}
                  secondary={
                    <React.Fragment>
                      {config?.showTimestamp && item?.secondaryLabel && (
                        <Typography
                          sx={{ display: 'inline' }}
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
              {item?.items && <>{openItem === item?.id ? <ExpandLess /> : <ExpandMore />}</>}
            </ListItemButton>
          </ListItem>
          <Collapse
            in={openItem === item?.id}
            timeout="auto"
            unmountOnExit
            sx={mergedStyles.collapse}
          >
            <MuiList component="div" disablePadding>
              <ListItemButton sx={{ pl: 8, ...mergedStyles.listItemButton }}>
                <ListItemIcon sx={mergedStyles.listItemIcon}>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText sx={mergedStyles.listItemText} primary="Starred" />
              </ListItemButton>
            </MuiList>
          </Collapse>
          {item?.isDivider && <Divider />}
        </React.Fragment>
      ))}
    </MuiList>
  );
};