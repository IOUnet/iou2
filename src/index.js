import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ChainWebProvider from './context/chain/ChainWebProvider'
import TagManager from 'react-gtm-module'
 


const main = async () => {
  const tagManagerArgs = {
    gtmId: 'G-7D7W89BF1C'
}
 
TagManager.initialize(tagManagerArgs)
  
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

