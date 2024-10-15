// ArticlesContext.js
import  { createContext, useState, useEffect,useContext } from 'react';
import axios from 'axios';
export const ArticlesContext = createContext();
import { UserContext } from "./UserContext";
// eslint-disable-next-line react/prop-types
export const ArticlesProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const { loginUser } = useContext(UserContext);
    console.log("loginUser in articlesContext",loginUser)
    const fetchNews = async (searchQuery= "") => {
      let newYorkFinal = []
      let newsApiFinal = []
      let guardianFinalResult = []
       await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            q:  searchQuery || "news",
            apiKey: 'cd2a06085682426188525cb3b1a230e8',
          },
          
        }).then((res) => {
          newsApiFinal = res.data.articles
        }).catch((error) => {
          console.error(error)
        });;
    
       await axios.get('https://content.guardianapis.com/search', {
          params: {
            "q": searchQuery || "news",
            'show-fields': 'thumbnail,trailText', 
            "api-key": '1817f0d6-a665-41bc-a943-c6e22e13146b',
          },
        }).then((response) => {  
          guardianFinalResult = response.data.response.results.map((article) => {
            return {
              title : article.webTitle,
              description : article.fields.trailText,
              urlToImage : article.fields.thumbnail,
              url : article.webUrl
            }
          })
        }).catch((error) => {
          console.error(error)
        });
    
          await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
            params: {
              q: searchQuery || "news",
              'api-key': '0E4KxhIsWyJ6Nw2mTeHdB9qD7o2J77pu',  
            },
          }).then((res) => {
            newYorkFinal = res.data.response.docs.map((article) => {
              return {
                title : article.headline.main,
                description : article.abstract || article.lead_paragraph,
                urlToImage : article.multimedia.length > 0 
                ? `https://www.nytimes.com/${article.multimedia[0].url}`
                : null,
                url : article.web_url
              }
            })
          }).catch((error) => {
            console.error(error)
          });
    
         
    
          const finalArray = [...newsApiFinal,...guardianFinalResult,...newYorkFinal]
          
          setArticles(finalArray);
    };


     // newsArticleFilterByCategory
  const fetchArticlesByCategory = async (date,selectedCategory) => {
    let categoryResponse = []
    await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        from: date,
        category: selectedCategory || "news",
        apiKey: 'cd2a06085682426188525cb3b1a230e8',
      },
    }).then((res) => {
      categoryResponse = res.data.articles
    }).catch((error) => {
      console.error(error)
    });
  
    return categoryResponse || [];
  };

  // newsArticleFilterBySource
  const fetchArticlesBySource = async (date,selectedSource) => {
    let sourceResponse = []
    await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        from: date,
        sources: selectedSource || "the-guardian",
        apiKey: 'cd2a06085682426188525cb3b1a230e8',
      },
    }).then((res) => {
      sourceResponse = res.data.articles
    }).catch((error) => { 
      console.error(error)
    });
  
    return sourceResponse || [];
  };

  // guardian Articles filter
  const filterGuardianArticles = async (date,selectedCategory,selectedSource) => {
    let guardianApiResponse = []   
    await axios.get('https://content.guardianapis.com/search', {
      params: {
        "api-key": '1817f0d6-a665-41bc-a943-c6e22e13146b',
        'show-fields': 'thumbnail,trailText', 
        from: date,                                       
        section: selectedCategory || "news",                                  
        sources: selectedSource || "the-guardian",
      },
    }).then((response) => {
      guardianApiResponse = response
    }).catch((error) => {
      console.error(error)
    });
     let guardianApiResult = guardianApiResponse?.data?.response?.results?.map((article) => {
      return {
        title : article.webTitle,
        description : article.fields.trailText,
        urlToImage : article.fields.thumbnail,
        url : article.webUrl
      }
    })
    return guardianApiResult || [];
  }

  const filterNewYorkTimesArticles = async (date,selectedCategory,selectedSource) => {
    let newYorkTimeSearch = [] 
    await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
        params: {
         'api-key': '0E4KxhIsWyJ6Nw2mTeHdB9qD7o2J77pu',  
          begin_date: date.replaceAll("-","") ||  new Date().toJSON().slice(0, 10).replaceAll("-",""),
          fq: `news_desk:("${selectedCategory || "news"}") AND source:("${selectedSource || "New York Times"}")`,                                   
        },
      }).then((response) => {
        newYorkTimeSearch = response
      }).catch((error) => {
        console.error(error)
      });

      let newYorkFinal = newYorkTimeSearch?.data?.response?.docs?.map((article) => {
        return {
          title : article.headline.main,
          description : article.abstract || article.lead_paragraph,
          urlToImage : article.multimedia.length > 0 
          ? `https://www.nytimes.com/${article.multimedia[0].url}` // Image URL (full path)
          : null,
          url : article.web_url
        }
      })
      return newYorkFinal || [];
  }

  const fetchArticles = async (date, selectedCategory, selectedSource) => {
    const articlesByCategory = await fetchArticlesByCategory(date,selectedCategory);
    const articlesBySource = await fetchArticlesBySource(date,selectedSource);
    const fetchGuardianArticlesData = await filterGuardianArticles(date, selectedCategory, selectedSource);
    const fetchNewYorkTimesArticlesData = await filterNewYorkTimesArticles(date, selectedCategory, selectedSource);
  
    const filteredArticles = Array.isArray(articlesByCategory) && Array.isArray(articlesBySource) 
        ? articlesByCategory.filter(articleByCategory =>
            articlesBySource.some(articleBySource => articleBySource.title === articleByCategory.title)
        )
        : []; // Default to empty array if not iterable

    const finalArray = [
        ...Array.isArray(filteredArticles) ? filteredArticles : [],
        ...Array.isArray(fetchGuardianArticlesData) ? fetchGuardianArticlesData : [],
        ...Array.isArray(fetchNewYorkTimesArticlesData) ? fetchNewYorkTimesArticlesData : []
    ];
    
    setArticles(finalArray);

  };

  const fetchCategories = async () => {
    const response = await axios.get('https://content.guardianapis.com/sections', {
      params: {
        "api-key": '1817f0d6-a665-41bc-a943-c6e22e13146b',
      },
    });
    setCategories(response.data.response.results); 
  };

    useEffect(() => {
      const date = new Date().toJSON().slice(0, 10);  // Get current date
        setArticles([]);
      // If user is logged in, fetch their preferred articles
        if (loginUser) {
          fetchArticles(date, loginUser?.category, loginUser?.source);
        }else{
          fetchNews();
        }
        fetchCategories()
    }, [loginUser]);

    return (
        <ArticlesContext.Provider value={{ articles,fetchNews,fetchArticles,categories }}>
            {children}
        </ArticlesContext.Provider>
    );
};