import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { RegisterState } from "features/RegisterUser/model/slice/registerSlice";

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    loginForm: LoginSchema;
    registerUser: RegisterState;
}
