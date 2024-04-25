import * as React from 'react'
import Icon, { IconProps, COLOR_MAP } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({ color = 'notset', ...attrs }) => {
    return (
        <Icon {...attrs} viewBox='0 0 24 24'>
            <path d="M4 11.6129L9.87755 18L20 7" stroke={COLOR_MAP[color]} strokeWidth="2" />
        </Icon>
    );
}

export default CheckIcon;
