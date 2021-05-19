import { applyMiddleware, compose, createStore } from 'redux';
import { getSagas, getReducers, getInitialState, configureVtx }  from 'ethvtx';
import createSagaMiddleware    from 'redux-saga';
import makeIOUReducer from './reducers/makeIOUTokenReducer'
import { watchMakeIOUToken } from './sagas/createTokenSaga';
import { watchGetListOfToken } from './sagas/getListOfTokens';

export const createVtxStore = () => {

    const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const initial_state = configureVtx(getInitialState(), {
        poll_timer: 200,
        confirmation_threshold: 5
    });
    const additionReducers  = {
        makeIOUReducer
    }
    const reducers = getReducers(additionReducers);

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducers,
        initial_state,
        composer(applyMiddleware(sagaMiddleware))
    );

    const sagas = getSagas(store, [watchMakeIOUToken, watchGetListOfToken]);

    sagaMiddleware.run(sagas, store.dispatch);

    return store;

};
