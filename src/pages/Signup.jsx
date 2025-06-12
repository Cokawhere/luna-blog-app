import  { useState } from 'react';
import { Box, Button, Link, Paper, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: "500px",
    margin: "auto",
    padding: theme.spacing(4),
    textAlign: "center",
}));

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        passwordMismatch: false,
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const navigate = useNavigate();

    const showSnackbar = (message, severity) => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleRegister = async () => {
        const { name, email, password, confirmPassword } = formData;

        if (!name || !email) {
            setErrors({ ...errors, name: !name, email: !email });
            return;
        }
        if (password !== confirmPassword) {
            setErrors({ ...errors, passwordMismatch: true });
            return;
        }
        try {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name },
                },
                });

            if (signUpError) {
                showSnackbar(signUpError.message, "error");
                return;
            }
            const userId = signUpData?.user?.id;

            if (!userId) {
                showSnackbar("User ID not found after sign up", "error");
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 3000));
            const { error: insertError } = await supabase
                .from('users')
                .insert([
                    {
                        id: userId,
                        name,
                        email,
                    },
                ]);

            if (insertError) {
                showSnackbar(insertError.message, "error");
                return;
            }

            showSnackbar("Registered successfully!", "success");
            navigate("/login");

        } catch (err) {
            console.error(err);
            showSnackbar("Something went wrong!", "error");
        }
    };

    return (
        <>
            <Box sx={{ margin: 13 }}>
                <DemoPaper variant="outlined">
                    <Typography sx={{ fontWeight: 500, fontSize: 35 }}>Register</Typography>

                    <TextField
                        name="name"
                        label="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        helperText={errors.name ? "Name is required" : ""}
                        sx={{ margin: "20px", width: "95%" }}
                    />

                    <TextField
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        helperText={errors.email ? "Email is required" : ""}
                        sx={{ margin: "20px", width: "95%" }}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{ margin: "20px", width: "95%" }}
                    />

                    <TextField
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.passwordMismatch}
                        helperText={errors.passwordMismatch ? "Passwords don't match" : ""}
                        sx={{ margin: "20px", width: "95%" }}
                    />

                    <Button
                        variant="contained"
                        sx={{ width: "95%", background: "rgba(74, 15, 212, 1)" }}
                        onClick={handleRegister}
                    >
                        Register
                    </Button>

                    <Box mt={2} mb={4} textAlign="center">
                        <Link href="/login" variant="body2" sx={{ fontWeight: 530, fontSize: 20 }}>
                            Already have an account?
                        </Link>
                    </Box>
                </DemoPaper>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '200%', color: "rgb(0, 0, 0)", backgroundColor: "rgba(64, 4, 206, 0.75)" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}
