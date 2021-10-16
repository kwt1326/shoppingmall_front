import React from 'react';
import ThreeModelView from './threeModelView';

function ThreeView(params: any) {
  switch (params.type) {
    case 'MODEL_VIEW':
      return (<ThreeModelView {...params} />)
    default:
      return null;
  }
}

export default ThreeView;