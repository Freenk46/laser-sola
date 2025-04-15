import React, { useState } from 'react';
import { LoginForm } from 'features/AuthByUsername/ui/LoginForm/LoginForm';
import { RegisterForm } from 'features/RegisterUser/ui/RegisterForm';

import './AuthTabs.module.scss'; // ჩამოგიწერ ამ სტილსაც

export const AuthTabs = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-container">
            <h2>Customer Sign In</h2>
            <p>Do you have an online account with us? Log in to save time.</p>

            <div className="tabs">
                <button
                    className={isLogin ? 'active' : ''}
                    onClick={() => setIsLogin(true)}
                >
                    LOG IN
                </button>
                <button
                    className={!isLogin ? 'active' : ''}
                    onClick={() => setIsLogin(false)}
                >
                    SIGN UP
                </button>
            </div>

            <div className="form-area">
                <h3>{isLogin ? 'Log in with your email' : 'Create your account'}</h3>
                {isLogin ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>
    );
};
