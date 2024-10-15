import { useState,useContext } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import NewsCard from "./NewsCard";
import { ArticlesContext } from '../ArticlesContext'; 
function Articles() {
 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [date, setDate] = useState('');
  const { articles,  fetchArticles,categories } = useContext(ArticlesContext);

  const handleFetchArticles = () => {
    fetchArticles(date, selectedCategory, selectedSource);
  }

  console.log("articles : ",articles);

  return (  
    <>
    {/* Filter Section */}
    {/* {Categories} */}
         <div style={{ padding: '20px',margin :"40px", backgroundColor: '#f5f5f5', textAlign: 'center', display : "flex" }}>
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

        {/* Sources */}
        <FormControl variant="outlined" style={{ marginRight: '10px',width: "100%" }}>
          <InputLabel>Source</InputLabel>
          <Select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            label="Source"
          >
           
            <MenuItem value="">All</MenuItem>
            <MenuItem value="bbc-news">BBC News</MenuItem>
            <MenuItem value="the-guardian">The Guardian</MenuItem>
            <MenuItem value="new-york-times">New York Times</MenuItem>
          </Select>
        </FormControl>

        {/* Date */}
        <TextField
        style={{width: "100%"}}
          label="Date"
          type="date"
          variant="outlined"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        
        <Button variant="contained" color="primary" onClick={handleFetchArticles} style={{ marginLeft: '10px',width: "100%" }}>
          Apply Filters
        </Button>
      </div>

      {/* News Articles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {articles?.map((article, index) => (

       article.title && article.description && article.urlToImage && article.url &&
          <NewsCard
            key={index}
            title={article.title}
            description={article.description}
            imageUrl={article.urlToImage}
            url={article.url}
          />
        ))}
      </div>
        
    </>
  )
}

export default Articles
