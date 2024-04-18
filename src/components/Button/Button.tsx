import React from 'react';
import Loader from '../Loader';
import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, loading, className, disabled, ...attrs }) => {
  return (
    <button className={cx(
      'btn',
      className,
      {
        loading,
        disabled: (loading && disabled) || disabled
      },
    )} disabled={loading || disabled} {...attrs}>
      {loading && <Loader size="s" />}{children}
    </button>
  );
};

export default Button;
