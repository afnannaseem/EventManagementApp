import { Chip, Skeleton, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import sendRequest from '../Api Call/apiCalls';
import { useBoard } from '../Hooks/useMainBoard';
import { useId } from '../Hooks/useid';

export default function EventStatus() {

    const { data: eventStatus, isLoading, isError } = useQuery({
        queryKey: ['eventStatus'],
        queryFn: () => sendRequest(process.env.REACT_APP_Base_URL2 + "/getApprovedEvents", 'GET'),
    })
    const navigate = useNavigate();
    const handleClick = (id) => {
        setId(id);
        setName("Events")
    }
    const { setName, name } = useBoard();
    const { setId } = useId();
    if (eventStatus?.events?.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography component="div" sx={{ mt: 10, color: '#ffff', fontSize: 16 }}>
                    <b>No Any Event Approve</b>
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
                            <b>Status</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                            <b>Organizar</b>
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                    <TableCell colSpan={4} style={{ padding: 0 }}>
                        <Divider sx={{ mt: 2, mb: 1, height: '1px', backgroundColor: 'gray' }} />
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {eventStatus?.events?.map((row, index) => (

                    <React.Fragment key={row.eventName + index}>
                        <TableRow sx={{
                            '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' }
                            , '&:hover': { backgroundColor: '#3D4551' }
                        }}
                            onClick={() => handleClick(row._id)}
                        >
                            <TableCell component="th" scope="row">
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
                                <Chip size="small" component="div" sx={{
                                    color: '#ffff', fontSize: 10,
                                    bgcolor: row.status === "onGoing" ? '#71B6F9' : row.status === "onComing" ? '#5B69BC' : row.status === "Cancel" ? '#FF5B5B' : '#4DFC4D',
                                    textTransform: 'none', borderRadius: 2,
                                    padding: 0, margin: 0
                                }} label={row.status} />
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{
                                    color: '#ffff', fontSize: 12
                                }}>
                                    {row.organizerEmail}
                                </Typography>
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
}
