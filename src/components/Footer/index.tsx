import React from 'react';
import styles from './Footer.scss';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.footer_wrap}>
        <p>Made By Kim wontae - Front-end Engineer. 2021</p>
      </div>
    </footer>
  )
}

export default Footer;