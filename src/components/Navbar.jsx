
import  { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.svg';
import { supabase } from '../supabaseClient'; 





export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            if (token && userData) {
                setIsAuthenticated(true);
                setUser(JSON.parse(userData));
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        checkAuth();

        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);



    const handleLogout = async() => {
        await supabase.auth.signOut();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        localStorage.clear();
        setUser(null);
        navigate("/");
    };

    return (
        <AppBar position="fixed" className="custom-navbar" >
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }} component={Link} to="/">
                    <img
                        src={logo}
                        alt="Luna Logo"
                        style={{ height: '35px', }}
                    />
                </Box>

                {!isAuthenticated ? (
                    <Box>
                        <Button className="registerbutton" component={Link} to="/signup">
                            Register
                        </Button>
                        <Button className="loginbutton" component={Link} to="/login">
                            Login
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            sx={{ cursor: 'pointer', width: 36, height: 36 ,marginRight:2 }}
                        >
                            {user?.email?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Button className="loginbutton" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );


}
