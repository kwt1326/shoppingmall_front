import React from 'react';
import InfiniteHorizonCardSlider from '../../components/InfiniteHorizonCardSlider';

import styles from './Home.scss';

export default function Home(params: any) {
  return (
    <section className={styles.container}>
      <InfiniteHorizonCardSlider
        useBannerStyle={{ width: 894 }}
        usePaging
        useButton
        useAuto
      >
        <div style={{ display: 'flex', flex: 1, backgroundColor: 'purple' }}>TEST</div>
        <div style={{ display: 'flex', flex: 1, backgroundColor: 'skyblue' }}>TEST2</div>
        <div style={{ display: 'flex', flex: 1, backgroundColor: 'green' }}>TEST3</div>
      </InfiniteHorizonCardSlider>
    </section>
  )
}