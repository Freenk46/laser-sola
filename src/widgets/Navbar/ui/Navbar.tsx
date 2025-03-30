import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const [scrolled, setScrolled] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={classNames(cls.navbar, { [cls.shrink]: scrolled }, [className])}>
            <div className={cls.container}>
                <div className={cls.logo}>KH SOLUTIONS</div>
                <nav className={cls.menu}>
                    <a href="/" className={cls.link}>{t('Home')}</a>
                    <a href="/services" className={cls.link}>{t('Services')}</a>
                    <a href="/shop" className={cls.link}>{t('Shop')}</a>
                    <a href="/about" className={cls.link}>{t('About')}</a>
                    <a href="/blog" className={cls.link}>{t('Blog')}</a>
                    <a href="/contact" className={cls.link}>{t('Contact')}</a>

                    {authData ? (
                        <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onLogout} className={cls.authBtn}>
                            {t('Logout')}
                        </Button>
                    ) : (
                        <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onShowModal} className={cls.authBtn}>
                            {t('Login')}
                        </Button>
                    )}
                </nav>
            </div>

            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
        </header>
    );
};
