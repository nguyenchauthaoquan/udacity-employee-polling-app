import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import './assets/styles/css/index.css'
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ErrorBoundary>
          <Provider store={store}>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </Provider>
      </ErrorBoundary>

  </React.StrictMode>,
)
