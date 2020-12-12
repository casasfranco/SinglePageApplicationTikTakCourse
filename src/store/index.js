import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user';
import videosReducer from './videos';


const reducer = combineReducers({
    user: userReducer,
    videos: videosReducer
});

const persistConf = {
    key: 'root',
    storage: storage,
    whiteList:['user'],
    //blackList:[], caso de querer guardar todo menos lo que especifiquemos
}

const persistedReducer = persistReducer(persistConf, reducer);


export const store = configureStore({
    reducer : persistedReducer
});


export const persistor = persistStore(store);