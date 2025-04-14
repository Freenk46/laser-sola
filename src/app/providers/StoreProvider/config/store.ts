import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import authReducer from 'features/AuthByUsername/model/slice/authSlice';
import registerUserReducer from 'features/RegisterUser/model/slice/registerSlice';
import { contentApi } from 'features/content/model/api/contentApi';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        loginForm: loginReducer,
        registerUser: registerUserReducer,
        auth: authReducer,
        [contentApi.reducerPath]: contentApi.reducer,
    };

    const store = configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        // ✅ workaround for strict type error
        // @ts-expect-error: RTK Query middleware not matching exact inferred type
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(contentApi.middleware),
    });
    return store;
}
