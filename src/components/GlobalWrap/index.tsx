import React from 'react';
import styles from './GlobalWrap.scss';

export default function GlobalWrap(props: { children: React.ReactNode }) {
  return (
    <section className={styles.container}>
      <div className={styles.container_child}>{props.children}</div>
    </section>
    )
}
