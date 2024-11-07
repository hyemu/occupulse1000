import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import TableChartIcon from '@mui/icons-material/TableChart';
import SettingsIcon from '@mui/icons-material/Settings';
import InboxIcon from '@mui/icons-material/Inbox';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const icons = {
  NavigationOutlinedIcon,
  HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon,
  AccountTreeOutlinedIcon,
  BlockOutlinedIcon,
  AppsOutlinedIcon,
  ContactSupportOutlinedIcon,
  TroubleshootIcon,
  LibraryBooksIcon,
  ContactEmergencyIcon,
  TableChartIcon,
  SettingsIcon,
  SupervisorAccountIcon,
  InboxIcon,
};

// ==============================|| MENU ITEMS ||============================== //

export default {
  items: [
    {
      id: 'navigation',
      title: 'OccuPulse',
      caption: 'Dashboard',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'homepage',
          title: 'Dashboard',
          type: 'item',
          icon: icons['HomeOutlinedIcon'],
          url: '/homepage'
        }
      ]
    },
    {
      id: 'tools',
      title: 'Tools',
      caption: '',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'predictionpage',
          title: 'OccuPulse Prediction',
          type: 'item',
          url: '/prediction',
          icon: icons['TroubleshootIcon']
        },
        {
          id: 'evaluationpage',
          title: 'Employability Evaluation',
          type: 'item',
          url: '/evaluation',
          icon: icons['LibraryBooksIcon']
        }
      ]
    },
    {
      id: 'menu',
      title: 'Menu',
      caption: '',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'studentprofile',
          title: 'Student Profile',
          type: 'item',
          url: '/student',
          icon: icons['ContactEmergencyIcon']
        },
        {
          id: 'messagepage',
          title: 'My Messages',
          type: 'item',
          url: '/message',
          icon: icons['InboxIcon']
        },
        {
          id: 'settingspage',
          title: 'Settings',
          type: 'item',
          url: '/settings',
          icon: icons['SettingsIcon']
        },
        {
          id: 'admindashboard',
          title: 'Admin',
          type: 'item',
          url: '/admin',
          icon: icons['SupervisorAccountIcon']
        },
        {
          id: 'studentdata',
          title: 'Student Data',
          type: 'item',
          url: '/student-data',
          icon: icons['TableChartIcon']
        },
        {
          id: 'plpdata',
          title: 'PLP Data',
          type: 'item',
          url: '/plpdata',
          icon: icons['TableChartIcon']
        },
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          children: [
            {
              id: 'login-1',
              title: 'Login',
              type: 'item',
              url: '/application/login',
              target: true
            },
            {
              id: 'register',
              title: 'Register',
              type: 'item',
              url: '/application/register',
              target: true
            }
          ]
        }
      ]
    }
  ]
};


/*

// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import TableChartIcon from '@mui/icons-material/TableChart';
import SettingsIcon from '@mui/icons-material/Settings';

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon,
  TroubleshootIcon: TroubleshootIcon,
  LibraryBooksIcon: LibraryBooksIcon,
  ContactEmergencyIcon: ContactEmergencyIcon,
  TableChartIcon: TableChartIcon,
  SettingsIcon: SettingsIcon,
};

// ==============================|| MENU ITEMS ||============================== //

// eslint-disable-next-line
export default {
  items: [
    {
      id: 'navigation',
      title: 'OccuPulse',
      caption: 'Dashboard',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'homepage',
          title: 'Dashboard',
          type: 'item',
          icon: icons['HomeOutlinedIcon'],
          url: '/homepage'
        }
      ]
    },
    {
      id: 'pages',
      title: 'Tools',
      caption: '',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'predictionpage',
          title: 'OccuPulse Prediction',
          type: 'item',
          url: '/prediction',
          icon: icons['TroubleshootIcon']
        },
        {
          id: 'evaluationpage',
          title: 'Employability Evaluation',
          type: 'item',
          url: '/evaluation',
          icon: icons['LibraryBooksIcon']
        },
        {
          id: 'studentprofile',
          title: 'Student Profile',
          type: 'item',
          url: '/student',
          icon: icons['ContactEmergencyIcon']
        },
        {
          id: 'studentdata',
          title: 'Student Data',
          type: 'item',
          url: '/student-data',
          icon: icons['TableChartIcon']
        },
        {
          id: 'settingspage',
          title: 'Settings',
          type: 'item',
          url: '/settings',
          icon: icons['SettingsIcon']
        },
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          children: [
            {
              id: 'login-1',
              title: 'Login',
              type: 'item',
              url: '/application/login',
              target: true
            },
            {
              id: 'register',
              title: 'Register',
              type: 'item',
              url: '/application/register',
              target: true
            },
            
          ]
          
        }
      ]
    },
    /*
    {
      id: 'utils',
      title: 'Utils',
      type: 'group',
      icon: icons['AccountTreeOutlinedIcon'],
      children: [
        {
          id: 'util-icons',
          title: 'Icons',
          type: 'item',
          url: 'https://mui.com/material-ui/material-icons/',
          icon: icons['AppsOutlinedIcon'],
          external: true,
          target: true
        },
        {
          id: 'util-typography',
          title: 'Typography',
          type: 'item',
          url: '/utils/util-typography',
          icon: icons['FormatColorTextOutlinedIcon']
        }
      ]
    },
    {
      id: 'support',
      title: 'Support',
      type: 'group',
      icon: icons['ContactSupportOutlinedIcon'],
      children: [
        {
          id: 'disabled-menu',
          title: 'Disabled Menu',
          type: 'item',
          url: '#',
          icon: icons['BlockOutlinedIcon'],
          disabled: true
        },
        {
          id: 'documentation',
          title: 'Documentation',
          type: 'item',
          url: 'https://codedthemes.gitbook.io/materially-react-material-documentation/',
          icon: icons['HelpOutlineOutlinedIcon'],
          chip: {
            label: 'Help?',
            color: 'primary'
          },
          external: true,
          target: true
        }
      ]
    }*/
/*
  ] 
};
*/