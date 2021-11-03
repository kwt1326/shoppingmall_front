import React, { useEffect, useState } from 'react';
import InfiniteHorizonCardSlider from '../../components/InfiniteHorizonCardSlider';
// import popularItems from '../../constants/popularItems';
import axiosRequestApi from '../../utils/axiosRequest';

import styles from './Home.scss';

const FamousList = (props: any) => {
  const [productlist, setProductList] = useState<{ img_src: string }[]>([]);

  useEffect(() => {
    getProductList();
  }, [])

  const getProductList = async () => {
    const response = await axiosRequestApi({
      url: '/public/product',
      method: 'GET',
      params: { page: 1, heart: true },
      data: {}
    })
    if (response.status === 200) {
      console.log(response)
      return setProductList(response.data?.list);
    }
    return console.error(response?.status);
  };

  return (
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
      {
        productlist.map((item, i) => (
          <div key={i} style={{ display: 'flex', flex: 1 }}>
            <img style={{ width: '100%', height: '100%' }} src={item.img_src} />
          </div>
        ))
      }
    </InfiniteHorizonCardSlider>
  </section>
  )
}

export default FamousList;