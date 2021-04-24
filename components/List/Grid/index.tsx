import React from 'react';
import styles from './Footer.module.scss';

type GridProps = {
  children: Array<any>;
}

const Grid = (props: GridProps) => {
  return (
    <div className={styles.container}>
      {
        props.children.map((item) => {
          
        })
      }
    </div>
  )
}

export default Grid;