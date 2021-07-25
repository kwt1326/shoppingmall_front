import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { NextRouter, withRouter } from 'next/router';
import Grid from '../../../../components/List/Grid';
import axiosRequestApi from '../../../../utils/axiosRequest';
import styles from './list.module.scss';

type ListPageProps = {
  router: NextRouter;
  list: Array<any>;
}

const ListPage = (props: ListPageProps) => {
  return (
    <motion.div className={styles.container}>
      <Grid
        className={styles.grid_container}
        motionClassName={styles.grid}
      >
        {
          props.list.map((item, i) => {
            return (
              <Grid.GridItem
                option={{
                  style: { width: 100 },
                  animate: {
                    rotate: [ 15, 0 ],
                    opacity: [ 0, 1 ],
                    delay: 0.5 + i * 0.2,
                  },
                  whileHover: {
                    scale: 1.1,
                    rotateZ: -5,
                  }
                }}
              >
                <div>{item.name}</div>
                <div>{item.price}</div>
              </Grid.GridItem>
            )
          })
        }
      </Grid>
    </motion.div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const response = await axiosRequestApi({
  //   method: 'GET',
  //   url: '/ping'
  // })

  // if (response.status === 200) {
  //   return {
  //     props: {
  //       list: response.data,
  //     }
  //   }
  // }

  // mock
  const list = [];
  for (let i = 0; i < 10; ++i) {
    list.push({
      name: 'test1',
      price: Math.round(10000 * (Math.random() * 100)),
      discount: 30,
    })
  }
  return {
    props: { list }
  }

  return {
    props: {},
  }
}

export default withRouter(ListPage);