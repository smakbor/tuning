import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// third-party
import { Provider as ReduxProvider } from 'react-redux';
import Notistack from 'components/third-party/Notistack';

// scroll bar
import 'simplebar/dist/simplebar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// apex-chart
import 'assets/third-party/apex-chart.css';
import 'assets/third-party/react-table.css';

//date  picker
import 'react-datepicker/dist/react-datepicker.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// project import
import App from './App';
import { store } from 'store';
import { ConfigProvider } from 'contexts/ConfigContext';
import reportWebVitals from './reportWebVitals';
import 'regenerator-runtime/runtime';
import { DndProvider } from 'react-dnd';
import { isMobile } from 'react-device-detect';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import ThemeCustomization from 'themes';

const root = ReactDOM.createRoot(document.getElementById('root'));

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

root.render(
  <ReduxProvider store={store}>
    <ConfigProvider>
      <BrowserRouter>
        <Notistack>
          <ThemeCustomization>
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
              <RTLLayout>
                <Locales>
                  <ScrollTop>
                    <App />
                  </ScrollTop>
                </Locales>
              </RTLLayout>
            </DndProvider>
          </ThemeCustomization>
        </Notistack>
      </BrowserRouter>
    </ConfigProvider>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
