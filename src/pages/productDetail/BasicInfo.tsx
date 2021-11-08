import React, { useState } from 'react';
import { InfoTypes } from '../../interface/productDetailTypes';
import axiosRequestApi from '../../utils/axiosRequest';
import utils from '../../utils/commonUtils';

import styles from './ProductDetail.scss';

const BasicInfo = ({ info, userId, history }: {
  info: InfoTypes,
  userId: string,
  history: any
}) => {
  const [count, setCount] = useState<number>(0);

  const addCart = async (id: string) => {
    if (!userId) {
      alert("장바구니 추가는 로그인 상태에서만 가능합니다.")
      history.push('/login');
    }
    try {
      const response = await axiosRequestApi({
        url: '/cart',
        method: 'POST',
        params: {
          productId: id,
          quantity: count,
        },
      })
      if (response.status === 200) {
        alert('장바구니에 추가되었습니다.');
      }
      return console.error(response?.status);      
    } catch (error) {
      console.error(error);
    }
  }

  const renderPrice = (info: InfoTypes) => {
    return (
      info.discount === 0 ? (
        <div className={styles.product_prices_no_discount}>
          <article>{info.price}</article>
        </div>
      ) : (
        <div className={styles.product_prices}>
          <article>{info.price}</article>
          <article>
            <span>{info.discount}%</span>&nbsp;
            <span>{utils.discountPrice(info.price, info.discount || 0)}</span>
          </article>
        </div>
      )
    )
  }

  return (
    <section className={styles.product_basic_info}>
      <div className={styles.product_main_img}>
        <img src={info.imgsrc} alt="product_img" />
      </div>
      <div className={styles.product_info_content}>
        <article className={styles.product_name}>
          {info.name || 'No title'}
        </article>
        {renderPrice(info)}
        <article>
          <span>남은 수량 : </span>
          <span>{info.stock ?? 0}</span>
        </article>
        <article>
          <span>구매 수량 : </span>
          <span>
            <input
              className={styles.count_input}
              type="number"
              onChange={e => setCount(Number(e.target.value))}
              value={count ?? 0}
            />
          </span>
        </article>
        <div className={styles.button_wrap}>
          {
            info.saleable && (
              <button
                className={styles.add_cart_btn}
                onClick={() => addCart(info.id)}
              >
                {"Add cart"}
              </button>
            )
          }
          <button className={info.saleable ? styles.active_btn : styles.disabled_btn}>
            {info.saleable ? "Buy now" : "Sold out"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default BasicInfo;