import React from 'react';
import { motion } from 'framer-motion';
import styles from './Grid.scss';

type GridProps = {
  children: Array<any>;
  className?: string;
  motionClassName?: string;
  inlineStyle?: React.CSSProperties;
  motionInlineStyle?: React.CSSProperties;
}

const Grid = (props: GridProps) => {
  console.log(props.motionInlineStyle)
  const gridDefaultStyle = {
    gridTemplateColumns: 'repeat(auto-fit, 50%)',
    gridTemplateRows: 'repeat(auto-fit, auto)',
  }
  return (
    <div
      className={`${styles.container} ${props.className || ''}`}
      style={props.inlineStyle || {}}
    >
      <motion.div
        className={`${styles.grid} ${props.motionClassName || ''}`}
        style={props.motionInlineStyle || gridDefaultStyle}    
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

export default Grid;