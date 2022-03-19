import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ChainWebProvider from './context/chain/ChainWebProvider'




const main = async () => {


  ReactDOM.render(
    <ChainWebProvider>
          <App />
    </ChainWebProvider>,

      document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
  //serviceWorker.unregister();

};

main();

reportWebVitals();

