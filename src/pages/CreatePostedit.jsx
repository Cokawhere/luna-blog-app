import { useState, useEffect } from 'react';
import {TextField, Button, Snackbar, Alert, Box, Typography, Paper} from '@mui/material';
import { supabase } from '../supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreatePostedit() {
    const [form, setForm] = useState({ title: '', content: '', imageUrl: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    setSnackbar({ open: true, message: 'Error loading post', severity: 'error' });
                } else {
                    setForm({
                        title: data.title,
                        content: data.content,
                        imageUrl: data.image,
                    });
                }
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        const { title, content, imageUrl } = form;

        if (!title || !content || !imageUrl) {
            setSnackbar({ open: true, message: 'Please fill all fields', severity: 'error' });
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const authorid = user?.id;

        if (!authorid) {
            setSnackbar({ open: true, message: 'You are not logged in', severity: 'error' });
            return;
        }

        if (id) {
            
            const { error } = await supabase
                .from('posts')
                .update({ title, content, image: imageUrl })
                .eq('id', id);

            if (error) {
                setSnackbar({ open: true, message: error.message, severity: 'error' });
            } else {
                setSnackbar({ open: true, message: 'Post updated successfully', severity: 'success' });
                setTimeout(() => navigate('/'), 1500);
            }
        } else {
            
            const { error } = await supabase.from('posts').insert([{
                title,
                content,
                image: imageUrl,
                authorid,
                createdat: new Date().toISOString(),
            }]);

            if (error) {
                setSnackbar({ open: true, message: error.message, severity: 'error' });
            } else {
                setSnackbar({ open: true, message: 'Post created successfully', severity: 'success' });
                setTimeout(() => navigate('/'), 1500);
            }
        }
    };

    return (
        <Box sx={{ maxWidth: '700px', margin: 'auto', mt: 15, px: 2 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    {id ? 'Edit Post' : 'Create New Post'}
                </Typography>

                <TextField
                    name="title"
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={form.title}
                    onChange={handleChange}
                />

                <TextField
                    name="content"
                    label="Content"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={form.content}
                    onChange={handleChange}
                />

                <TextField
                    name="imageUrl"
                    label="Image URL"
                    fullWidth
                    margin="normal"
                    value={form.imageUrl}
                    onChange={handleChange}
                />

                <Button
                    variant="contained"
                    sx={{ mt: 3, py: 1.5, fontSize: '1rem', backgroundColor: '#4A0FD4' }}
                    fullWidth
                    onClick={handleSubmit}
                >
                    {id ? 'Update' : 'Submit'}
                </Button>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
