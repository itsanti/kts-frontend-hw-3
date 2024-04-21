import cn from 'classnames';
import React from 'react';
import Text from 'components/Text';
import Loader from '../Loader';
import styles from './button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, className, disabled, ...attrs }) => {
  return (
    <button className={cn(
      styles.btn,
      className,
      {
        loading,
        disabled: (loading && disabled) || disabled
      },
    )} disabled={loading || disabled} {...attrs}>
      {loading && <Loader size="s" />}<Text tag="span" view='button'>{children}</Text>
    </button>
  );
};

export default Button;
