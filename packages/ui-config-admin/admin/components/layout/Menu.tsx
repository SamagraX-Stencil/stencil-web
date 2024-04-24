import * as React from 'react';
import { Menu } from 'react-admin';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const MyMenu = () => {
  return (
    <Menu>
      <Menu.Item
        key="botUIConfig"
        to="/botUIConfig"
        state={{ _scrollToTop: true }}
        primaryText="Bot UI Config"
        leftIcon={<SmartToyIcon />}
      />
    </Menu>
  );
};

export default MyMenu;
