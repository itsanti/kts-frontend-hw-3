
import React from 'react';
import styles from './ButtonBack.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/icons/Icon';

const ButtonBack: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Link to={'..'} onClick={(e) => {
      e.preventDefault();
      navigate(-1);
    }}>
      <Icon width={32} height={32}>
        <path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44" stroke="#1F883D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </Icon>
    </Link>
  );
};

export default ButtonBack;
