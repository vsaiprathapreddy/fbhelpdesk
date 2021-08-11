import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import TextsmsIcon from '@material-ui/icons/Textsms';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChatBox from './ChatBox';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const filterConversations = (events) => {
  return events.filter((event) => {
    const { object, entry = [] } = event;
    const { changes = [] } = entry[0] || { changes: [] };
    const { field, value = {} } = changes[0] || {};
    const { created_time, from = {}, item, message } = value;

    return ["comment"].includes(item)
  })
}

const PAGE_ACCESS_TOKEN = 'EAAD3CxgY3X4BALSY4T8vKoAzgQRcAIMJcVflb8u9cGx0pfvuh8gYcXAelhIGJltwFcckeuUitlB1LczhV8NpqDBZCx6cUaqdaDqboVjoqSxQPzdFm2NY2D56YgL0xidm4LA7VOyuMc3AGqUVZCig5vYCNcxlZAQ64FDL0QITh2e9SueGC1IZAUFMOe0uFUcMjKRbN5vvDRBQW5EdQRXhcKM7W7cLvNMZD';

export default function HomePage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [events, setEvents] = useState([]);
  const [listening, setListening] = useState(false);
  const [activeEventID, setActiveEventID] = useState(null);
  const [message, setMessage] = useState('');

  const onLoggedOut = () => {
    sessionStorage.clear();
    window.location = "/login"
  }

  useEffect(() => {
    if (!listening) {
      const events = new EventSource('https://richpanel-be.herokuapp.com/events');

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if (Array.isArray(parsedData)) {
          setEvents((events) => {
            window.mydata = filterConversations(parsedData)
            setEvents(filterConversations(parsedData))
          });
        } else {
          setEvents((events) => {
            setEvents([...filterConversations([parsedData]), ...events])
          });
        }
      };

      setListening(true);
    }
  }, [listening, events]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const postMessage = (postID) => {
    fetch(`https://graph.facebook.com/${postID}/comments?message=${message}&access_token=${PAGE_ACCESS_TOKEN}`, { method: 'POST' })
      .then(data => {
        return data.json()
      }).then(data => {
        setMessage('')
        console.log(data);
      });;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Rich Panel - Agent
          </Typography>

          <Button variant="outlined" style={{
            backgroundColor: '#ffffff',
            position: 'absolute',
            top: 10,
            right: 10
          }}
          onClick={() => onLoggedOut()}
          >Logout</Button>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Drafts', 'Starred', 'Send email'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text == 'Drafts' ? 'Conversations' : text} />
            </ListItem>
          ))}
        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ChatBox
          events={events}
          setActiveEventID={(eventID) => setActiveEventID(eventID)}
          activeEventID={activeEventID}
          message={message}
          setMessage={(event) => {
            setMessage(event.target.value)
          }}
          postMessage={(id) => postMessage(id)}
        />
      </main>
    </div>
  );
}
