import React from 'react';
import readmeHtml from 'config/mocks/readme';
import styles from './RepoPage.module.scss';


const RepoPage: React.FC = () => {
    return (
        <section className={styles.root}>
            <div dangerouslySetInnerHTML={{ __html: readmeHtml }} />
        </section>
    );
};

export default RepoPage;