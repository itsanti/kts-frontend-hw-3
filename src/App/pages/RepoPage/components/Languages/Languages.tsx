import axios from "axios";
import React, { useState, useEffect } from "react";
import Text from "components/Text";
import { API_TOCKEN } from "config/constants";
import colors from "./github-colors";
import styles from './Languages.module.scss';

interface Colors {
    [key: string]: {
        color: string | null;
        url: string;
    }
}

interface PercentColors { [key: string]: string }
interface PercentColorsNumber { [key: string]: number }

const calculate = (languages: PercentColorsNumber): PercentColors => {
    const result: PercentColors = {};
    const total = Object.values(languages).reduce((acc, count) => {
        return acc + count
    }, 0);
    Object.keys(languages).map((lang) => {
        result[lang] = `${(languages[lang] / total * 100).toFixed(1)}%`;
    });
    return result;
}

const Languages: React.FC<{ langUrl: string; }> = ({ langUrl }) => {
    const [languages, setLanguages] = useState<PercentColorsNumber | null>(null);
    useEffect(() => {
        axios.get<PercentColorsNumber>(langUrl, {
            headers: { 'Authorization': `Bearer ${API_TOCKEN}` }
        }).then(res => {
            setLanguages(res.data);
        });
    }, [langUrl]);

    if (!languages) {
        return null;
    }

    const percentLangs = calculate(languages);
    return (
        <div className={styles.root}>
            <Text view="p-18" className={styles.header}>Languages</Text>
            <div className={styles.progress}>
                {Object.keys(percentLangs).map((lang, index) => (
                    <span key={index} style={{
                        backgroundColor: (colors as Colors)[lang].color ?? '',
                        width: percentLangs[lang],
                        height: '100%'
                    }}></span>
                ))}
            </div>
            <ul className={styles.list}>
                {Object.keys(percentLangs).map((lang, index) => (
                    <li key={index}><i className={styles.boollet} style={{
                        backgroundColor: (colors as Colors)[lang].color ?? ''
                    }} />{lang} <span>{percentLangs[lang]}</span></li>
                ))}
            </ul>
        </div>
    );
}

export default Languages;