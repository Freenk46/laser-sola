import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import authReducer from 'features/AuthByUsername/model/slice/authSlice';
import registerUserReducer from 'features/RegisterUser/model/slice/registerSlice';
import { contentApi } from 'features/content/model/api/contentApi';
import { StateSchema } from './StateSchema';

const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer,
    registerUser: registerUserReducer,
    auth: authReducer,
    [contentApi.reducerPath]: contentApi.reducer,
};

export const store = configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contentApi.middleware) as any,
});

// ✅ AppDispatch ტიპი სხვა ფაილებისთვის (Thunk და კომპონენტებში გამოყენებისთვის)
export type AppDispatch = typeof store.dispatch;

// ✅ createReduxStore ფუნქცია – გამოიყენება StoreProvider-ში
export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(contentApi.middleware) as any,
    });
}
