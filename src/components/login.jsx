import  { useEffect, useState,useContext } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { authenticateUser } from "../utils/userService";
import { UserContext } from '../UserContext';


const Registration = () => {
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [title] = useState("SignIn");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate(); // Use the hook
    const { setLoginUser } = useContext(UserContext);
    useEffect(() => {
        document.title = title;
    })

    const avatarStyle = {
        backgroundColor: "#1bbd7e",
    };

    const paperStyle = {
        padding: 50,
        width: 300,
        margin: "130px auto",
        borderRadius: 20,
    };
    const marginAll = {
        margin: "8px 0"
    }
     const mainDiv = {display : "flex",height: "100vh",width:"100vw", alignItems: "center", justifyContent: "center"}

 

    const handleSubmit = async (e) => {
        setLoadingBtn(true);
        e.preventDefault();   


        const user = authenticateUser(userName, password);
        console.log(user);
        if (user) {
            setLoginUser(user);
            setSuccessMessage('Login successful');
            navigate('/home');  // Redirect to home page on successful login
        } else {
            setErrMessage('Invalid username or password');
        }

        setLoadingBtn(false);
        setUserName('');
        setPassword('');
        
    };
    return (
        <div>
        <Grid align="center" style={mainDiv}>
            <Paper elevation={7} style={paperStyle} justify="center">
            <Avatar style={ avatarStyle}>
                <LockOutlinedIcon />
            </Avatar>
            <h2>{"SIGNUP"}</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter Your Username"
                label="UserName"
                variant="outlined"
                fullWidth
                required
                // style={{ margin: "8px 0" }}
                value={userName}
                color="primary"
                />
                <TextField
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your password"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                style={marginAll}
                value={password}
                color="primary"
                />
                <LoadingButton
                loading={loadingBtn}
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                style={avatarStyle}
                >
                Sign In
                </LoadingButton>
            </form>
            <div style={{margin: "10px 0"}}>
            {errMessage !="" ? <span style={{color: "red"}}>{errMessage}</span> : <span style={{color: "green"}}>{successMessage}</span>}
            </div>
            <div style={{margin: "20px 0",display : "flex"}}>
                    <span><Link style={{textDecoration:"none"}} to="/register">{"Don't Have an account?"}</Link> </span>
            </div>
            <div style={{margin: "20px 0",display : "flex"}}>
                    <span><Link style={{textDecoration:"none"}} to="/home">{"View General News As a Guest"}</Link> </span>
            </div>
            </Paper>
        </Grid>
        </div>
    );
};

export default Registration;
