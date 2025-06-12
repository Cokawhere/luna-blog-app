import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

import {
    Grid,
    Paper,
    Typography,
    Button,
    Box,
    Avatar
} from '@mui/material';

export default function PostCard() {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUserId(user?.id || null);
        };

        getUser();
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUserId(session?.user?.id || null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select(`*, users:authorid(name)`)
            .order('createdat', { ascending: false });

        if (!error) setPosts(data);
        else console.error(error.message);
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        await supabase.from('posts').delete().eq('id', id);
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };


    return (
        <Box sx={{ p: 4, marginTop: 13 }}>
            <Grid container spacing={4} justifyContent="center">
                {posts.map((post) => (
                    <Grid key={post.id} >
                        <Paper elevation={3} sx={{ display: 'flex', p: 2, borderRadius: 2, width: { xs: '100%', md: '620px' }, maxHeight: 220 }}>
                            <Avatar
                                variant="rounded"
                                src={post.image || 'https://via.placeholder.com/150'}
                                sx={{ width: 220, height: 180, mr: 2 }}
                            />

                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        overflow: 'auto',
                                        maxHeight: 60,
                                        pr: 1,
                                        mb: 1,
                                    }}
                                >
                                    <Typography variant="body2">
                                        {post.content}
                                    </Typography>
                                </Box>

                                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'gray' }}>
                                    By {post.users?.name || 'Unknown'} – {new Date(post.createdat).toLocaleDateString()}
                                </Typography>

                                {userId && post.authorid === userId && (
                                    <Box sx={{ mt: 1 }}>
                                        <Button size="small" onClick={() => handleDelete(post.id)} color="error">
                                            Delete
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() => navigate(`/edit/${post.id}`)}
                                            sx={{ ml: 1 }}
                                        >
                                            Edit
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>



        </Box>
    );
}
