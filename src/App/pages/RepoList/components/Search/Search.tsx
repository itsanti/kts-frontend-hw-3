import React, { useState } from "react";
import Button from 'components/Button';
import Input from "components/Input";
import Icon from 'components/icons/Icon';
import styles from './Search.module.scss';

interface SearchProps {
    className: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
    const [valueSearh, setvalueSearh] = useState('');
    return (
        <div className={className}>
            <Input className={styles.searchInput} onChange={setvalueSearh} value={valueSearh} placeholder='Enter organization name' />
            <Button>
                <Icon>
                    <g clipPath="url(#clip0_508_313)">
                        <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_508_313">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </Icon>
            </Button>
        </div>
    );
}

export default Search;