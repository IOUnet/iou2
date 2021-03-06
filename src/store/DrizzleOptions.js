import MakeIOU from '../artifacts/MakeIOU.json';
import StoreIOUs from '../artifacts/StoreIOUs.json'
import IOUtoken from '../artifacts/IOUtoken.json'
import ProxyIOU from '../artifacts/ProxyIOU.json';


const options = {
    contracts:[MakeIOU, StoreIOUs, ProxyIOU, IOUtoken],
    web3: {
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:8545"
        }
    }
}

export default options;