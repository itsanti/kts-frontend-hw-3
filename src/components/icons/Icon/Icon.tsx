import cn from 'classnames'
import * as React from 'react'
import styles from './icon.module.scss'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
    width?: number;
    height?: number;
};

export const COLOR_MAP: { [key: string]: string } = {
    'notset': 'black',
    'primary': '#000000',
    'secondary': '#AFADB5',
    'accent': '#518581',
}

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
    color = "notset",
    width = 24,
    height = 24,
    className,
    children,
    ...attrs
}) => {
    return (
        <svg
            className={cn(className, styles.icon)}
            width={width}
            height={height}
            color={color}
            preserveAspectRatio='xMidYMid meet'
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...attrs}
        >
            {children}
        </svg>
    );
};

export default Icon;
