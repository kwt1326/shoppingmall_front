import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cookies from 'js-cookie';
import requestUtils from '../../utils/requestUtils';
import { userAuth } from '../../store/actions';
import { headerMenuItems } from '../../constants/headerItems';

import styles from './Header.scss';

type PropsType = RouteComponentProps & { userId?: string; setUserInfo?: Function; clearStore?: Function }

const Header: React.FC<PropsType> = props => {
  const [curLeftFocus, setLeftFocus] = useState(-1)
  const [curRightFocus, setRightFocus] = useState(-1)

  useEffect(() => {
    if (!props?.userId) {
      props?.setUserInfo && props.setUserInfo();
    }
  }, [props?.userId])

  const logout = () => {
    const confirmResult = confirm('로그아웃 하시겠습니까?');
    if (confirmResult) {
      cookies.remove('shoppingmall-cookie');
      props?.clearStore && props?.clearStore();
      props?.history.replace('/');
    }
  }

  return (
    <header className={styles.container}>
      {/* User Menu */}
      <div className={styles.header_top}>
        <div className={styles.title_wrap} onClick={() => props.history.push('/')}>
          <p>{"The Goods Shop"}</p>
        </div>
        <div className={styles.top_right_items}>
          {
            headerMenuItems({ history: props.history, logged: !!props?.userId }).right.map((item, i) => {
              return (
                <div
                  key={i}
                  className={curLeftFocus === i ? styles.item_focus : styles.item}
                  onMouseEnter={() => setLeftFocus(i)}
                  onMouseLeave={() => setLeftFocus(-1)}
                  onClick={() => item.name === 'LOGOUT' ? logout() : props.history.push(item.path)}
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
              headerMenuItems({ history: props.history, logged: !!props?.userId }).left.map((item, i) => {
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

const mapStateToProps = (state: { auth: any }) => ({ userId: state.auth.userId })

const mapDispatchToProps = (dispatch: (arg0: { type: string; isOpen?: boolean; modalComponent?: JSX.Element }) => any) => ({
  setUserInfo: async () => dispatch(userAuth(await requestUtils.getUserInfo())),
  clearUserInfo: async () => dispatch(userAuth({
    userId: undefined,
    username: undefined,
    realname: undefined,
    email: undefined,
    contact: undefined,
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));