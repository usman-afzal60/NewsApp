import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ArticlesProvider } from './ArticlesContext.jsx'; // Adjust the import path as necessary
import {UserProvider} from './UserContext.jsx'; // Adjust the import path as necessary

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ArticlesProvider>
        <App />
      </ArticlesProvider>
    </UserProvider>
  </StrictMode>,
)
