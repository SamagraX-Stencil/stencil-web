import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Divider } from '@mui/material';
import { colors } from './colors';
import { map } from 'lodash';
import { useTheme } from '../../molecules/theme-provider/hooks';

export type Color={ light: string;
    main: string;
    dark: string;
    contrastText:string;
}
const ColorBox : React.FC<{color:Color}> =({color})=>{
    return  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      bgcolor: 'background.paper',
      color: 'text.secondary',
      '& svg': {
        m: 1,
      },
    }}
  >
    <div style={{width:'50px',height:'20px' ,background: color.main || 'red'}}/>
    <Divider orientation="vertical" variant="middle" flexItem />
    <div style={{width:'50px',height:'20px' ,background:color.light || 'green'}}/>
  </Box>
}
const ThemePicker=() =>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { modifyPaletes } =useTheme()
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

const onThemeClick=React.useCallback((selectedColor:Color)=>()=>{
console.log({selectedColor})
modifyPaletes(selectedColor);
},[modifyPaletes]);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>Th</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            maxHeight:'300px',
            overflow: 'scroll',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem> */}
       
        {map(colors,(_)=>  <MenuItem onClick={onThemeClick(_)}><ColorBox color={_}/> </MenuItem>)}
       
        
      </Menu>
    </React.Fragment>
  );
}

export default ThemePicker
