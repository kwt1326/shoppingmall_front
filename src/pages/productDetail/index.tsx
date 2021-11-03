import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosRequestApi from '../../utils/axiosRequest';
import utils from '../../utils/commonUtils';
import styles from './ProductDetail.scss';

type InfoTypes = {
  name: string;
  price: number;
  stock: number;
  heart: number;
  saleable: boolean;
  discount?: number;
  imgsrc?: string;
  modelsrc?: string;
  detailsrc?: string;
}

const isClient = typeof window !== 'undefined';

function ProductDetail(props: any) {
  const [info, setInfo] = useState<InfoTypes>();

  const params = useParams<{ id: string }>();

  useEffect(() => {
    getProductDetail();
  }, [])

  const getProductDetail = async () => {
    const response = await axiosRequestApi({
      url: `/public/product/${params.id}`,
      method: 'GET',
      params: { page: 1, heart: true },
    })
    if (response.status === 200) {
      const info = response.data;
      return setInfo({
        name: info?.name,
        price: info?.price,
        stock: info?.stock,
        heart: info?.heart,
        saleable: info?.saleable,
        discount: info?.discount,
        imgsrc: info?.productImgSlug,
        modelsrc: info?.productModelSlug,
        detailsrc: info?.productDetailImgSlug,
      });
    }
    return console.error(response?.status);
  };

  const renderModelView = async () => {
    if (isClient) {
      const ThreeView = React.lazy(() => import('../../components/ThreeView'));
      return (
        <Suspense fallback={<div>Loading View...</div>}>
          {/* <ThreeView
          type={'MODEL_VIEW'}
          modelPath={'smol-ame-bee/source/AmeBeeSF.fbx'}
          modelExt={'fbx'}
        /> */}
        </Suspense>
      )
    }
    return null;
  }

  if (info !== undefined) {
    return (
      <section className={styles.container}>
        <section className={styles.product_basic_info}>
          <div className={styles.product_main_img}>
            <img src={info.imgsrc} alt="product_img" />
          </div>
          <div className={styles.product_info_content}>
            <article className={styles.product_name}>
              {info.name || 'No title'}
            </article>
            {
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
            }
            <article>
              <span>남은 수량 : </span>
              <span>{info.stock}</span>
            </article>
            <div className={info.saleable ? styles.active_btn : styles.disabled_btn}>
              {info.saleable ? "Buy now" : "Sold out"}
            </div>
          </div>
        </section>
        <div className={styles.product_detail}>
          <article className={styles.product_detail_title}>
            <h2>상품 상세 설명</h2>
          </article>
          <div className={styles.product_detail_img_wrap}>
            <img src={info.detailsrc} alt="product_detail" />
          </div>
        </div>
      </section>
    )
  }
  return null;
}

export default ProductDetail;