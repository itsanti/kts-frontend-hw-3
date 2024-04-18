import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const filteredOptions = (options: Option[], inputValue: string): Option[] => {
  if (inputValue.length) {
    return options.filter(option => option.value.includes(inputValue));
  }
  return options;
}

const OptionItem: React.FC<{ value: Option[]; option: Option; onClick: (key: string) => void; }> = ({ value, option, onClick }) => {
  const [isSelected, setIsSelected] = useState(value.findIndex((item) => option.key === item.key) > -1);
  const onClickHandler = (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    ev.stopPropagation();
    setIsSelected(!isSelected);
    onClick(option.key);
  }
  return (
    <li className={cx({
      'option-active': isSelected
    })} onClick={(ev) => onClickHandler(ev)}>{option.value}</li>
  );
}

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, getTitle, disabled, ...attrs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handle = (ev: Event) => {
      if (ev.target !== refInput.current) {
        setIsOpen(false);
        onChange([]);
      }
    };
    document.addEventListener('click', handle, false);
    return () => {
      document.removeEventListener('click', handle);
    }
  }, [onChange]);

  const handleCange = () => {
    if (refInput.current) {
      setInputValue(refInput.current.value);

    }
  }
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    setIsOpen(true);
    onChange([]);
  }

  const processElement = (key: string): void => {
    const index = value.findIndex(option => option.key === key);
    if (index > -1) {
      onChange(options.filter((option) => option.key !== key));
    } else {
      onChange([...value, options.filter((option) => option.key === key).at(0) as Option]);
    }
  }

  return (
    <div className={cx(styles.root, className)}>
      <Input ref={refInput} value={value.length ? getTitle(value) : inputValue} placeholder={getTitle(value)}
        onChange={handleCange}
        onFocus={handleFocus}
        disabled={disabled}
        className={cx(className, {
          'emptyOptions': !value.length
        })}
        afterSlot={<ArrowDownIcon color="secondary" />}
        {...attrs} />
      {isOpen && !disabled && <ul className={styles.options}>
        {filteredOptions(options, inputValue).map((option) => <OptionItem value={value} onClick={processElement} option={option} key={option.key} />)}
      </ul>}
    </div>
  );
};

export default MultiDropdown;
