import emailjs from '@emailjs/browser';
import { Avatar, Button, Skeleton, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import {
    useMutation,
    useQuery,
    useQueryClient
} from '@tanstack/react-query';
import React from 'react';
import sendRequest from '../Api Call/apiCalls';
const PendingRequest = () => {
    const queryClient = useQueryClient()
    const { data, isError, isLoading } = useQuery({
        queryKey: ['data'],
        queryFn: () => sendRequest(process.env.REACT_APP_Base_URL + "/pendingRequest", "get"),
    })
    const mutation = useMutation({
        mutationFn: async (idno) => {
            const response = await sendRequest(process.env.REACT_APP_Base_URL + "/AcceptedRequest", "put", idno)
            sendEmail(response)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['data'] })
        },
    })
    const mutation2 = useMutation({
        mutationFn: async (idno) => {
            const response = await sendRequest(process.env.REACT_APP_Base_URL + "/RejectRequest", "put", idno)
            sendEmail(response)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['data'] })
        },
    })
    const handleClick = async (id) => {
        const idno = id
        console.log("EMAIL " + idno);
        mutation.mutateAsync({ idno });
    }
    const handleClick2 = async (id) => {
        const idno = id
        mutation2.mutateAsync({ idno });
    }
    const sendEmail = (res) => {
        if (res?.verified) {
            const data = {
                to_name: res.name,
                user_email: res.email,
                from_name: 'Fastian Event',
                message: 'Hello ' + res.name + ', Your request has been Accepted Successfully'
            };
            emailjs.send('service_k3xy0x6', 'template_35jf9qs', data, 'efxKy5_G-3fltRf1r')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        }
        else {
            const data = {
                to_name: res.name,
                user_email: res.email,
                from_name: 'Fastian Event',
                message: 'Hello ' + res.name + ', Your request has been Rejected'
            };
            emailjs.send('service_k3xy0x6', 'template_35jf9qs', data, 'efxKy5_G-3fltRf1r')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        }
    }
    if (data?.data?.length === 0) {
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
    return (
        <Table aria-label="simple table">
            <TableBody>
                {data?.data?.map((item, index) => (
                    <React.Fragment key={index}>
                        <TableRow key={index} sx={{
                            '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' }
                        }}>
                            <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ width: 50, height: 50, marginRight: 2 }} alt="Remy Sharp" src={item.pic} />
                                    <div>
                                        <Typography component="div" sx={{ color: '#ffff', fontSize: 12 }}>
                                            <b>{item.name}</b>
                                        </Typography>
                                        <Typography component="div" sx={{ color: '#adb5bd', fontSize: 12 }}>
                                            {item.email}
                                        </Typography>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                <div style={{ minWidth: "100%", maxWidth: "100%", display: 'flex', justifyContent: 'end' }}>
                                    <Button
                                        onClick={() => handleClick(item.id)}
                                        sx={{ color: '#adb5bd', mr: 2, textTransform: 'none', '&:hover': { backgroundColor: 'transparent', color: '#ffff' } }}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        onClick={() => handleClick2(item.id)}
                                        sx={{ color: '#adb5bd', textTransform: 'none', '&:hover': { backgroundColor: 'transparent', color: '#ffff' } }}
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                            <TableCell colSpan={4} style={{ padding: 0 }}>
                                <Divider sx={{ height: '1px', backgroundColor: 'gray' }} />
                            </TableCell>
                        </TableRow>
                    </React.Fragment>
                ))}
            </TableBody>
        </Table>
    );
};

export default PendingRequest;
