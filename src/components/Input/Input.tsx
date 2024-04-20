/* eslint-disable react/display-name */
import classNames from 'classnames/bind';
import React, { forwardRef, useCallback } from 'react';
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

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, placeholder, className, ...attrs }, ref) => {
    const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>): void => {
      onChange(ev.target.value);
    }, [onChange]);
    return (
      <div className={cx(className, styles.inputWrapper)}>
        <input placeholder={placeholder} value={value} ref={ref} type="text" onChange={handleChange} {...attrs} />{afterSlot}
      </div>
    );
  });

export default Input;
