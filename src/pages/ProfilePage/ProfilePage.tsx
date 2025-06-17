import React, { useState, useEffect } from 'react';
import Navigation from './ui/Navigation/Navigation';
import Account from './ui/Account/Account';
import MyTreatments from './ui/MyTreatments/MyTreatments';
import MyAppointments from './ui/MyAppointments/MyAppointments';
import Feedback from './ui/Feedback/Feedback';
import styles from './ProfilePage.module.scss';
import { FAQPage } from 'pages/FAQPage/FAQPage';
import { useLocation } from 'react-router-dom';

export type MenuItemType = 'account' | 'treatments' | 'appointments' | 'faqs' | 'feedback';

const ProfilePage: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItemType>('account');
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '') as MenuItemType;
    if (['account', 'treatments', 'appointments', 'faqs', 'feedback'].includes(hash)) {
      setActiveMenuItem(hash);
    }
  }, [location]);

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'account':
        return <Account />;
      case 'treatments':
        return <MyTreatments />;
      case 'appointments':
        return <MyAppointments />;
      case 'faqs':
        return <FAQPage />;
      case 'feedback':
        return <Feedback />;
      default:
        return <Account />;
    }
  };

  return (
    <div className={styles.profilePage}>
      <Navigation
        activeMenuItem={activeMenuItem}
        onMenuItemClick={setActiveMenuItem}
      />
      <div className={styles.contentContainer}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
