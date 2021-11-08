import { Method } from 'axios';
import React, { useEffect, useState } from 'react';
import axiosRequestApi from '../../utils/axiosRequest';
import styles from './Cart.scss';

type CartItem = {
  productName: string;
}

const Cart = (props: any) => {
  const [list, setList] = useState<Array<CartItem>>([]);
  const [isMount, setMount] = useState<boolean>(false);

  useEffect(() => {
    if (isMount) {
      getCart();
      setMount(true);
    }
  })

  const getCart = async (page: number = 1) => {
    try {
      const request = {
        method: 'GET' as Method,
        url: `/cart/${page}`,
      }
      const response = await axiosRequestApi(request);
      if (response.status === 200) {
        setList(response.data.list);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section className={styles.cart_container}>
      <article className={styles.title}>
        <h1>{'장바구니'}</h1>
      </article>
      <div className={styles.cart_list_wrap}>
        <table className={styles.cart_table}>
          <thead>
            <tr>
              <th>상품명</th>
            </tr>
          </thead>
          <tbody>
            {
              list?.map((item: CartItem) => (
                <tr className={styles.cart_item_row}>
                  <td>{item.productName}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Cart;