import React, { useEffect, useState } from 'react';
import InfiniteHorizonCardSlider from '../../components/InfiniteHorizonCardSlider';
import axiosRequestApi from '../../utils/axiosRequest';

import styles from './Home.scss';

const serviceIcon = require('../../assets/images/service_support_icon.png').default;

function Home(params: any) {
  const [bannerlist, setBannerList] = useState([]);
  const [productlist, setProductList] = useState([]);

  useEffect(() => {
    // getBannerList();
  })

  const getBannerList = async () => {
    const response = await axiosRequestApi({
      url: '/public/ping',
      method: 'GET',
      params: { page: 1, },
      data: {}
    })
    if (response.status === 200) {
      return setBannerList(response.data?.list);
    }
    return console.error(response?.status);
  };

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
      {/* BANNER SECTION */}
      <section>
        <InfiniteHorizonCardSlider
          useBannerStyle={{ width: 894 }}
          usePaging
          useButton
          useAuto
        >
          <div style={{ display: 'flex', flex: 1, backgroundColor: 'purple' }}></div>
          <div style={{ display: 'flex', flex: 1, backgroundColor: 'skyblue' }}></div>
          <div style={{ display: 'flex', flex: 1, backgroundColor: 'green' }}></div>
        </InfiniteHorizonCardSlider>
      </section>
      {/* FAMOUS LIST SECTION */}
      <section className={styles.list_popular}>
        <article>HIGHLIGHTS</article>
        <InfiniteHorizonCardSlider
          usePaging
          useScale
          useAuto
          autoTimerSec={3}
          cardWidth={280}
          containerStyle={{ width: '100%', height: '400px' }}
        >
          <div style={{ display: 'flex', flex: 1, backgroundColor: 'white' }}></div>
          <div style={{ display: 'flex', flex: 1, backgroundColor: 'white' }}></div>
          <div style={{ display: 'flex', flex: 1, backgroundColor: 'white' }}></div>
        </InfiniteHorizonCardSlider>
      </section>
      {renderServices()}
    </section>
  )
}

export default Home;