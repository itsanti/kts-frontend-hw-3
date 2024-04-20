import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import styles from './checkbox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ className, onChange, value, checked, id = 'checkbox', ...attrs }) => {
  return (
    <>
      <input className={styles.checkbox}
        type="checkbox"
        id={id}
        value={value}
        checked={checked}
        onChange={(ev) => onChange(ev.target.checked)}
        {...attrs}
      /><label className={className} htmlFor={id}><CheckIcon className={styles.checked} width={40} height={40} /></label>
    </>
  );
};

export default CheckBox;
