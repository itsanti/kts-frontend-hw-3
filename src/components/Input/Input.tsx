import React from 'react';
import classNames from 'classnames/bind';
import styles from './input.module.scss';

const cx = classNames.bind(styles);

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, placeholder, className, ...attrs }, ref) => {
    return (
      <div className={cx(className, styles.inputWrapper)}>
        <input placeholder={placeholder} value={value} ref={ref} type="text" onChange={(ev) => onChange(ev.target.value)} {...attrs} />{afterSlot}
      </div>
    );
  });

export default Input;
