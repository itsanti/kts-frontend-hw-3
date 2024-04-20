import React from 'react';
import Icon from 'components/icons/Icon';
import styles from './AppHeader.module.scss';

const AppHeader: React.FC = () => {
    return (
        <div className={styles.rootWrapper}>
            <header className={styles.root}>
                <div className={styles.logo}>
                    <Icon width={32} height={32}>
                        <g clipPath="url(#clip0_1206_244)">
                            <path d="M16 0C24.84 0 32 7.16 32 16C31.9991 19.3524 30.947 22.6201 28.9917 25.3432C27.0364 28.0664 24.2763 30.1077 21.1 31.18C20.3 31.34 20 30.84 20 30.42C20 29.88 20.02 28.16 20.02 26.02C20.02 24.52 19.52 23.56 18.94 23.06C22.5 22.66 26.24 21.3 26.24 15.16C26.24 13.4 25.62 11.98 24.6 10.86C24.76 10.46 25.32 8.82 24.44 6.62C24.44 6.62 23.1 6.18 20.04 8.26C18.76 7.9 17.4 7.72 16.04 7.72C14.68 7.72 13.32 7.9 12.04 8.26C8.98 6.2 7.64 6.62 7.64 6.62C6.76 8.82 7.32 10.46 7.48 10.86C6.46 11.98 5.84 13.42 5.84 15.16C5.84 21.28 9.56 22.66 13.12 23.06C12.66 23.46 12.24 24.16 12.1 25.2C11.18 25.62 8.88 26.3 7.44 23.88C7.14 23.4 6.24 22.22 4.98 22.24C3.64 22.26 4.44 23 5 23.3C5.68 23.68 6.46 25.1 6.64 25.56C6.96 26.46 8 28.18 12.02 27.44C12.02 28.78 12.04 30.04 12.04 30.42C12.04 30.84 11.74 31.32 10.94 31.18C7.75328 30.1193 4.98147 28.082 3.01778 25.3573C1.05409 22.6325 -0.00176096 19.3586 2.20462e-06 16C2.20462e-06 7.16 7.16 0 16 0Z" fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1206_244">
                                <rect width="32" height="32" fill="white" />
                            </clipPath>
                        </defs>
                    </Icon>
                    <span>GitHub Client</span>
                </div>
                <div className={styles.profile}>
                    <Icon width={32} height={32}>
                        <circle cx="17" cy="17" r="16" fill="url(#pattern0_1206_246)" stroke="#ECEBEB" />
                        <defs>
                            <pattern id="pattern0_1206_246" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use href="#image0_1206_246" transform="scale(0.00238095)" />
                            </pattern>
                            <image id="image0_1206_246" width="420" height="420" href="data:image/png;base64,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HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOOQ6kEBPwSJekBpio7HpL/KoBDjkOpBAT8EiXpAaYqOx6S/yqAQ45DqQQE/BIl6QGmKjsekv8qgEOO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" />
                        </defs>
                    </Icon>
                </div>
            </header >
        </div >
    );
};

export default AppHeader;