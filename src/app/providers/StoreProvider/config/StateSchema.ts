import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { AuthSchema } from 'features/AuthByUsername/model/types';
import { contentApi } from 'features/content/model/api/contentApi';
import { RegisterState } from 'features/RegisterUser/model/slice/registerSlice';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    loginForm: LoginSchema;
    registerUser: RegisterState;
    auth: AuthSchema;
    [contentApi.reducerPath]: ReturnType<typeof contentApi.reducer>;
}
