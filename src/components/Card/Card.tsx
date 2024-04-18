import React from 'react';
import classNames from 'classnames/bind';
import styles from './card.module.scss';
import Text from '../Text';

const cx = classNames.bind(styles);

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot }) => {
    return (
        <article onClick={onClick} className={cx(className, 'card')}>
            <img src={image} alt="" />
            <div className={styles.cardWrapper}>
                {captionSlot && <div className={styles.captionSlot}>{captionSlot}</div>}
                <Text className={styles.title} weight='medium' view='p-20' maxLines={2} color='primary'>{title}</Text>
                <Text view='p-16' maxLines={3} color='secondary'>{subtitle}</Text>
                {(contentSlot || actionSlot) && <footer>
                    {contentSlot}{actionSlot}
                </footer>}
            </div>
        </article>
    );
};

export default Card;
