import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function FloatingButton() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) return null;


    return (
        <Box sx={{ margin: 13 }}>
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 999,

                    backgroundColor: '#4A0FD4',
                    '&:hover': { backgroundColor: '#370aa1' }
                }}
                onClick={() => navigate('/create')}
            >
                <AddIcon />
            </Fab>
        </Box>
    )
}
