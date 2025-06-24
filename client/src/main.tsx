import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { suppressAdSenseErrors } from './utils/devErrorSuppression'

// Suppress AdSense errors in development
suppressAdSenseErrors();

createRoot(document.getElementById("root")!).render(<App />);
