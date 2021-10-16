import React from 'react';
import Grid from '../../components/List/Grid';
import eventItems from '../../constants/gridEventItems';

import styles from './Home.scss';

const EventGridView = (props: any) => {
  return (
    <section className={styles.list_grid}>
    <Grid
      motionInlineStyle={{
        gridTemplateAreas: `
          'a a b'
          'a a f'
          'c d e'
        `,
        height: 1000,
      }}
    >
      {
        eventItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              flex: 1,
              backgroundColor: `#${Math.round(Math.random() * 900000)}`,
              gridArea: item.gridArea,
            }}
          >
            <img
              src={item.imgSrc}
              alt={`${item.id}_img`}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ))
      }
    </Grid>
  </section>
  )
}

export default EventGridView;