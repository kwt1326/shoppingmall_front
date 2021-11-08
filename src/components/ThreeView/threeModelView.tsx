import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import styles from './ThreeView.scss';

function ThreeModelView(props: { url: string }) {
  const containerRef = useRef(null);

  let container: HTMLDivElement | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let renderer: THREE.WebGLRenderer | null = null;

  const scene = new THREE.Scene();
  const stats = Stats();

  const render = () => {
    if (containerRef?.current) {
      container = containerRef.current as unknown as HTMLDivElement;

      camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.01, 10000);

      const grid = new THREE.GridHelper(500, 10, new THREE.Color(170,170,170), new THREE.Color(170,170,170));
      const light = new THREE.AmbientLight(0xffffff, 1);
      const loader = new GLTFLoader();
      
      loader.load(props.url, (gltf) => {
        scene.add(gltf.scene);
      });
      
      scene.background = new THREE.Color(0, 195, 255);
      scene.add(light);
      scene.add(grid);

      camera.position.set(0, 10, 5);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = true;
      
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
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