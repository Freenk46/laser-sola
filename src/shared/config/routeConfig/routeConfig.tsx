import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import ContactPage from 'pages/ContactPage/ContactPage';
import { FAQPage } from 'pages/FAQPage/FAQPage';
import { AuthPage } from 'pages/AuthPage/ui/AuthPage';
import LHRPage from 'pages/LHRPage/ui/LHRPage';
import CosmetickInjectablePage from 'pages/CosmetickInjectablePage/CosmetickInjectablePage';

export enum AppRoutes {
    MAIN = 'main',
    LHR = 'LHR',
    COSMETICINJECTABLE = 'cosmetickinjectable',

    ABOUT = 'about',

    CONTACT = 'contact',
    NOT_FOUND = 'not_found',
    FAQ = 'FAQ',
    AUTH = 'auth',

}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LHR]: '/LHR',
    [AppRoutes.COSMETICINJECTABLE]: '/injectables',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.CONTACT]: '/contact',
    [AppRoutes.FAQ]: '/FAQ',
    [AppRoutes.AUTH]: '/auth',

    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.COSMETICINJECTABLE]: {
        path: RoutePath.cosmetickinjectable,
        element: <CosmetickInjectablePage />,
    },
    [AppRoutes.LHR]: {
        path: RoutePath.LHR,
        element: <LHRPage />,
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <AuthPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.FAQ]: {
        path: RoutePath.FAQ,
        element: <FAQPage />,
    },
    [AppRoutes.CONTACT]: {
        path: RoutePath.contact,
        element: <ContactPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
