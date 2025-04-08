import React, { useEffect, useRef } from 'react';
import styles from './UserLoginModal.module.scss';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const UserLoginModal = ({ isOpen, onClose }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div ref={modalRef} className={styles.modal}>
                <div className={styles.header}>
                    <span className={styles.brand}>LaserSola</span>
                    <h2>WELCOME BACK</h2>
                    <button className={styles.close} onClick={onClose}>×</button>
                </div>
                <div className={styles.social}>
                    <button className={styles.socialBtn}>🔵 Continue with Google</button>
                    <button className={styles.socialBtn}> Continue with Apple</button>
                    <button className={styles.socialBtn}>📘 Continue with Facebook</button>
                </div>

                <div className={styles.divider}>or</div>

                <form className={styles.form}>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit" className={styles.signIn}>Sign In</button>
                </form>

                <div className={styles.footer}>
                    <span>Not a member? <a href="#">Join Now</a></span>
                </div>
            </div>
        </div>
    );
};
