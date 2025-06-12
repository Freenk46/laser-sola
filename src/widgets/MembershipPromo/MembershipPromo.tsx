import React from 'react';
import styles from './MembershipSection.module.scss';

interface MembershipSectionProps {
  className?: string;
  videoSrc?: string;
  videoPoster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

const MembershipSection: React.FC<MembershipSectionProps> = ({ 
  className, 
  videoSrc, 
  videoPoster, 
  autoPlay = true, 
  muted = true, 
  loop = true 
}) => {
  return (
    <div className={`${styles.membershipContainer} ${className || ''}`}>
      {/* Section 1 - Image */}

      <div className={`${styles.section} ${styles.contentSection}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>წევრობა, რომელიც ნამდვილად გიღირს!</h2>
          <p className={styles.subtitle}>
          მიიღე ექსკლუზიური წვდომა ჩვენს სპეციალურ შეთავაზებებსა და 
          მხოლოდ წევრებისთვის განკუთვნილ პროდუქტებზე
          </p>
          <button className={styles.ctaButton}>შემოგვიერთდი ახლა უფასოდ</button>
        </div>
      </div>
      {/* Section 2 - Content */}
  
      <div className={`${styles.section} ${styles.imageSection}`}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>  LASER SOLA+</h1>
        </div>
      </div>
      {/* Section 3 - Benefits */}

      <div className={`${styles.section} ${styles.benefitsSection}`}>
        <div className={styles.benefitsContent}>
          <h3 className={styles.benefitsTitle}> მიიღე მეტი ! </h3>
          <p className={styles.benefitsDescription}>
          შემოგვიერთდი ჩვენი უფასო წევრობის პროგრამაში და მიიღე ექსკლუზიური წვდომა სპეციალურ აქციებზე, მხოლოდ წევრებისთვის განკუთვნილ
           სერვისებზე და სხვა მრავალ პრივილეგიაზე.
          </p>
          <p className={styles.terms}>
          რეგისტრაცია შესაძლებელია სალონში, ონლაინ ან Laser Sola აპით. <span className={styles.link}>T&Cs apply</span>.
          </p>
          
          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>ექსკლუზიური ფასდაკლებები წევრებისთვის</div>
          
          </div>
        </div>
      </div>

      {/* Section 4 - Video */}
    

      
      <div className={`${styles.section} ${styles.videoSection}`}>
        <div className={styles.videoContainer}>
          {videoSrc ? (
            <video 
              className={styles.video}
              src={videoSrc}
              poster={videoPoster}
              autoPlay={autoPlay}
              muted={muted}
              loop={loop}
              playsInline
              controls={false}
            />
          ) : (
            <div className={styles.videoPlaceholder}>
              <h1 className={styles.videoLogo}>MEJURI+</h1>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};



export default MembershipSection;