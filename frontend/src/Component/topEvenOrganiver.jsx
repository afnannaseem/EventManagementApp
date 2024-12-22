import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function TopEvenOrganizer(props) {
    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', bgcolor: '#313844' }}>
            <Avatar sx={{ width: 70, height: 70 }} alt="Remy Sharp" src={props.pic} />
            <div>
                <Typography component="div" sx={{ ml: 3, mt: 1, color: '#fff', fontSize: 14 }}>
                    <b>{props.name}</b>
                </Typography>
                <Typography component="div" sx={{ ml: 3, mt: 1, color: '#adb5bd', fontSize: 12 }}>
                    {props.email}
                </Typography>
                <Typography component="div" sx={{
                    ml: 3, mt: 2, color: '#F9C851', fontSize: 12
                }}>
                    <b>{props.count}</b>
                </Typography>
            </div>
        </Paper>
    );
}