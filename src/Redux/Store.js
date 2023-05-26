
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import RootReducer from './Slice/RootReducer'

const persistConfig = {
    key: 'root',
    storage,
    serialize: (action) => {
      if (action.type === 'persist/PERSIST') {
        return { ...action, register: undefined };
      }
      return action;
    },
  };
  
  const persistedReducer = persistReducer(persistConfig, RootReducer)
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
  
  export const persistor = persistStore(store)