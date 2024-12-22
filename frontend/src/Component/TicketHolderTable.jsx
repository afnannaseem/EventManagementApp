import { Avatar, Chip, Skeleton, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import sendRequest from '../Api Call/apiCalls';



const handleClick = () => {
    console.log('clicked');
};
const TicketHolder = (props) => {

    const { data: customer, isLoading, isError } = useQuery({
        queryKey: ['customer'],
        queryFn: () => sendRequest(process.env.REACT_APP_Base_URL2 + "/getCustomer/" + props.id, 'GET'),
        staleTime: 0,
    })

    if (customer?.data?.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography component="div" sx={{ mt: 10, color: '#ffff', fontSize: 16 }}>
                    <b>Not ticket Sale</b>
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
                <Skeleton animation="wave" variant="rectangular" height={"100px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px", marginTop: 50 }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />
                <Skeleton animation="wave" variant="rectangular" height={"50px"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "50px" }} />

            </>
        )
    }

    return (
        <>
            <Table aria-label="simple table" >
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
                        <TableCell align="center">
                            <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                <b>Type</b>
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
                    {customer?.data?.map((row, index) => (
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
                                <TableCell align="center">
                                    <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                        <Chip size="small" component="div" sx={{
                                            color: '#ffff', fontSize: 10,
                                            bgcolor: row.type === "vip" ? '#71B6F9' : row.status === "regular" ? '#5B69BC' : row.status === "Below Average" ? '#FF5B5B' : '#5B69BC',
                                            textTransform: 'none', borderRadius: 2,
                                            padding: 0, margin: 0
                                        }} label={row.type} />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                                <TableCell colSpan={9} style={{ padding: 0 }}>
                                    <Divider sx={{ height: '1px', backgroundColor: 'gray' }} />
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
export default TicketHolder;
