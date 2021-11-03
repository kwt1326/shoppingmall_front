import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { headerMenuItems } from '../../constants/headerItems';
import styles from './Header.scss';

const Header: React.FC<RouteComponentProps> = props => {
  const [curLeftFocus, setLeftFocus] = useState(-1)
  const [curRightFocus, setRightFocus] = useState(-1)

  return (
    <header className={styles.container}>
      {/* User Menu */}
      <div className={styles.header_top}>
        <div className={styles.title_wrap} onClick={() => props.history.push('/')}>
          <p>{"The Goods Shop"}</p>
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
                  onClick={() => props.history.push(item.path)}
                >
                  <h5>{item.name}</h5>
                </div>
              )
            })
          }
        </div>
      </div>
      {/* Category Menu */}
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
                    onClick={() => props.history.push(item.path)}
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