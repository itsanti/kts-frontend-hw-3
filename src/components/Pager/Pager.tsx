import classNames from 'classnames/bind';
import React from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/icons/Icon';
import styles from './pager.module.scss';


const cx = classNames.bind(styles);

export type PagerProps = {
  currentPage: number;
  total: number;
  className?: string;
  setPage: (page: number) => void
};

const getPageNumbers = (total: number, current: number): number[] => {
  return Array.from({ length: total }, (_, index) => {
    if (index + 1 === current) {
      return current;
    } else if (Math.abs(index + 1 - current) <= 2) {
      return index + 1;
    } else if (Math.abs(index + 1 - current) == 3) {
      if (index === 0) {
        return 1;
      } else if (index === total) {
        return total;
      }
      return 0;
    } else {
      if (index + 1 === total) {
        return total;
      }
      if (index + 1 === 1) {
        return 1;
      }
    }
    return -1;
  }).filter((page) => page > -1)
};


const Pager: React.FC<PagerProps> = ({ currentPage, total, className, setPage }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const goToPage = (page: number) => {
    setPage(page);
    const options = {
      pathname: '/repos/',
      search: `${createSearchParams({ ...Object.fromEntries(params), page: '' + page })}`,
    };
    navigate(options, { replace: true });
  }

  const prevHandler = (page: number) => {
    if (page > 1) {
      goToPage(page - 1);
    }
  }
  const pageHandler = (page: number): void => {
    goToPage(page);
  }

  const nextHandler = (page: number) => {
    if (page < total) {
      goToPage(page + 1);
    }
  }

  return (
    <div className={cx(styles.root, className)}>
      <Button onClick={() => prevHandler(currentPage)} className={styles.pageBtnPrev}><Icon width={32} height={32}>
        <path d="M20.62 26.5599L11.9267 17.8666C10.9 16.8399 10.9 15.1599 11.9267 14.1333L20.62 5.43994" stroke="#AFADB5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </Icon></Button>
      <div className={styles.pages}>
        {getPageNumbers(total, currentPage).map((btnNumber, index) => (
          btnNumber === 0 ? <Text className={styles.ellipsis} weight='bold' tag='div' key={index}>…</Text> : <Button onClick={() => pageHandler(btnNumber)} className={cx(styles.pageBtn, {
            'active': currentPage === btnNumber
          })} key={index}><Text>{btnNumber}</Text></Button>
        ))}
      </div>
      <Button onClick={() => nextHandler(currentPage)} className={styles.pageBtnNext}><Icon width={32} height={32}>
        <path d="M12.38 26.5599L21.0733 17.8666C22.1 16.8399 22.1 15.1599 21.0733 14.1333L12.38 5.43994" stroke="#151411" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </Icon></Button>
    </div >
  );
};

export default Pager;
