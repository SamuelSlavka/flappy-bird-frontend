import React, { FC, useEffect } from "react";
import styles from "./Time.module.scss";

interface TimeProps {}

const Time: FC<TimeProps> = () => {
  const [today, setDate] = React.useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.TimeContainer} data-testid="Time">
      <section className={styles.TimeItems}>
        {String(today.getDate()).padStart(2, '0')}-
        {String(today.getMonth()+1).padStart(2, '0')}-
        {String(today.getFullYear())}
        <br />
        {String(today.getHours())}:
        {String(today.getMinutes()).padStart(2, '0')}:
        {String(today.getSeconds()).padStart(2, '0')}
      </section>
    </div>
  );
};

export default Time;
