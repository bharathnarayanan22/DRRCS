import React, { useState } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import Helpers from "../coordinatorComponents/Helpers";
import Tasks from "../coordinatorComponents/Tasks";
import CreateTask from "../coordinatorComponents/CreateTask";
import Resources from "../coordinatorComponents/Resources";
import Requests from "../coordinatorComponents/CreateRequests";
import Responses from "../coordinatorComponents/RequestStatus";
import List from "@mui/material/List";
import BecomeACo from "../coordinatorComponents/BecomeACo";
import { useDispatch } from "react-redux";
import { removeToken } from "../redux/userSlice";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/Task";
import AddTaskIcon from "@mui/icons-material/AddTask";
import FolderIcon from "@mui/icons-material/Folder";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import BadgeIcon from "@mui/icons-material/Badge";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import logo1 from "../assets/logo.png";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

const StyledList = styled(List)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

const theme = createTheme({
    palette: {
        primary: {
            main: "#444",
        },
        secondary: {
            main: "#444",
        },
    },
});

export default function CoordinatorDashboard() {
    const [open, setOpen] = useState(false);
    const [selectedView, setSelectedView] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuItemClick = (view) => {
        setSelectedView(view);
    };

    const handleHomeClick = () => {
        localStorage.removeItem('token');
        dispatch(removeToken());
        navigate('/register');

    };

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    backgroundImage: `url(${logo1})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.2,
                    marginTop: '10%',
                    height: '70%',
                    width: '100%',
                    position: 'absolute',
                    zIndex: -1,
                }}
            />
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" color="white">
                            Coordinator Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <Box>
                        <DrawerHeader>
                            <IconButton
                                onClick={handleDrawerClose}
                                color="inherit"
                                sx={{ "&:hover": { backgroundColor: "#444", color: "white" } }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <StyledList>
                            <ListItemButton
                                onClick={() => handleMenuItemClick("View Helpers")}
                                sx={{ "&:hover": { backgroundColor: "#444", color: "white" }, gap: "32px" }}
                            >
                                {/* <StyledListItemIcon> */}
                                <PeopleIcon />
                                {/* </StyledListItemIcon> */}
                                <ListItemText primary="View Helpers" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => handleMenuItemClick("View Tasks")}
                                sx={{ "&:hover": { backgroundColor: "#444", color: "white" }, gap: "32px" }}
                            >
                                {/* <StyledListItemIcon> */}
                                <TaskIcon />
                                {/* </StyledListItemIcon> */}
                                <ListItemText primary="View Tasks" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => handleMenuItemClick("Create Tasks")}
                                sx={{ "&:hover": { backgroundColor: "#444", color: "white" }, gap: "32px" }}
                            >
                                {/* <StyledListItemIcon> */}
                                <AddTaskIcon />
                                {/* </StyledListItemIcon> */}
                                <ListItemText primary="Create Tasks" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => handleMenuItemClick("View Resources")}
                                sx={{ "&:hover": { backgroundColor: "#444", color: "white" }, gap: "32px" }}
                            >
                                {/* <StyledListItemIcon> */}
                                <FolderIcon />
                                {/* </StyledListItemIcon> */}
                                <ListItemText primary="View Resources" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => handleMenuItemClick("Send Requests")}
                                sx={{ "&:hover": { backgroundColor: "#444", color: "white" }, gap: "32px" }}
                            >
                                {/* <StyledListItemIcon> */}
                                <SendIcon />
                                {/* </StyledListItemIcon> */}
                                <ListItemText primary="Send Requests" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => handleMenuItemClick("Responses")}
                                sx={{ "&:hover": { backgroundColor: "#444", color: "white" }, gap: "32px" }}
                            >
                                {/* <StyledListItemIcon> */}
                                <ReplyIcon />
                                {/* </StyledListItemIcon> */}
                                <ListItemText primary="Responses" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => handleMenuItemClick("Become a Co")}
                                sx={{ "&:hover": { backgroundColor: "#444", color: "white" }, gap: "32px" }}
                            >
                                {/* <StyledListItemIcon> */}
                                <BadgeIcon />
                                {/* </StyledListItemIcon> */}
                                <ListItemText primary="Become a Co" />
                            </ListItemButton>
                        </StyledList>
                    </Box>
                    <Box sx={{ marginTop: "auto" }}>
                        <Divider />
                        <ListItemButton
                            onClick={handleHomeClick}
                            sx={{ "&:hover": { backgroundColor: "#444", color: "white" }, gap: "32px" }}
                        >
                            {/* <StyledListItemIcon> */}
                            <ExitToAppIcon />
                            {/* </StyledListItemIcon> */}
                            <ListItemText primary="Log Out" />
                        </ListItemButton>
                    </Box>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    {selectedView === null && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: 10, padding: 4 }}>
                            <Card sx={{ backgroundColor: '#444', width: '20%', borderRadius: 5 }} onClick={() => handleMenuItemClick("View Helpers")}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <PeopleIcon sx={{ fontSize: 125, color: 'white' }} />
                                    <Typography gutterBottom variant="body2" component="div" color="white" textAlign="center">
                                        View Helpers
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ backgroundColor: '#444', width: '20%', borderRadius: 5 }} onClick={() => handleMenuItemClick("View Tasks")}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <TaskIcon sx={{ fontSize: 125, color: 'white' }} />
                                    <Typography gutterBottom variant="body2" component="div" color="white" textAlign="center">
                                        View Tasks
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ backgroundColor: '#444', width: '20%', borderRadius: 5 }} onClick={() => handleMenuItemClick("Create Tasks")}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <AddTaskIcon sx={{ fontSize: 125, color: 'white' }} />
                                    <Typography gutterBottom variant="body2" component="div" color="white" textAlign="center">
                                        Create Tasks
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ backgroundColor: '#444', width: '20%', borderRadius: 5 }} onClick={() => handleMenuItemClick("View Resources")}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <FolderIcon sx={{ fontSize: 125, color: 'white' }} />
                                    <Typography gutterBottom variant="body2" component="div" color="white" textAlign="center">
                                        View Resources
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ backgroundColor: '#444', width: '20%', borderRadius: 5 }} onClick={() => handleMenuItemClick("Send Requests")}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <SendIcon sx={{ fontSize: 125, color: 'white' }} />
                                    <Typography gutterBottom variant="body2" component="div" color="white" textAlign="center">
                                        Send Requests
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ backgroundColor: '#444', width: '20%', borderRadius: 5 }} onClick={() => handleMenuItemClick("Responses")}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <ReplyIcon sx={{ fontSize: 125, color: 'white' }} />
                                    <Typography gutterBottom variant="body2" component="div" color="white" textAlign="center">
                                        Responses
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ backgroundColor: '#444', width: '20%', borderRadius: 5 }} onClick={() => handleMenuItemClick("Become a Co")}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <BadgeIcon sx={{ fontSize: 125, color: 'white' }} />
                                    <Typography gutterBottom variant="body2" component="div" color="white" textAlign="center">
                                        Become A Co
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    )}
                    {selectedView === 'View Helpers' && <Helpers />}
                    {selectedView === 'View Tasks' && <Tasks />}
                    {selectedView === 'Create Tasks' && <CreateTask />}
                    {selectedView === 'View Resources' && <Resources />}
                    {selectedView === 'Send Requests' && <Requests />}
                    {selectedView === 'Responses' && <Responses />}
                    {selectedView === 'Become a Co' && <BecomeACo />}
                </Main>
            </Box>
        </ThemeProvider>
    );
}
