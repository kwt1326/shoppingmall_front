import React, { useEffect, useState } from 'react';
import BannerListView from './BannerListView';
import FamousList from './FamousList';
import EventGridView from './EventGridView';
import axiosRequestApi from '../../utils/axiosRequest';

import styles from './Home.scss';

const serviceIcon = require('../../assets/images/service_support_icon.png').default;

function Home(params: any) {
  const renderServices = () => {
    return (
      <section className={styles.service}>
        <div className={styles.img_block}>
          <img src={serviceIcon}></img>
        </div>
        <div className={styles.content_block}>
          <ul>
            <li><article className={styles.contact}>{'(010)7933-1326'}</article></li>
            <li><article>{'Contact Time : 09:00 ~ 18:00'}</article></li>
            <li><article>{`This shopping mall is not intended to generate revenue. all for my portfolio.`}</article></li>
          </ul>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.list_container}>
      <BannerListView />
      <FamousList />
      <EventGridView />
      {renderServices()}
    </section>
  )
}

export default Home;