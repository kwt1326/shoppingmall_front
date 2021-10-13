import React, { useEffect, Suspense } from 'react';

type PropTypes = {

}

const isClient = typeof window !== 'undefined';

function ProductDetail(params: any) {
  useEffect(() => {
    
  })

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

export default ProductDetail;