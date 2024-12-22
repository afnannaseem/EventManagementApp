import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';
export default function CopyRight(props) {
    return (
        <Typography variant="body2" align="center" color="#ffff" {...props}>
            {'Copyright © '}
            <Link color={'inherit'} href="http://localhost:3000">
                Fastain Events
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}