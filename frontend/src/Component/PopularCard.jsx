import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PopularEvent(props) {
    return (
        <Card
            className='w-[375px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-30000000'
            sx={{ bgcolor: "#1e1e1e", whiteSpace: 'normal', marginRight: 8 }}
        >
            <CardHeader
                title={
                    <Typography variant="title" component="div" sx={{ color: 'white' }}>
                        {props.title}
                    </Typography>
                }
                subheader={
                    <Typography variant="subheader" component="div" sx={{ color: '#bcbcbc' }}>
                        {props.date}
                    </Typography>
                }
            />
            <CardMedia
                component="img"
                height="194"
                image={props.pic && props.pic[0]}
                onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-2747449.jpg&fm=jpg';
                }}
                alt="Paella dish"
            />

            <CardContent sx={{ height: 230, overflow: "hidden", textOverflow: "ellipsis" }}>
                <Typography variant="body2" color="#bcbcbc">
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}