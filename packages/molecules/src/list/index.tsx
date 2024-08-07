import * as React from 'react';
import MuiList from '@mui/material/List';
import {
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListSubheader,
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandLess, StarBorder, ExpandMore, ErrorOutline, Delete } from '@mui/icons-material';
import { ListType } from './types';
import { map } from 'lodash';
import { Avatar, Divider, ListItem, ListItemAvatar, Typography } from '@mui/material';

interface ListProps extends ListType {
  showTimestamp: boolean;
}

export const List: React.FC<ListProps> = ({ items, label, noItem, onDelete, styles = [], showTimestamp }) => {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const handleClick = React.useCallback(
    (id: string) => {
      if (id === openItem) setOpenItem(null);
      else setOpenItem(id);
    },
    [openItem],
  );

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const hasItems = React.useMemo(() => items?.length > 0, [items]);

  const mergedStyles = (styles as object[]).reduce((acc, style) => ({ ...acc, ...style }), {});

  if (!hasItems)
    return (
      <MuiList
        sx={{ width: '100%', bgcolor: 'background.paper', ...mergedStyles }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <ListItemIcon>
            {noItem?.icon ? React.cloneElement(noItem?.icon) : <ErrorOutline />}
          </ListItemIcon>
          <ListItemText primary={noItem?.label ?? 'Nothing available'} />
        </ListItemButton>
      </MuiList>
    );

  return (
    <MuiList
      sx={{ width: '100%', bgcolor: 'background.paper', ...mergedStyles }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<>{label && <ListSubheader component="div">{label}</ListSubheader>}</>}
    >
      {map(items, (item) => {
        return (
          <div key={item.id}>
            <ListItem secondaryAction={item?.secondaryAction ?? null}>
              <ListItemButton
                onClick={(ev) => {
                  ev.stopPropagation();
                  if (item?.items) {
                    return handleClick(item?.id);
                  }
                  if (item?.onClick) return item?.onClick(item);
                  return null;
                }}
              >
                {item.icon && <ListItemIcon>{React.cloneElement(item.icon)}</ListItemIcon>}
                {item.avatar && (
                  <ListItemAvatar>
                    <Avatar alt="Item Avatar" src={item.avatar} />
                  </ListItemAvatar>
                )}
                {item.label && (
                  <ListItemText
                    primary={item.label}
                    secondary={
                      <React.Fragment>
                        {showTimestamp && item?.secondaryLabel && (
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
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                  <Delete />
                </IconButton>
              </ListItemButton>
            </ListItem>
            <Collapse in={openItem === item?.id} timeout="auto" unmountOnExit>
              <MuiList component="div" disablePadding>
                {item.items &&
                  item.items.map((nestedItem) => (
                    <ListItemButton key={nestedItem.id} sx={{ pl: 8 }}>
                      <ListItemIcon>
                        {nestedItem.icon ? React.cloneElement(nestedItem.icon) : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary={nestedItem.label} />
                    </ListItemButton>
                  ))}
              </MuiList>
            </Collapse>
            {item?.isDivider && <Divider />}
          </div>
        );
      })}
    </MuiList>
  );
};