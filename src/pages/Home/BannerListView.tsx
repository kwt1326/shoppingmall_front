import React, { useState } from "react";
import InfiniteHorizonCardSlider from "../../components/InfiniteHorizonCardSlider";
import bannerItems from '../../constants/bannerItems';

import styles from './Home.scss';

const BannerList = (props: any) => {
  const [bannerlist, setBannerList] = useState([]);

  return (
    <section className={styles.list_banner}>
        <InfiniteHorizonCardSlider
          useBannerStyle={{ width: 894 }}
          usePaging
          useButton
          useAuto
        >
          {
            bannerItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', flex: 1 }}>
                <img style={{ width: '100%', height: '100%' }} src={item.src} />
              </div>
            ))
          }
        </InfiniteHorizonCardSlider>
      </section>
  )
}

export default BannerList;