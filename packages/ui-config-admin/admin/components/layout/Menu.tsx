import * as React from 'react';
import { Menu } from 'react-admin';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const MyMenu = () => {
  return (
    <Menu>
      <Menu.Item
        key="allMoleculesApp"
        to="/allMoleculesApp"
        state={{ _scrollToTop: true }}
        primaryText="All Molecules App"
        leftIcon={<SmartToyIcon />}
      />
      <Menu.Item
        key="Bot"
        to="/bot"
        state={{ _scrollToTop: true }}
        primaryText="Bot"
        leftIcon={<SmartToyIcon />}
      />
    </Menu>
  );
};

export default MyMenu;
