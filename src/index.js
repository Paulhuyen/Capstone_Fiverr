import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from './pages/Index/Index';
//setup redux
import {Provider} from 'react-redux';
import { store } from './redux/configStore';

import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

//cấu hình history (chuyển hướng không cần hook navigate)
export const history = createBrowserHistory({ window });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history} >
      <Routes>
            <Route path='' element={<App/>}>
                  <Route path='/' element={<Index/>}></Route>
            </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

reportWebVitals();
