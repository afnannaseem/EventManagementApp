import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChairIcon from '@mui/icons-material/Chair';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Skeleton, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from "react";
import sendRequest from '../Api Call/apiCalls';
export default function EventCard(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { data: eventDetail, isLoading, isError } = useQuery({
        queryKey: ['eventDetail'],
        queryFn: () => sendRequest(process.env.REACT_APP_Base_URL2 + "/getspecificEvent/" + props.id, 'GET'),
        staleTime: 0,
    })

    if (eventDetail?.events?.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography component="div" sx={{ mt: 10, color: '#ffff', fontSize: 16 }}>
                    <b>Not any Event detail</b>
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
                <Skeleton animation="wave" variant="rectangular" height={"200px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '30px', marginBottom: "20px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"30px"} width={"200px"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"200px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
            </>
        )
    }

    return (
        <React.Fragment>
            <div style={{ height: "300px", width: "100%", padding: 20 }}>
                <img
                    src={eventDetail?.event?.pic[0]}
                    alt="Error in showing"
                    onError={(e) => {
                        // e.target.onerror = null;
                        e.target.src = "https://ventic.dexignzone.com/react/demo/static/media/pic6.e76c4775d61fc8a37ffc.jpg"
                    }}
                    style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 20 }}
                />
            </div>
            <div style={{ paddingLeft: 20 }}>
                <Typography component="div" sx={{ mt: 1, mb: 2, color: '#ffff', fontSize: 25 }}>
                    <b>{eventDetail?.event?.title}</b>
                </Typography>
            </div>
            <div style={{ paddingLeft: 20 }}>
                <Typography component="div" sx={{ mt: 1, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                    {eventDetail?.event?.description}
                </Typography>
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", paddingLeft: 15, paddingRight: 15, alignItems: "center", flexDirection: windowWidth < 1500 ? "column" : "row" }}>
                <div style={{
                    backgroundColor: "#444A52", width: "300px", padding: 10, borderRadius: 20, marginBottom: windowWidth < 1500 ? 20 : 0
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ paddingLeft: 50, display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                            <ChairIcon sx={{ height: 50, width: 50, color: "#ffff" }} />
                        </div>
                        <div style={{ paddingRight: 10, display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                            <Typography component="div" sx={{ mt: 1, mb: 2, color: '#ffff', fontSize: 16 }}>
                                <b>Total Seats</b>
                            </Typography>
                            <Typography component="div" sx={{
                                maxWidth: '150px',
                                height: '40px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis', mt: 1, mb: 2, color: '#adb5bd', fontSize: 16
                            }}>
                                {eventDetail?.event?.maxTicketsRegular + eventDetail?.event?.maxTicketsVip}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div style={{
                    backgroundColor: "#444A52", width: "300px", padding: 10, borderRadius: 20, marginBottom: windowWidth < 1500 ? 20 : 0
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ paddingLeft: 50, display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                            <CalendarMonthIcon sx={{ height: 50, width: 50, color: "#ffff" }} />
                        </div>
                        <div style={{ paddingRight: 10, display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                            <Typography component="div" sx={{
                                maxWidth: '150px',
                                height: '40px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis', mt: 1, mb: 2, color: '#ffff', fontSize: 16
                            }}>
                                <b>Date</b>
                            </Typography>
                            <Typography component="div" sx={{ mt: 1, mb: 2, color: '#adb5bd', fontSize: 16 }}>
                                {eventDetail?.event?.dateTime.slice(0, 10)}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div style={{
                    backgroundColor: "#444A52", width: "300px", padding: 10, borderRadius: 20, marginBottom: windowWidth < 1500 ? 20 : 0
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ paddingLeft: 50, display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                            <LocationOnIcon sx={{ height: 50, width: 50, color: "#ffff" }} />
                        </div>
                        <div style={{ paddingRight: 10, display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                            <Typography component="div" sx={{ mt: 1, mb: 2, color: '#ffff', fontSize: 16 }}>
                                <b>Location</b>
                            </Typography>
                            <Typography component="div" sx={{
                                maxWidth: '150px',
                                height: '40px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                mt: 1, mb: 2, color: '#adb5bd', fontSize: 16,
                            }}>
                                {eventDetail?.event?.venue}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
