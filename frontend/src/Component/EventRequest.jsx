import emailjs from '@emailjs/browser';
import { Alert, Button, Skeleton, Snackbar, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import sendRequest from '../Api Call/apiCalls';
export default function EventRequest() {
    const { data: eventPending, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['eventPending'],
        queryFn: () => sendRequest(process.env.REACT_APP_Base_URL2 + "/getEvents", 'GET'),
        staleTime: 0,
    })
    const [opens, setOpens] = React.useState(false);
    const [success, setSuccess] = React.useState({
        variant: 'success',
        message: 'Your Account created successfully!',
    });
    const handleClicks = () => {
        setOpens(true);
        setTimeout(() => {
            setOpens(false);
        }, 3000);
    };
    const handleCloses = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpens(false);
    };
    const queryClient = useQueryClient()
    const mutateUser = async (data) => {
        const endpoint =
            data.actionType === "accept"
                ? process.env.REACT_APP_Base_URL2 + '/approveEvent'
                : process.env.REACT_APP_Base_URL2 + '/rejectEvent';
        const response = await sendRequest(endpoint, 'put', data);
        if (data.actionType === "accept") {
            handleClicks();
            setSuccess({
                variant: 'success',
                message: 'Event approve successfully!',
            });
            sendEmail(response, 'Your Event has been approved.');
        } else {
            handleClicks();
            setSuccess({
                variant: 'success',
                message: 'Event reject successfully!',
            });
            sendEmail(response, 'Your Event has been rejected.');
        }
        return response;
    };
    const mutation = useMutation({
        mutationFn: (data) => mutateUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['eventPending'] });
            queryClient.invalidateQueries({ queryKey: ['eventStatus'] });
            queryClient.invalidateQueries({ queryKey: ['topOrganizer'] });
            console.log('Event Request Updated now it is good to go');
        },
    });
    const handleClick = (e) => {
        e.preventDefault();
        console.log('Navigate to Organizer Profile');
    };

    const handleClick2 = async (id, actionType) => {

        mutation.mutateAsync({ id, actionType });
    };

    const sendEmail = (res, message) => {
        const data = {
            to_name: res.event.eventName + " Event Organizer",
            user_email: res.event.organizerEmail,
            from_name: 'Fastian Event',
            message: `Hello ${res.event.eventName} Event Organizer, ${message}`,
        };
        emailjs.send('service_k3xy0x6', 'template_35jf9qs', data, 'efxKy5_G-3fltRf1r').then(
            (result) => {
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            }
        );
    };
    if (eventPending?.events?.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography component="div" sx={{ mt: 10, color: '#ffff', fontSize: 16 }}>
                    <b>No Pending Request</b>
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
                <Skeleton animation="wave" variant="rectangular" height={"100px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
            </>
        )
    }
    if (isSuccess) {
        return (
            <>
                <Typography component="div" sx={{ ml: 3, mt: 1, mb: 1, color: '#fff', fontSize: 14 }}>
                    <b>Event Request</b>
                </Typography>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                            <TableCell>
                                <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 16 }}>
                                    <b>Name</b>
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>Date</b>
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>Organizar</b>
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>Type</b>
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>VIP Tickets</b>
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>Regular Tickets</b>
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>Accept</b>
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>Reject</b>
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                            <TableCell colSpan={8} style={{ padding: 0 }}>
                                <Divider sx={{ mt: 2, mb: 1, height: '1px', backgroundColor: 'gray' }} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eventPending?.events?.map((row, index) => (
                            <React.Fragment key={row.eventName + index}>
                                <TableRow sx={{
                                    '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' }
                                    , '&:hover': { backgroundColor: '#3D4551' }
                                }}
                                    onClick={handleClick}
                                >
                                    <TableCell >
                                        <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                            {row.eventName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography component="div" sx={{ color: '#adb5bd', fontSize: 12 }}>
                                            {row.dateTime.split('T')[0]}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography component="div" sx={{
                                            color: '#ffff', fontSize: 12
                                        }}>
                                            {row.organizerEmail}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                            {row.eventType}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                            {row.maxTicketsVip}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                            {row.maxTicketsRegular}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => handleClick2(row._id, "accept")}
                                            sx={{ color: '#adb5bd', mr: 2, textTransform: 'none', '&:hover': { backgroundColor: 'transparent', color: '#ffff' } }}
                                        >
                                            Accept
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => handleClick2(row._id, "reject")}
                                            sx={{ color: '#adb5bd', mr: 2, textTransform: 'none', '&:hover': { backgroundColor: 'transparent', color: '#ffff' } }}
                                        >
                                            Reject
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                                    <TableCell colSpan={8} style={{ padding: 0 }}>
                                        <Divider sx={{ height: '1px', backgroundColor: 'gray' }} />
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
                <Stack spacing={3} sx={{ ml: 5, width: '100%' }}>
                    <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloses}>
                        <Alert onClose={handleCloses} severity={success.variant} sx={{ width: '100%' }}>
                            {success.message}
                        </Alert>
                    </Snackbar>
                </Stack>
            </>
        );
    }
}
