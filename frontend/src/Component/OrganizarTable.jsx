import emailjs from '@emailjs/browser';
import { Alert, Avatar, Button, Chip, Skeleton, Snackbar, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import sendRequest from '../Api Call/apiCalls';
const OrganizarTable = (props) => {
    const { data: rows, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['data'],
        queryFn: () => sendRequest(props.type === 1 ? process.env.REACT_APP_Base_URL + "/getAllOrganizar" : process.env.REACT_APP_Base_URL + "/getAllVendor", "get"),
        staleTime: 0,
        // refetchInterval: 2 * 60 * 1000,
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
            data.actionType === "block"
                ? process.env.REACT_APP_Base_URL + '/BlockUser'
                : process.env.REACT_APP_Base_URL + '/UnblockUser';
        const response = await sendRequest(endpoint, 'put', data);
        if (data.actionType === "block") {
            handleClicks();
            setSuccess({
                variant: 'success',
                message: 'User blocked successfully!',
            });
            sendEmail(response, 'Your account has been blocked.');
        } else {
            handleClicks();
            setSuccess({
                variant: 'success',
                message: 'User unblocked successfully!',
            });
            sendEmail(response, 'Your account has been unblocked.');
        }
        return response;
    };
    const mutation = useMutation({
        mutationFn: (data) => mutateUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['data'] });
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
            to_name: res.name,
            user_email: res.email,
            from_name: 'Fastian Event',
            message: `Hello ${res.name}, ${message}`,
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
    const tableData = (row, index) => {
        return (
            <React.Fragment key={row.name + index}>
                <TableRow sx={{
                    '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' }
                    , '&:hover': { backgroundColor: '#3D4551' }
                }}
                    onClick={handleClick}
                >
                    <TableCell >
                        <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                            <Avatar sx={{ width: 50, height: 50, marginRight: 2 }} alt="Remy Sharp" src={row.pic} />
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography component="div" sx={{ color: '#adb5bd', fontSize: 12 }}>
                            {row.name}
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography component="div" sx={{
                            color: '#ffff', fontSize: 12
                        }}>
                            {row.email}
                        </Typography>
                    </TableCell>
                    {props.type === 1 ?
                        <TableCell align="center">
                            <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                {row.totalEvents}
                            </Typography>
                        </TableCell>
                        : null}
                    <TableCell align="center">
                        <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                            {row.rating}
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                            <Chip size="small" component="div" sx={{
                                color: '#ffff', fontSize: 10,
                                bgcolor: row.status === "Excellent" ? '#71B6F9' : row.status === "Good" ? '#5B69BC' : row.status === "Below Average" ? '#FF5B5B' : '#5B69BC',
                                textTransform: 'none', borderRadius: 2,
                                padding: 0, margin: 0
                            }} label={row.status} />
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Button
                            onClick={() => handleClick2(row.id, row.block === false ? "block" : "unblock")}
                            sx={{ bgcolor: '#1976D2', color: "#ffff", mr: 2, textTransform: 'none', '&:hover': { backgroundColor: "transparent", color: '#ffff' } }}
                        >
                            {row.block === false ? "Block" : "UnBlock"}
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                    <TableCell colSpan={9} style={{ padding: 0 }}>
                        <Divider sx={{ height: '1px', backgroundColor: 'gray' }} />
                    </TableCell>
                </TableRow>
            </React.Fragment>
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
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                            <TableCell>
                                <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 16 }}>
                                    <b>ProfilePic</b>
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>Name</b>
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>Email</b>
                                </Typography>
                            </TableCell>
                            {props.type === 1 ?
                                <TableCell align="center">
                                    <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                        {<b>Total Event</b>}
                                    </Typography>
                                </TableCell> : null}
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>Rating</b>
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>Status</b>
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                    <b>Block/UnBlock</b>
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                            <TableCell colSpan={9} style={{ padding: 0 }}>
                                <Divider sx={{ mt: 2, mb: 1, height: '1px', backgroundColor: 'gray' }} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.type === 1 ? rows?.data?.map((row, index) => tableData(row, index)) : rows?.data?.map((row, index) => tableData(row, index))
                        }
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
export default OrganizarTable;
