import  { useEffect, useState,useContext } from "react";
import { Link,useNavigate  } from 'react-router-dom';
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControl,
  InputLabel ,Select,MenuItem
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { saveUser,loadUsers } from "../utils/userService";
import { ArticlesContext } from '../ArticlesContext'; 


const Registration = () => {
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [title] = useState("SignUp");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [source, setSource] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate(); // Use the hook
    const { categories } = useContext(ArticlesContext);
    const [selectedCategory, setSelectedCategory] = useState('');


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
    if (!userName) {
      setErrMessage('Please enter username');
      return;
    }

    if(!password){
      setErrMessage('Please enter password');
      return;
    }

    if(!selectedCategory){
      setErrMessage('Please enter category');
      setLoadingBtn(false);
      return;
    }

    if(!source){
      setErrMessage('Please enter source');
      setLoadingBtn(false);
      return;
    }

    const existingUsers = loadUsers();
    if (existingUsers.find(user => user.username === userName)) {
      setErrMessage('Username already exists');
      return;
    }

    
    saveUser({ userName, password ,category:selectedCategory,source});

    setLoadingBtn(false);
    setSuccessMessage('Registration successful');
    navigate('/login');  // Redirect to login page on successful registration
    setUserName('');
    setPassword('');
    // .then(function (response) {
    //   setLoadingBtn(false);
    //   setErrMessage("")
    //   setSuccessMessage(response.data.message)
    //   console.log("response : ",response.data.message)
    // }).catch(function (error) {
    //   setLoadingBtn(false);
    //   setSuccessMessage("")
    //   setErrMessage(error.response.data.error)
    //   console.log("error : ",error)
    // });
       
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
             <FormControl variant="outlined" style={{ marginRight: '10px',width: "100%" }} >
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
              {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.webTitle}
              </MenuItem>
                ))}
              </Select>
            </FormControl>
             <FormControl variant="outlined" style={{  margin: "8px 0",width: "100%" }}>
              <InputLabel>Source</InputLabel>
              <Select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                label="Source"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="bbc-news">BBC News</MenuItem>
                <MenuItem value="the-guardian">The Guardian</MenuItem>
                <MenuItem value="new-york-times">New York Times</MenuItem>
              </Select>
           </FormControl>
            <LoadingButton
              loading={loadingBtn}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={avatarStyle}
            >
              Sign Up
            </LoadingButton>
          </form>
          <div style={{margin: "10px 0"}}>
          {errMessage !="" ? <span style={{color: "red"}}>{errMessage}</span> : <span style={{color: "green"}}>{successMessage}</span>}
          </div>
          <div style={{margin: "20px 0",display : "flex"}}>
                <span><Link style={{textDecoration:"none"}} to="/login">Already have an account?</Link> </span>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default Registration;
