import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Method } from 'axios';
import axiosRequestApi from '../../utils/axiosRequest';
import utils from '../../utils/commonUtils';

import Grid from '../../components/List/Grid';

import { categoryMapper } from '../../constants/constantMapper';

import styles from './ProductList.scss';

const ProductList = (props: any) => {
  const [list, setList] = useState([]);

  const params = useParams<{
    category: string;
    page: string;
  }>();

  const history = useHistory();

  useEffect(() => {
    getList();
  }, [params?.category, params?.page])

  const getList = async (page: number = 1) => {
    try {
      const request = {
        method: 'GET' as Method,
        url: '/public/product/list',
        params: {
          page,
          heart: true,
          category: categoryMapper(params?.category),
        },
      }
      const response = await axiosRequestApi(request);
      if (response.status === 200) {
        setList(response.data.list);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const renderProductListItem = (params: any) => {
    return (
      <div className={styles.product_list_item}>
        <img src={params.img_src} onClick={() => history.push(`/product/detail/${params.id}`)} />
        <div className={styles.product_item_short_content}>
          <article className={styles.title}>{params.name}</article>
          <article
            className={styles.price}
            style={params.discount ? { color: '#d7d7d7' } : {}}
          >
            {utils.priceComma(String(params.price))}
          </article>
          {
            (params.discount > 0) && (
              <article className={styles.discount_price}>
                {`${params.discount}% ${utils.priceComma(utils.discountPrice(params.price, params.discount))}`}
              </article>
            )
          }
        </div>
      </div> 
    )
  }

  return (
    <section className={styles.product_list_container}>
      <Grid
        motionInlineStyle={{
          gridTemplateColumns: 'repeat(auto-fit, 270px)',
          gridTemplateRows: 'repeat(auto-fit, 370px)',
          gridAutoRows: 'minmax(250px, 270px)',      
        }}
      >
        {
          list?.map(item => renderProductListItem(item))
        }
      </Grid>
    </section>
  )
}

export default ProductList
