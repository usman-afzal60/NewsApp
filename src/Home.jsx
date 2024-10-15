
import './App.css' 

import Header from './components/header';
import Articles from './components/Articles';

function Home() {
  
  return (  
    <div style={{    display: "flex",flexDirection: "column",width: "100vw"}}>
        <Header />
        <Articles />
    </div>
  )
}

export default Home
