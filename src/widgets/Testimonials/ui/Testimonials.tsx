import React, { useEffect, useState } from 'react';
import styles from './Testimonials.module.scss';

const testimonials = [
  {
    id: 1,
    text: `„დავიწყე ლაზერული ეპილაციის პროცედურები და ვერ წარმოვიდგენდი, რომ ასე სწრაფი და მარტივი იქნებოდა!“`,
    author: 'დები ლევინი',
  },
  {
    id: 2,
    text: `„პერსონალი პროფესიონალურია, ყურადღებიანი და ძალიან მეგობრული — მართლაც შესანიშნავი გამოცდილება მქონდა.“`,
    author: 'გერტრუდა ა.',
  },
  {
    id: 3,
    text: `„გოგონები ძალიან თბილები იყვნენ და მთლიანად მომიხსნეს უხერხულობის განცდა — თავი სახლში ვიგრძენი.“`,
    author: 'ლიზა',
  },
  {
    id: 4,
    text: `„გამოცდილება ჩემთვის საოცარი იყო — პირველი სეანსიდანვე ვიგრძენი განსხვავება.“`,
    author: 'ნინო გ.',
  },
  {
    id: 5,
    text: `„აღარ მეშინია ლაზერის! ძალიან პროფესიონალური მომსახურება და საოცარი შედეგები.“`,
    author: 'თამარი',
  },
];

const getVisibleCount = () => {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
};

export const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0);

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + visibleCount);

  const next = () => {
    setStartIndex((prev) =>
      prev + visibleCount >= testimonials.length ? 0 : prev + 1
    );
  };

  const prev = () => {
    setStartIndex((prev) =>
      prev === 0 ? testimonials.length - visibleCount : prev - 1
    );
  };

  return (
    <section className={styles.testimonials}>
      <h2>რას ამბობენ ჩვენი კლიენტები</h2>

      <div className={styles.cards}>
        {visibleTestimonials.map((item) => (
          <blockquote key={item.id} className={styles.card}>
            <p>{item.text}</p>
            <footer>{item.author}</footer>
          </blockquote>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.seeAll}>იხილე ყველა შეფასება</button>
        <div className={styles.arrows}>
          <button onClick={prev}>{'<'}</button>
          <button onClick={next}>{'>'}</button>
        </div>
      </div>

      {/* Pagination dots */}
      <div className={styles.dots}>
        {Array.from({ length: testimonials.length - visibleCount + 1 }).map((_, idx) => (
          <span
            key={idx}
            className={startIndex === idx ? styles.activeDot : styles.dot}
          />
        ))}
      </div>
    </section>
  );
};
