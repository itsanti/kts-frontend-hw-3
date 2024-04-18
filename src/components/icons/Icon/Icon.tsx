import * as React from 'react'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
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
    viewBox = '0 0 24 24',
    className,
    children,
    ...attrs
}) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox={viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...attrs}
        >
            {children}
        </svg>
    );
};

export default Icon;
