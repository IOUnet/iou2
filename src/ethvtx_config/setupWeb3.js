import Web3                     from 'web3';
import {
    start,
    setWeb3,
    addAccount,
    authorizeAndSetWeb3,
    loadContractSpec,
    loadContractInstance
}                               from 'ethvtx/lib/dispatchers';
import MakeIOU from '../artifacts/MakeIOU.json';
import StoreIOUs from '../artifacts/StoreIOUs.json';
import { get_contracts_address } from './getContractAddress';



export const setupWeb3 = async (store) => {

    /// If provider requires authorization
    if (window.ethereum) {

        const web3_getter = async () => {

            const provider = window.ethereum;
            const web3 = new Web3(provider);

            return web3;
        };

        await authorizeAndSetWeb3(store.dispatch, {
            enable: window.ethereum.enable,
            web3: web3_getter
        });
        
        loadContractSpec(store.dispatch, 'MakeIOU', MakeIOU.abi, {
            permanent: true,
            bin: MakeIOU.deployedBytecode,
            constructor_bin: MakeIOU.bytecode
        });

        loadContractSpec(store.dispatch, 'StoreIOUs', StoreIOUs.abi, {
            permanent: true,
            bin: StoreIOUs.deployedBytecode,
            constructor_bin: StoreIOUs.bytecode
        });

        // addAccount(store.dispatch, '0xa087a6Ddc4BDB1028fe4431C8616F8E15Cf5F522', {
        //     alias: '@permanenttest',
        //     permanent: true
        // });

        const addresses = await get_contracts_address();
        console.log('Address Loaded', addresses);
        
        loadContractInstance(store.dispatch, 'MakeIOU', addresses.address_makeiou, {
            alias: '@makeiou',
            permanent: true, // By default false
            balance: true
        });
        loadContractInstance(store.dispatch, 'StoreIOUs', addresses.address_storeious, {
            alias: '@storeious',
            permanent: true, // By default false
            balance: true
        });
 

        start(store.dispatch);

    } else {
        /// If provider does not require authorization, and we assume web3 is available
        const provider = window.web3.currentProvider;
        //// Should do this in store

        const web3 = new Web3(provider);

        setWeb3(store.dispatch, web3);
        loadContractSpec(store.dispatch, 'MakeIOU', MakeIOU.abi, {
            permanent: true,
            bin: MakeIOU.deployedBytecode,
            constructor_bin: MakeIOU.bytecode
        });

        loadContractSpec(store.dispatch, 'StoreIOUs', StoreIOUs.abi, {
            permanent: true,
            bin: StoreIOUs.deployedBytecode,
            constructor_bin: StoreIOUs.bytecode
        });
        
        const addresses = await get_contracts_address();
        console.log('Address Loaded', addresses);

        loadContractInstance(store.dispatch, 'MakeIOU', addresses.address_makeiou, {
            permanent: true // By default false
        });
        loadContractInstance(store.dispatch, 'StoreIOUs', addresses.address_makeiou, {
            permanent: true // By default false
        });

        // addAccount(store.dispatch, addresses.address_makeiou, {
        //     alias: '@makeiou',
        //     permanent: true
        // });

        

        start(store.dispatch);
    }
};
