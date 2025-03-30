import React, { useState } from 'react';
import styles from './ContactForm.module.scss';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add submission logic (e.g., EmailJS, FormSubmit)
        setSubmitted(true);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
            </div>

            <div className={styles.group}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>

            <div className={styles.group}>
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className={styles.group}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} />
            </div>

            <button type="submit" className={styles.submit}>Send Message</button>

            {submitted && <p className={styles.success}>Message sent successfully!</p>}
        </form>
    );
};

export default ContactForm;
