import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import styles from './ThreeView.scss';

function ThreeModelView(props: any) {
  const containerRef = useRef(null);

  let container: HTMLDivElement | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let renderer: THREE.WebGLRenderer | null = null;

  const scene = new THREE.Scene();
  const stats = Stats();

  const render = () => {
    const modelPath = props.modelPath;
    const splitPath = modelPath?.split('.');
    const extension = splitPath[splitPath?.length - 1];

    if (containerRef?.current) {
      container = containerRef.current as unknown as HTMLDivElement;

      camera = new THREE.PerspectiveCamera(25, container.offsetWidth / container.offsetHeight, 1, 3000);

      scene.background = new THREE.Color('ffffff');

      const light = new THREE.DirectionalLight(0xffffff);
      light.position.set(0, 200, 0);
      light.castShadow = true;

      const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
      let loader = null;

      if (extension === 'gltf') {
        loader = new GLTFLoader();
        const url = ''; // require(`../../assets/models/${modelPath}`).default;

        loader.load(url, (gltf) => {
          scene.add(gltf.scene);
        });
      }

      scene.add(light);
      scene.add(grid);

      camera.position.set(300, 150, 300);
      camera.rotation.set(0, 500, 0);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.shadowMap.enabled = true;
      
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 200, 0);
      controls.update();
      
      const statsDom = stats.dom;
      statsDom.style.position = 'absolute';
      container.style.position = 'relative';

      container.appendChild(renderer.domElement);
      container.appendChild(stats.dom);
      
      container.addEventListener('resize', onWindowResize)
    }
  }

  const onWindowResize = () => {
    if (container && camera && renderer) {
      camera.aspect = container.offsetWidth / container.offsetHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( container.offsetWidth, container.offsetHeight );
    }
  }

  function update() {
    if (container && camera && renderer) {
      requestAnimationFrame(update);
  
      renderer.render( scene, camera );
  
      stats.update();
    }
  }

  useEffect(() => {
    render();
    update();

    return () => {
      container && container.removeEventListener('resize', onWindowResize);
    }
  })

  return <div ref={containerRef} className={styles.three_view_container} />
}

export default ThreeModelView;