import MakeIOU from '../artifacts/MakeIOU.json';
import StoreIOUs from '../artifacts/StoreIOUs.json'
import IOUToken from '../artifacts/IOUtoken.json'


const options = {
    contracts:[MakeIOU, StoreIOUs],
    web3: {
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:8545"
        }
    }
}

export default options;