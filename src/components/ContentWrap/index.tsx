import React from 'react';
import styles from './ContentWrap.scss';

type ContentWrapProps = {
  children: any;
  className?: string;  
}

const ContentWrap = (props: ContentWrapProps) => {
  return (
    <section className={`${styles.container} ${props.className || ''}`}>
      <div className={styles.content_wrap}>
        {props.children}
      </div>
    </section>
  )
}

export default ContentWrap;