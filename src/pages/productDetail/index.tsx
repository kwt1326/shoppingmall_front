import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { InfoTypes } from '../../interface/productDetailTypes';
import axiosRequestApi from '../../utils/axiosRequest';
import BasicInfo from './BasicInfo';
import DetailView from './DetailView';
import styles from './ProductDetail.scss';

function ProductDetail(props: any) {
  const [info, setInfo] = useState<InfoTypes>();

  const params = useParams<{ id: string }>();

  useEffect(() => {
    getProductDetail();
  }, [params?.id]);

  const getProductDetail = async () => {
    try {
      const response = await axiosRequestApi({
        url: `/public/product/${params.id}`,
        method: 'GET',
        params: { page: 1, heart: true },
      })
      if (response.status === 200) {
        const info = response.data;
        return setInfo({
          id: info.id,
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
    } catch (error) {
      console.error(error);
    }
  };

  if (info) {
    return (
      <section className={styles.container}>
        <BasicInfo
          info={info}
          userId={props?.userId}
          history={props.history}
        />
        <DetailView info={info} />
      </section>
    )
  }
  return null;
}

const mapStateToProps = (state: {
  auth: { userId?: string, logging?: boolean };
}) => (state.auth);

export default connect(mapStateToProps)(withRouter(ProductDetail));