import { Box, Typography, Grid, IconButton, Container } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import logo from '../assets/logo2.svg';

export default function Footer() {
    return (
        <Box sx={{ bgcolor: '#f5f5f5', borderTop: '1px solid #ddd', py: 6, mt: 8 }}>
            <Container>
                <Grid container spacing={4} columns={12}>

                    <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 3' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }} component={Link} to="/">
                            <img src={logo} alt="Luna Logo" style={{ height: 30 }} />

                        </Box>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            A space to explore creative design and modern tech.
                        </Typography>
                        <Box>
                            <IconButton color="inherit" aria-label="facebook">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="twitter">
                                <XIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="youtube">
                                <YouTubeIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Our Pages
                        </Typography>
                        <Typography variant="body2">Homepage</Typography>
                        <Typography variant="body2">About Us</Typography>
                        <Typography variant="body2">Portfolio</Typography>
                        <Typography variant="body2">Contact</Typography>
                    </Grid>

                    <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Services
                        </Typography>
                        <Typography variant="body2">Cloud Storage</Typography>
                        <Typography variant="body2">Visual Development</Typography>
                        <Typography variant="body2">User Interface</Typography>
                    </Grid>

                    <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 3' } }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Contact
                        </Typography>
                        <Typography variant="body2">demo@luna.com</Typography>
                        <Typography variant="body2">0800 123 45 67</Typography>
                        <Typography variant="body2">68 Apple Street, New York</Typography>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="caption" color="text.secondary">
                        © 2025 Ranon . All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
