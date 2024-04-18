import classNames from 'classnames/bind';
import React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/icons/Icon';
import styles from './pager.module.scss';

const cx = classNames.bind(styles);

export type PagerProps = {
  currentPage: number;
  total: number;
  className?: string;
};

const Pager: React.FC<PagerProps> = ({ currentPage, total, className }) => {
  return (
    <div className={cx(styles.root, className)}>
      <Button className={styles.pageBtnPrev}><Icon width={32} height={32} viewBox='0 0 32 32'>
        <path d="M20.62 26.5599L11.9267 17.8666C10.9 16.8399 10.9 15.1599 11.9267 14.1333L20.62 5.43994" stroke="#AFADB5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </Icon></Button>
      <div className={styles.pages}>
        {Array.from({ length: total }, (_, index) => index).map((btn, index) => (
          <Button className={cx(styles.pageBtn, {
            'active': currentPage === index + 1
          })} key={index}><Text>{btn + 1}</Text></Button>
        ))}
      </div>
      <Button className={styles.pageBtnNext}><Icon width={32} height={32} viewBox='0 0 32 32'>
        <path d="M12.38 26.5599L21.0733 17.8666C22.1 16.8399 22.1 15.1599 21.0733 14.1333L12.38 5.43994" stroke="#151411" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </Icon></Button>
    </div >
  );
};

export default Pager;
