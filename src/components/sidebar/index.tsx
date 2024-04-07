import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FC } from 'react';
import { pages } from '../../molecules/index.json';
import { Link } from '@mui/material';
import { capitalize, toUpper } from 'lodash';
import LoginIcon from '@mui/icons-material/Login';
import PinIcon from '@mui/icons-material/Pin';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import MobiledataOffIcon from '@mui/icons-material/MobiledataOff';
import HomeIcon from '@mui/icons-material/Home';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import GridViewIcon from '@mui/icons-material/GridView';
import { useColorPalates } from '../../molecules/theme-provider/hooks';
import { ChatBubble, HistoryOutlined } from '@mui/icons-material';
const getLabel = (label: string) =>
  label
    .split('-')
    .map((subText) =>
      subText === 'page'
        ? null
        : ['otp', 'faq', 'ui'].includes(subText)
          ? toUpper(subText)
          : capitalize(subText)
    )
    .join(' ');

const getIcon = (label: string) => {
  console.log({ label });
  switch (label) {
    case 'home-page':
      return <HomeIcon />;
    case 'login-mobile-aadhar-page':
      return <LoginIcon />;
    case 'otp-page':
      return <PinIcon />;
    case 'faq-page':
      return <QuestionMarkIcon />;
    case 'history-page':
      return <HistoryOutlined />;
    case 'coming-soon-page':
      return <UpcomingIcon />;
    case 'downtime-page':
      return <MobiledataOffIcon />;
    case 'feedback-page':
      return <ThumbsUpDownIcon />;
    case 'chat-ui':
      return <ChatBubble />;
    default:
      return <GridViewIcon />;
  }
};
const sidebar = pages.map((item: string) => ({
  label: getLabel(item),
  icon: getIcon(item),
  path: `/${item}`,
}));

export const Sidebar: FC<{
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
}> = ({ isOpen, onToggle }) => {
  const theme = useColorPalates();
  console.log({ _theme: theme });
  const DrawerList = (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <Box
      sx={{ width: 250, height: '100vh', background: theme?.primary?.dark }}
      role="presentation"
      onClick={onToggle}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Pages" style={{color: theme?.primary?.light}} />
          </ListItemButton>
        </ListItem>
        {sidebar.map((page) => (
          <ListItem key={page.label} disablePadding>
            <Link href={page.path} underline="none">
              <ListItemButton>
                <ListItemIcon style={{ color: theme?.primary?.light }}>
                  {page.icon}
                </ListItemIcon>
                <ListItemText
                  primary={page?.label}
                  style={{ color: theme?.primary?.light }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Molecules" style={{color: theme?.primary?.light}} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <Link href={`/molecules`} underline="none">
            <ListItemButton>
              <ListItemIcon style={{ color: theme?.primary?.light }}>
                <GridViewIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Molecules'}
                style={{ color: theme?.primary?.light }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        {/* {molecules.map((molecule, index) => (
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
        ))} */}
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
