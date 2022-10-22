import React, { FC } from "react";
import styles from "./MissingPage.module.scss";

interface MissingPageProps {}

const MissingPage: FC<MissingPageProps> = () => (
    <div className={styles.MissingPage} data-testid="MissingPage">
        <h1 className="text-center text-5xl font-bold py-16">Wrong turn</h1>
    </div>
);

export default MissingPage;
