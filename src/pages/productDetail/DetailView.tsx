import React, { Suspense } from 'react';
import { InfoTypes } from '../../interface/productDetailTypes';
import { ociObjStorageUrl } from '../../config';

import styles from './ProductDetail.scss';

const isClient = typeof window !== 'undefined';

const DetailView = ({ info }: { info: InfoTypes }) => {
  const RenderModelView = () => {
    if (isClient) {
      const ThreeView = React.lazy(() => import('../../components/ThreeView'));
      return (
        <Suspense fallback={<div>모델 뷰를 만드는 중입니다...</div>}>
          <ThreeView
            type={'MODEL_VIEW'}
            url={`${ociObjStorageUrl}${info?.modelsrc}`}
          />
        </Suspense>
      )
    }
    return null;
  }

  return (
    <div className={styles.product_detail}>
      <article className={styles.product_detail_title}>
        <h2>{info.modelsrc ? '3D 미리보기' : '상품 상세 설명'}</h2>
      </article>
      {
        !!info.modelsrc ?
          <RenderModelView /> : (
            <div className={styles.product_detail_img_wrap}>
              <img src={info.detailsrc} alt="product_detail" />
            </div>
          )
      }
    </div>
  )
}

export default DetailView;