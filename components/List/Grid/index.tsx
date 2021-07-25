import React from 'react';
import { motion } from 'framer-motion';
import styles from './Grid.module.scss';

type GridProps = {
  children: Array<any>;
  className?: string;
  motionClassName?: string;
  inlineStyle?: React.CSSProperties;
  motionInlineStyle?: React.CSSProperties;
}

const Grid = (props: GridProps) => {
  return (
    <div
      className={`${styles.container} ${props.className || ''}`}
      style={props.inlineStyle || {}}
    >
      <motion.div
        className={`${styles.grid} ${props.motionClassName || ''}`}
        style={props.motionInlineStyle || {}}      
        animate={{
          translateY: [ 70, 0 ],
          opacity: [ 0, 1 ],
        }}
        transition={{ duration: 1 }}
      >
        {props.children}
      </motion.div>
    </div>
  )
}

const GridItem = (props: any) => {
  return (
    <motion.div
      className={`${styles.grid_item} ${props.className}`}
      {...props.option}
    >
      {props.children}
    </motion.div>
  )
}

Grid.GridItem = GridItem;

export default Grid;