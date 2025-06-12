import { useState } from 'react';
import {
    Box,
    Button,
    Link,
    Paper,
    TextField,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: '500px',
    margin: 'auto',
    padding: theme.spacing(4),
    textAlign: 'center',
}));

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async () => {
        const { email, password } = formData;

        if (!email || !password) {
            showSnackbar('Please enter both email and password.', 'error');
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            showSnackbar(error.message, 'error');
        } else {
            localStorage.setItem('token', data.session.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.dispatchEvent(new Event("storage"));
            showSnackbar('Logged in successfully!', 'success');
            navigate('/')


        }
    };

    return (
        <>
            <Box sx={{ margin: 13 }}>
                <DemoPaper variant="outlined">
                    <Typography sx={{ fontWeight: 500, fontSize: 35 }}>Login</Typography>

                    <TextField
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ margin: '20px', width: '95%' }}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{ margin: '20px', width: '95%' }}
                    />

                    <Button
                        variant="contained"
                        sx={{ width: '95%', background: 'rgba(74, 15, 212, 1)' }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                    <Box mt={2} mb={4} textAlign="center">
                        <Link href="/signup" variant="body2" sx={{ fontWeight: 530, fontSize: 20 }}>
                            Don't have an account?
                        </Link>
                    </Box>
                </DemoPaper>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '200%', color: 'rgb(0, 0, 0)', backgroundColor: 'rgba(64, 4, 206, 0.75)' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}
