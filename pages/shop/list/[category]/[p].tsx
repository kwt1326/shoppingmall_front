import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { NextRouter, withRouter } from 'next/router';
import axiosRequestApi from '../../../../utils/axiosRequest';
import styles from './list.module.scss';

type ListPageProps = {
  router: NextRouter;
  list: Array<any>;
}

const ListPage = (props: ListPageProps) => {
  return (
    <div className={styles.container}>
      {
        props.list.map((item) => {
          return (
            <div>{item}</div>
          )
        })
      }
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await axiosRequestApi({
    method: 'GET',
    url: '/ping'
  })

  if (response.status === 200) {
    return {
      props: {
        list: response.data,
      }
    }
  }

  return {
    props: {},
  }
}

export default withRouter(ListPage);