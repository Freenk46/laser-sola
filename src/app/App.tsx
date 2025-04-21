import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
import Footer from 'shared/ui/Footer/Footer';

import TopBar from 'widgets/TopBar/TopBar';
import HeaderMain from 'widgets/HeaderMain/HeaderMain';
import ChatLauncher from 'widgets/chatLauncher/ChatLauncher';





function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <div id="theme-overlay-root" style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none' }} />
            <Suspense fallback="">
                <TopBar />
                <HeaderMain/>
                <div className="content-page">
                    <AppRouter />
                </div>
                <ChatLauncher />
                <Footer />
            </Suspense>
       
        </div>
    );
}

export default App;
