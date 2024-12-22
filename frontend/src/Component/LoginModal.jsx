import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox } from "@mui/material";
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import GoogleButton from 'react-google-button';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../Hooks/AuthContext";
import { useLogin } from "../Hooks/useLogin";
import { useVerifyAccount } from "../Hooks/useVerifyAccount";
import { storage } from "../firebase";


const schema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
});

export default function LoginModal(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [role, setRole] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: zodResolver(schema) });
    const [registered, setRegister] = useState(true);
    const handleClose = () => {
        setRegister(true);
        reset();
        setOpen(false)

    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        height: 600,
        transform: 'translate(-50%, -50%)',
        width: windowWidth < 800 ? 350 : 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    const { login, loading, error } = useLogin();
    const { verifyAccount } = useVerifyAccount();
    const form = useRef();
    const { googleSignIn } = useAuth() || {};
    const [data, setdata] = useState({
        email: "",
        name: "",
        signIn: "",
        role: "",
        pic: ""
    });

    const [image, setImage] = React.useState("https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg");
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const uploadImage = async (name) => {
        if (name == null) {
            return;
        }
        const imageref = storage.ref(`/images/${name.name + formattedTime}`);
        imageref.put(name).on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error(error);
            },
            () => {
                imageref.getDownloadURL().then((url) => {
                    console.log(url);
                    register.pic = url;
                    setImage(url);
                    setUploadProgress(0);
                    setSuccess({
                        variant: 'success',
                        message: 'Your Image uploaded successfully!',
                    });
                    handleClicks();
                    return url;
                });
            }
        );
    };
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    const storeImage = (e) => {
        uploadImage(e.target.files[0]);
    }
    const formattedTime = currentTime.toLocaleTimeString();
    const handleClick = async () => {
        try {
            const response = await googleSignIn();
            const email = response.user.email;
            const name = response.user.displayName;
            const verified = response.user.emailVerified;
            const detail = {
                email: email,
                name: name,
                signIn: verified,
                role: role,
                pic: image
            }
            data.email = detail.email;
            data.name = detail.name;
            data.signIn = detail.signIn;
            data.role = detail.role;
            data.pic = detail.pic;
            const res = await verifyAccount(data);
            if (res?.registered === true) {
                const res = await login(data);
                console.log(res);
                if (res?.verified === false) {
                    navigate('/pending', { replace: true });
                }
                else if (res?.showMessages === false) {
                    navigate('/accept', { replace: true });
                }
                else if (res?.status === true) {
                    navigate('/block', { replace: true });
                }
                else if (res?.role === 'admin') {
                    navigate('/event', { replace: true });
                }
                else if (res?.role === 'vendor') {
                    navigate('/vendor', { replace: true });                }
                else if (res?.role === 'user') {
                    navigate('/attendee', { replace: true });
                }
                else if (res?.role === 'superadmin') {
                    navigate('/Dashboard', { replace: true });
                }
                else {
                    setSuccess({
                        variant: 'error',
                        message: 'Your Account is not registered Properly!',
                    });
                    handleClicks();
                }
            }
            else {
                setRegister(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const [success, setSuccess] = React.useState({
        variant: 'success',
        message: 'Your Account created successfully!',
    });
    const [opens, setOpens] = React.useState(false);
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

    const GoogleSinUp = async () => {
        data.role = role;
        data.pic = image;
        const res = await login(data);
        if (res?.verified === false) {
            navigate('/pending', { replace: true });
        }
        else if (res?.role === "superadmin") {
            navigate('/Dashboard', { replace: true });
        }
        else if (res?.role === "admin") {
            navigate('/event', { replace: true });
        }
        else if (res?.role === "vendor") {
            navigate('/vendor', { replace: true });        }
        else if (res?.role === "user") {
            navigate('/attendee', { replace: true });
        }
    }
    const navigate = useNavigate();
    const onSubmit = async (fieldValues) => {
        try {
            console.log(fieldValues);
            const res = await login(fieldValues);
            console.log(res);
            if (res?.verified === false) {
                navigate('/pending', { replace: true });
            }
            else if (res?.showMessages === false) {
                navigate('/accept', { replace: true });
            }
            else if (res?.role === 'admin') {
                navigate('/event', { replace: true });
            }
            else if (res?.role === 'vendor') {
                navigate('/vendor', { replace: true });
            }
            else if (res?.role === 'user') {
                navigate('/attendee', { replace: true });
            }
            else if (res?.role === 'superadmin') {
                navigate('/Dashboard', { replace: true });
            }
            else if (res?.status === true) {
                navigate('/block', { replace: true });
            }
            else {
                setSuccess({
                    variant: 'error',
                    message: 'Your Account is not registered!',
                });
                handleClicks();
            }
            reset();
        } catch (error) {
            console.error(error);
        }
    };
    const roles = [
        { label: 'Admin' },
        { label: 'Vendor' },
        { label: 'User' },
    ];
    return (
        <div>
            {props.index === 0 ? < Button sx={{ marginRight: 4 }} variant="contained" onClick={handleOpen}>Login</Button>
                : <Typography onClick={handleOpen} textAlign="center">Login</Typography>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    {registered === true ? <div>
                        <div style={{ display: 'flex', justifyContent: "end", alignContent: 'end' }}
                        >
                            <CloseIcon onClick={handleClose} color='black' className='hover:bg-gray-200 cursor-pointer' />
                        </div>
                        <GoogleButton style={{ marginTop: 40, width: windowWidth < 800 ? 250 : 400, marginLeft: 15 }} onClick={handleClick} />
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginTop: 20, opacity: 0.7 }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                or
                            </Typography>
                        </div>
                        <Box
                            component="form"
                            ref={form}
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{ mt: 3 }}
                        >
                            <TextField
                                {...register("email")}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                                id="email"
                                required
                                placeholder='E-mail'
                                name="email"
                                type='email'
                                sx={{
                                    width: windowWidth < 800 ? 250 : 400,
                                    marginTop: 1.0,
                                    marginLeft: 1.5,
                                    '& input::placeholder': {
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderWidth: 2,
                                            borderColor: 'gray',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                {...register("password")}
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                                id="password"
                                required
                                name="password"
                                placeholder='Password' type='password' variant="outlined" sx={{
                                    width: windowWidth < 800 ? 250 : 400,
                                    marginTop: 2.5,
                                    marginLeft: 1.5,
                                    '& input::placeholder': {
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderWidth: 2,
                                            borderColor: 'gray',
                                        },
                                    },
                                }} />
                            <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', marginTop: 30, marginRight: 25 }}>
                                <Checkbox
                                    id="Checkbox"
                                    required
                                    name="Checkbox"
                                    type="checkbox"
                                    {...register("Checkbox")}
                                />
                                <Typography id="modal-modal-title" variant="h7" component="h2">
                                    {errors.Checkbox ? "You must agree to the terms and conditions." : "I agree to join Fastian mailing list"}
                                </Typography>
                            </div>
                            <Button type="submit" sx={{ marginTop: 2.0, width: windowWidth < 800 ? 250 : 400, marginLeft: 1.5, height: 45 }} variant="contained">Login</Button>
                        </Box>
                        <div style={{ marginTop: 20, marginLeft: 15, color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography id="modal-modal-title" variant="h7" component="h2"  >
                                No account?&nbsp;
                            </Typography>
                            <Typography id="modal-modal-title" variant="link" component="h2" sx={{ color: 'blue' }} className='cursor-pointer hover:underline' >
                                {" Create one"}
                            </Typography>
                        </div>
                    </div> :
                        <div>
                            <div style={{ display: 'flex', justifyContent: "space-between", alignContent: 'center' }}
                            >
                                <ArrowBackIcon onClick={() => { setRegister(true) }} color='black' className='hover:bg-gray-200 cursor-pointer' />
                                <CloseIcon onClick={handleClose} color='black' className='hover:bg-gray-200 cursor-pointer' />
                            </div>
                            <div>
                                <Typography id="modal-modal-title" variant="h6" component="h2"
                                    sx={{ marginTop: 3.0, ml: 1.5 }}
                                >
                                    Register
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1.5 }}>
                                    Create your account. It's free and only takes a minute.
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1.5 }}>
                                    <b>Role</b>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1.5 }}>
                                    Select your role
                                </Typography>
                            </div>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={roles}
                                isOptionEqualToValue={(option, value) => option.label === value}
                                value={role}
                                onChange={(event, newValue) => {
                                    setRole(newValue.label);
                                }}
                                sx={{ width: windowWidth < 800 ? 250 : 400, marginLeft: 1.5, marginTop: 3.0 }}
                                renderInput={(params) => <TextField {...params} placeholder="Choose your role" />}
                            />
                            <div style={{ textAlign: "center", marginTop: "20px", width: windowWidth < 800 ? 250 : 400, height: 40 }}>
                                <label htmlFor="fileInput" className="custom-file-upload" style={{ marginLeft: 10, width: windowWidth < 800 ? 250 : 400 }}>
                                    Choose File
                                </label>
                                <input
                                    id="fileInput"
                                    type="file"
                                    onChange={storeImage}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div style={{ marginTop: 10 }}>
                                {uploadProgress > 0 && uploadProgress < 100 && (
                                    <div style={{ width: '100%', background: 'black', borderRadius: 5, overflow: 'hidden' }}>
                                        <div
                                            style={{
                                                width: `${uploadProgress}%`,
                                                height: 10,
                                                background: '#4caf50',
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <Button sx={{ mt: 8.0, width: windowWidth < 800 ? 250 : 400, marginLeft: 1.5, height: 45 }} variant="contained" onClick={GoogleSinUp}>Register</Button>
                            <div style={{ marginTop: 30, marginLeft: 15, color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography id="modal-modal-title" variant="h7" component="h2"  >
                                    Login with email?&nbsp;
                                </Typography>
                                <Typography id="modal-modal-title" variant="link" component="h2" sx={{ color: 'blue' }} className='cursor-pointer hover:underline'
                                >
                                    Create one
                                </Typography>
                                <Typography id="modal-modal-title" variant="link" component="h2" sx={{ color: 'blue' }} className='cursor-pointer hover:underline'
                                >
                                    Forgot Password?
                                </Typography>
                            </div>
                        </div>
                    }
                    <Stack spacing={3} sx={{ ml: 5, width: '100%' }}>
                        <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloses}>
                            <Alert onClose={handleCloses} severity={success.variant} sx={{ width: '100%' }}>
                                {success.message}
                            </Alert>
                        </Snackbar>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}