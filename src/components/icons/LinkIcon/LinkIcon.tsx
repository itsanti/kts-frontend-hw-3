import * as React from 'react'
import Icon, { IconProps, COLOR_MAP } from '../Icon';

const LinkIcon: React.FC<IconProps> = ({ color = 'notset', ...attrs }) => {
    COLOR_MAP['notset'] = "black";
    return (
        <Icon {...attrs} width={16} height={17}>
            <path d="M9.86174 11.4025C8.95983 11.4025 8.04857 11.0452 7.35996 10.3407C7.06914 10.0529 7.06914 9.57671 7.35996 9.28906C7.64123 9.00126 8.09691 9.00126 8.38772 9.28906C8.79509 9.70591 9.3186 9.91412 9.86161 9.91412C10.3951 9.91412 10.9186 9.70577 11.3355 9.28906L13.9343 6.62978C14.3417 6.20317 14.5452 5.66734 14.5452 5.12159C14.5452 4.56594 14.3415 4.03012 13.9343 3.6134C13.5269 3.19655 12.9938 2.98834 12.4604 2.98834C11.927 2.98834 11.3938 3.19669 10.9865 3.6134L9.68708 4.94309C9.39625 5.2309 8.94043 5.2309 8.65932 4.94309C8.3685 4.6455 8.3685 4.17907 8.65932 3.89142L9.95877 2.56173C10.6473 1.8473 11.5588 1.5 12.4606 1.5C13.3622 1.5 14.2737 1.8473 14.9623 2.56173C15.6508 3.26623 15.9999 4.18903 15.9999 5.12172C15.9999 6.04462 15.6508 6.97708 14.9623 7.68171L12.3635 10.3406C11.6749 11.0452 10.7634 11.4025 9.86174 11.4025Z" fill={COLOR_MAP[color]} />
            <path d="M8.63995 6.65926C8.92121 6.94707 8.92121 7.42328 8.63995 7.71093C8.35868 8.00853 7.8933 8.00853 7.61219 7.71093C7.20482 7.29409 6.67164 7.08587 6.1383 7.08587C5.60486 7.08587 5.07165 7.29423 4.6644 7.71093L2.06559 10.3702C1.65823 10.7968 1.45475 11.3327 1.45475 11.8784C1.45475 12.4341 1.65836 12.9699 2.06559 13.3866C2.47296 13.8034 2.99648 14.0117 3.53949 14.0117C4.07292 14.0117 4.59644 13.8033 5.01338 13.3866L6.31283 12.0569C6.5941 11.7691 7.04978 11.7691 7.34059 12.0569C7.62185 12.3545 7.62185 12.8209 7.34059 13.1086L6.04114 14.4383C5.35266 15.1527 4.44114 15.5 3.53936 15.5C2.62788 15.5 1.72619 15.1527 1.03758 14.4383C0.349105 13.7338 0 12.811 0 11.8783C0 10.9554 0.339405 10.0229 1.03758 9.31828L3.63639 6.65926C4.32487 5.95476 5.23639 5.59753 6.13817 5.59753C7.03986 5.59741 7.9516 5.95463 8.63995 6.65926Z" fill={COLOR_MAP[color]} />
        </Icon>
    );
}

export default LinkIcon;
