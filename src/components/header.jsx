
import { useState,useContext } from 'react';
import { TextField, Button } from '@mui/material';
import { ArticlesContext } from "../ArticlesContext"; 
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const {  fetchNews } = useContext(ArticlesContext);
    const { loginUser,logout } = useContext(UserContext);
    const handleFetchNews = () => {
        fetchNews(searchQuery);
      }
      const handleSignOut = () => {
        logout();  // Clear the user data from context
      };
  return (  
    <div style={{display: "flex",justifyContent: "center",alignItems: "center",backgroundColor: "#f5f5f5",width:"100%"}}>
     <header style={{ padding: '20px', backgroundColor: '#f5f5f5', display : "flex",justifyContent : "center" }}>
        <TextField
          label="Search by Keyword"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: '10px',width : "100%" }}
        />
        <Button variant="contained" color="primary" onClick={handleFetchNews}>
          Search
        </Button>
      </header>
      <div style={{ display : "flex",justifyContent : "center" ,padding: "10px",backgroundColor: "#f5f5f5",width:"50%"}}>
        <h2>{loginUser ? `Welcome, ${loginUser.userName}` : ""}</h2>
      </div>
      <div style={{ display : "flex",justifyContent : "center" ,padding: "10px",backgroundColor: "#f5f5f5"}}>
        <h2 ><Link style={{textDecoration:"none"}} onClick={handleSignOut} to={"/login"}>Sign Out</Link></h2>
      </div>
    </div>
   
  )
}

export default Header;
