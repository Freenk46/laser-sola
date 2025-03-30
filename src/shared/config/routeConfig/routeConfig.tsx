import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import ContactPage from 'pages/ContactPage/ContactPage';
import { FAQPage } from 'pages/FAQPage/FAQPage';

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    CONTACT = 'contact',
    FAQ = 'FAQ',
    NOT_FOUND = 'not_found',

}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.CONTACT]: '/contact',
    [AppRoutes.FAQ]: '/FAQ',
    // последний
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
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
