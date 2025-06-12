import React from 'react';
import styles from './SustainabilityProgress.module.scss';

const SustainabilityProgress: React.FC = () => {
  return (
    <section className={styles.progressSection}>
      <div className={styles.left}>
        <h2>ჩვენი გზა მდგრადი მომავლისკენ</h2>
        <a href="/sustainability-report" className={styles.reportLink}>
        მდგრადობის ანგარიშის ნახვა
        </a>
      </div>
      <div className={styles.right}>
        <p>
        ჩვენი გზა იმ სამკაულის მსგავსია, რომელსაც ვქმნით — თანაგრძნობით შექმნილი და მუდმივი განვითარების პროცესში. ჩვენი მიზანია, რომ მაღალხარისხიანი სამკაული ყოველდღიური მომენტების ნაწილად ვაქციოთ, გავაძლიეროთ ქალები და შევიტანოთ აზრიანი ცვლილებები როგორც ჩვენს საზოგადოებაში, ისე მის ფარგლებს გარეთ.
        </p>
      </div>
    </section>
  );
};

export default SustainabilityProgress;
