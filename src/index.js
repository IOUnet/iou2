import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from './serviceWorker';
import { Provider }       from 'react-redux';
import { createVtxStore } from './ethvtx_config/createVtxStore';
import { setupWeb3 }      from './ethvtx_config/setupWeb3';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );



const main = async () => {

  const store = await createVtxStore();
  await setupWeb3(store);

  ReactDOM.render(
      <Provider store={store}>
          <App />
      </Provider>,
      document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
  //serviceWorker.unregister();

};

main();

reportWebVitals();

