import { Container, Grid, Paper, Skeleton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import sendRequest from '../Api Call/apiCalls';
import CopyRight from '../Component/CopyRight';
import { useId } from '../Hooks/useid';
import EventCard from './EventCard';
import EventRevenue from './EventRevenue';
import EventChart from './EventSaleChart';
import TicketHolder from './TicketHolderTable';

export default function Event() {
    const { data: event, isLoading, isError } = useQuery({
        queryKey: ['event'],
        queryFn: () => sendRequest(process.env.REACT_APP_Base_URL2 + "/getspecificEvent/" + id, 'GET'),
        staleTime: 0,
    })
    const { id } = useId();
    if (event?.events?.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography component="div" sx={{ mt: 10, color: '#ffff', fontSize: 16 }}>
                    <b>Problem in event reload page</b>
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
                <Skeleton animation="wave" variant="rectangular" height={"500px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px", marginTop: 50 }} />
                <Skeleton animation="wave" variant="rectangular" height={"300px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"200px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />

            </>
        )
    }
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={9}>
                    <div>
                        <Typography component="div" sx={{ mt: 1, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                            <b>Event Detail</b>
                        </Typography>
                    </div>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 600,
                            maxHeight: 600,
                            height: 600,
                            bgcolor: '#313844',
                            overflow: 'scroll',
                        }}
                        className='scroll-smooth scrollbar-hide'
                    >
                        <EventCard id={id} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={3}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12}>
                            <div>
                                <Typography component="div" sx={{ mt: 1, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                                    <b>Total Ticket</b>
                                </Typography>
                            </div>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 130,
                                    bgcolor: '#FB3E7A',
                                    overflow: 'auto',
                                }}
                                className='scroll-smooth scrollbar-hide'
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ paddingLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                                        <Typography component="div" sx={{ mt: 1, mb: 2, color: '#ffff', fontSize: 14 }}>
                                            <b>VIP ticket Remaining</b>
                                        </Typography>
                                        <Typography component="div" sx={{ mt: 1, mb: 2, color: '#ffff', fontSize: 24, }}>
                                            <b>{event?.event?.maxTicketsVip - event?.event?.VipTicketsSold}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                                        </Typography>
                                    </div>
                                    <div style={{ paddingRight: 10, display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                                        <Typography component="div" sx={{ mt: 1, mb: 2, color: '#ffff', fontSize: 14 }}>
                                            <b>VIP ticket Remaining</b>
                                        </Typography>
                                        <Typography component="div" sx={{ mt: 1, mb: 2, color: '#ffff', fontSize: 24 }}>
                                            <b>{event?.event?.maxTicketsRegular - event?.event?.RegTicketsSold}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                                        </Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 450,
                                    bgcolor: '#313844',
                                    overflow: 'scroll',
                                }}
                                className='scroll-smooth scrollbar-hide'
                            >
                                <EventRevenue id={id} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Typography component="div" sx={{ mt: 6, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                            <b>Total Sale</b>
                        </Typography>
                    </div>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 3,
                            bgcolor: '#313844',
                            overflow: 'scroll',
                            minHeight: 400,
                            maxHeight: 400,
                            height: 400,
                            maxWidth: '100%',
                        }}
                        className='scroll-smooth scrollbar-hide'
                    >
                        <EventChart id={id} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Typography component="div" sx={{ mb: 2, color: '#adb5bd', fontSize: 14 }}>
                            <b>Ticket Buyer</b>
                        </Typography>
                    </div>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 3,
                            bgcolor: '#313844',
                            overflow: 'scroll',
                            minHeight: 1000,
                            maxHeight: 1000,
                            height: 1000,
                            maxWidth: '100%',
                            mt: 2,
                        }}
                        className='scroll-smooth scrollbar-hide'
                    >
                        <TicketHolder id={id} />
                    </Paper>
                </Grid>
            </Grid>
            <CopyRight sx={{ pt: 5, color: "#ffff" }} />
        </Container>
    )
}
