import React from 'react';
import styles from './Footer.module.scss';
import { useTheme } from 'app/providers/ThemeProvider';

interface FooterProps {
  theme?: 'light' | 'dark';
}



const Footer = ({ theme }: FooterProps) => {
  const contextTheme = useTheme().theme;  
      const appliedTheme =`footer${theme || contextTheme}`;
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    helpSupport: [
      { text: 'Contact Us', href: '/contact' },
      { text: 'Payment Options', href: '/payment-options' },
      { text: 'Cancellations/Refunds', href: '/cancellations' },
      { text: 'Clinic Feedback', href: '/feedback' },
      { text: 'FAQs', href: '/faq' }
    ],
    aboutUs: [
      { text: 'Our Story', href: '/about' },
      { text: 'Medical Team', href: '/team' },
      { text: 'Blog', href: '/blog' },
      { text: 'In the Media', href: '/media' }
    ],
    corporate: [
      { text: 'Terms & Conditions', href: '/terms' },
      { text: 'Privacy Policy', href: '/privacy' },
      { text: 'CCTV Policy', href: '/cctv' },
      { text: 'Careers', href: '/careers' },
      { text: 'Franchise Opportunities', href: '/franchise' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', icon: '📘', color: '#1877F2' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼', color: '#0A66C2' },
    { name: 'Instagram', href: 'https://instagram.com', icon: '📸', color: '#E4405F' },
    { name: 'YouTube', href: 'https://youtube.com', icon: '▶️', color: '#FF0000' },
    { name: 'Trustpilot', href: 'https://trustpilot.com', icon: '⭐', color: '#00B67A' }
  ];
debugger
  return (
    <footer className={`${styles.footer} ${appliedTheme}`}>
      <div className={styles.footerContainer}>
        {/* Main Content */}
        <div className={styles.footerContent}>
          {/* Help & Support */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Help & Support</h4>
            <nav>
              <ul className={styles.footerLinks}>
                {footerLinks.helpSupport.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* About Us */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>About Us</h4>
            <nav>
              <ul className={styles.footerLinks}>
                {footerLinks.aboutUs.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Corporate */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Corporate</h4>
            <nav>
              <ul className={styles.footerLinks}>
                {footerLinks.corporate.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Media */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Follow Us</h4>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={`Follow us on ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--hover-color': social.color } as React.CSSProperties}
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                  <span className={styles.socialText}>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.footerBottom}>
          <div className={styles.footerCopyright}>
            <p>© 2025 KH SOLUTIONS | All rights reserved</p>
          </div>
          <button 
            onClick={scrollToTop}
            className={styles.backToTop}
            aria-label="Back to top"
          >
            Back to Top ↑
          </button>
        </div>
      </div>


    </footer>
  );
};

export default Footer;