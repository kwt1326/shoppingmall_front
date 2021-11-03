import React, { useState } from "react";
import InfiniteHorizonCardSlider from "../../components/InfiniteHorizonCardSlider";
import bannerItems from '../../constants/bannerItems';

import styles from './Home.scss';

const BannerList = (props: any) => {
  const [bannerlist, setBannerList] = useState([]);

  return (
    <section className={styles.list_banner}>
        <InfiniteHorizonCardSlider
          useBannerStyle={{ width: 990 }}
          usePaging
          useButton
          useAuto
        >
          {
            bannerItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                <img style={{ width: 'auto', height: '400px' }} src={item.src} />
              </div>
            ))
          }
        </InfiniteHorizonCardSlider>
      </section>
  )
}

export default BannerList;