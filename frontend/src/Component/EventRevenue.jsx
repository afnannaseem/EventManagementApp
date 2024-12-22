import { Skeleton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import sendRequest from '../Api Call/apiCalls';
const COLORS = ['#0088FE', '#00C49F', '#FB3E7A', '#FFBB28', '#FF8042'];
const data = [
    { label: 'Group A', value: 400 },
    { label: 'Group B', value: 300 },
    { label: 'Group C', value: 300 },
    { label: 'Group D', value: 200 },
];
export default function EventRevenue(props) {
    const [activeIndex, setActiveIndex] = useState(null);
    const onPieEnter = (_, index) => {
        setActiveIndex(data[index].label);
    };
    const onPieLeave = () => {
        setActiveIndex(null);
    };
    const theme = useTheme();
    const { data: eventRevenue, isLoading, isError } = useQuery({
        queryKey: ['eventRevenue'],
        queryFn: () => sendRequest(process.env.REACT_APP_Base_URL2 + "/getEvents", 'GET'),
        staleTime: 0,
    })


    if (eventRevenue?.events?.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography component="div" sx={{ mt: 10, color: '#ffff', fontSize: 16 }}>
                    <b>Not any revenue</b>
                </Typography>
            </div>
        )
    }
    if (isError) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography component="div" sx={{ mt: 10, color: '#ffff', fontSize: 16 }}>
                    <b>Something Went Wrong</b>
                </Typography>
            </div>
        )
    }
    if (isLoading) {
        return (
            <>
                <Skeleton animation="wave" variant="circular" height={"100%"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
            </>
        )
    }



    return (
        <React.Fragment>
            <Typography
                component="div"
                sx={{ mt: 2, mb: 1, color: "#ffff", fontSize: 14 }}
            >
                <b>Total Revenue</b>
            </Typography>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={60}
                        fill={theme.palette.primary.main}
                        paddingAngle={5}
                        onMouseEnter={onPieEnter}
                        onMouseLeave={onPieLeave}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={data[index].label}
                                fill={COLORS[index % COLORS.length]}
                                fillOpacity={activeIndex === index ? 0.5 : 1}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <Typography
                component="div"
                sx={{ mt: 2, mb: 1, color: "#ffff", fontSize: 14 }}
            >
                <b>Rs 2500000</b>
            </Typography>
        </React.Fragment>
    );
}
