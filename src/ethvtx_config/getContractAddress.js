import Web3 from 'web3';
import MakeIOU from '../artifacts/MakeIOU.json';
import StoreIOUs from '../artifacts/StoreIOUs.json';

const web3_getter = async ()=> {

    const provider = window.ethereum;
    const web3 = new Web3(provider);

    return web3;
};

let address_makeiou = null;
let address_storeious = null;
export const get_contracts_address = async () => {

    if (address_makeiou === null) {

        const web3_instance = await web3_getter();
        const net = await web3_instance.eth.net.getId();
        if (MakeIOU.networks[net]) {
            address_makeiou = MakeIOU.networks[net].address;
        }

    }
    
    if (address_storeious === null) {

        const web3_instance = await web3_getter();
        const net = await web3_instance.eth.net.getId();
        if (StoreIOUs.networks[net]) {
            address_storeious = StoreIOUs.networks[net].address;
        }

    }

    return {address_makeiou, address_storeious};

};

