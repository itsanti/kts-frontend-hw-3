import * as React from 'react'
import classNames from 'classnames/bind';
import styles from './text.module.scss';

const cx = classNames.bind(styles);

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Tag = ({ tag, children, ...props }: TextProps & { style: any }) => (
    React.createElement(tag as string, props, children)
);

const maxLinesGenerator = (n: number) => (
    {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: `${n}`,
    }
);

const Text: React.FC<TextProps> = ({ tag, children, className, view, weight, color, maxLines }) => {
    return (
        <Tag style={maxLines ? maxLinesGenerator(maxLines) : {}} tag={tag ? tag : 'p'} className={cx(
            className, { [`${view}`]: view, [`${weight}`]: weight, [`${color}`]: color }
        )}>
            {children}
        </Tag>
    );
}

export default Text;
