import React from 'react';
import { motion } from 'framer-motion';

const GridItem = (props: any) => {
  return (
    <motion.div>
      {props.children}
    </motion.div>
  )
}

export default GridItem;