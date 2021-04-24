import React, { useState } from 'react';
import { NextRouter, withRouter } from 'next/router';
import { headerMenuItems } from '../../constants/headerItems';
import styles from './Header.module.scss';

const Header = (props: { router: NextRouter }) => {
  const [curLeftFocus, setLeftFocus] = useState(-1)
  const [curRightFocus, setRightFocus] = useState(-1)

  return (
    <header className={styles.container}>
      <div className={styles.header_top}>
        <div className={styles.title_wrap} onClick={() => props.router.push('/')}>
          <p>{"Fashion & Passion Shop"}</p>
        </div>
        <div className={styles.top_right_items}>
          {
            headerMenuItems.right.map((item, i) => {
              return (
                <div
                  key={i}
                  className={curLeftFocus === i ? styles.item_focus : styles.item}
                  onMouseEnter={() => setLeftFocus(i)}
                  onMouseLeave={() => setLeftFocus(-1)}
                  onClick={() => props.router.push(item.path)}
                >
                  <h5>{item.name}</h5>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={styles.header_middle}>
        <div className={styles.middle_left_items}>
          <div className={styles.left_menu_items}>
            {
              headerMenuItems.left.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={curRightFocus === i ? styles.item_focus : styles.item}
                    onMouseEnter={() => setRightFocus(i)}
                    onMouseLeave={() => setRightFocus(-1)}
                    onClick={() => props.router.push(item.path)}
                  >
                    <h5>{item.name}</h5>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default withRouter(Header);