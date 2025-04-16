import React from 'react';
import styles from './Footer.module.scss';
import { useTheme } from 'app/providers/ThemeProvider/ThemeProvider';

interface FooterProps {
  theme?: 'light' | 'dark';
}
  

const Footer = ({ theme }: FooterProps) => {


        const contextTheme = useTheme().theme;
        const appliedTheme =    `footer${theme || contextTheme}`;

    return ( <footer className={`${styles.footer} ${appliedTheme}`}>
        <div className={styles.container}>
          <div className={styles.columns}>
            {/* Column 1 */}
            <div className={styles.column}>
              <h4>Help & Support</h4>
              <ul>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/payment-options">Payment Options</a></li>
                <li><a href="/cancellations">Cancellations/Refunds</a></li>
                <li><a href="/feedback">Clinic Feedback</a></li>
                <li><a href="/faq">FAQs</a></li>
              </ul>
            </div>
    
            {/* Column 2 */}
            <div className={styles.column}>
              <h4>About Us</h4>
              <ul>
                <li><a href="/about">Our Story</a></li>
                <li><a href="/team">Medical Team</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/media">In the Media</a></li>
              </ul>
            </div>
    
            {/* Column 3 */}
            <div className={styles.column}>
              <h4>Corporate</h4>
              <ul>
                <li><a href="/terms">Terms & Conditions</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/cctv">CCTV Policy</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/franchise">Franchise Opportunities</a></li>
              </ul>
            </div>
    
            {/* Column 4 */}
            <div className={styles.column}>
              <h4>Follow Us</h4>
              <div className={styles.socials}>
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="LinkedIn">🔗</a>
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="YouTube">▶️</a>
                <a href="#" aria-label="Trustpilot">⭐</a>
              </div>
            </div>
          </div>
    
          <div className={styles.bottom}>
            <p>© 2025 KH SOLUTIONS | All rights reserved</p>
            <a href="#top" className={styles.toTop}>Back to Top ↑</a>
          </div>
        </div>
      </footer>)
 
    };

export default Footer;
