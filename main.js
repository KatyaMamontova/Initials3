function main() {
  const canvas = document.querySelector('.screen');
  const renderer = new THREE.WebGLRenderer({ canvas, antialiasing: true });
  // renderer.shadowMap.enabled = true;

  const fov = 95;
  const aspect = 2;
  const near = 0.1;
  const far = 10;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);

    let lightX = -1;
    let lightY = 2;
    const lightZ = 2;
    light.position.set(lightX, lightY, lightZ);

    scene.add(light);
  }

  {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(

      //'https://thumbs.dreamstime.com/b/полностью-сферически-безшовная-панорама-hdri-градусов-взгляда-угла-153173469.jpg',
      //'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/winter_lake_01.jpg',
      //'https://live.staticflickr.com/65535/48550830611_23997281a6_o.jpg',
      'https://images.squarespace-cdn.com/content/v1/5833bd87579fb3cc08e86017/1545964327591-SAJOBCGY1870OHKPM9ZA/HdrOutdoorFieldAfternoonClear001_HDR_16K.jpg',

      () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(renderer, texture);
        scene.background = rt.texture;
      });
  }

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();


  //Л

  const material1 = new THREE.MeshPhongMaterial({
    color: '#479'
  });

  const widthB = 0.3;
  const height = 1.6;
  const heightSB = 0.38;
  const depthB = 0.2;
  const longBoxGeometry = new THREE.BoxGeometry(widthB, height, depthB);
  const shortBoxGeometry = new THREE.BoxGeometry(widthB, heightSB, depthB);

  const box1 = new THREE.Mesh(longBoxGeometry, material1);
  box1.rotateZ(-Math.PI / 9);

  const box2 = new THREE.Mesh(longBoxGeometry, material1);
  box2.position.x = box1.position.x + height / 2 - widthB / 2;
  box2.rotateZ(Math.PI / 9);

  const box3 = new THREE.Mesh(shortBoxGeometry, material1);
  box3.position.x = box2.position.x / 2;
  box3.position.y = height / 2 - widthB / 2;
  box3.rotateZ(Math.PI / 2);

  const groupL = new THREE.Group();
  groupL.add(box1);
  groupL.add(box2);
  groupL.add(box3);
  groupL.position.x = -2.2;
  scene.add(groupL);


  //В

  const material2 = new THREE.MeshPhongMaterial({
    color: '#f87'
  });

  const radiusTop = 0.2;
  const radiusBottom = 0.2;
  const heightLC = height;
  const radialSegments = 100;
  const longCylinderGeometry = new THREE.CylinderGeometry(
    radiusTop, radiusBottom, heightLC, radialSegments);

  const heightSC = height / 2;
  const shortCylinderGeometry = new THREE.CylinderGeometry(
    radiusTop, radiusBottom, heightSC, radialSegments);

  const cylinder1 = new THREE.Mesh(longCylinderGeometry, material2);

  const cylinder2 = new THREE.Mesh(shortCylinderGeometry, material2);
  cylinder2.position.x = cylinder1.position.x + heightSC / 2;
  cylinder2.position.y = heightLC / 2 - radiusTop;
  cylinder2.rotateZ(Math.PI / 2);

  const cylinder3 = new THREE.Mesh(shortCylinderGeometry, material2);
  cylinder3.position.x = cylinder1.position.x + heightSC / 2;
  cylinder3.rotateZ(Math.PI / 2);

  const cylinder4 = new THREE.Mesh(shortCylinderGeometry, material2);
  cylinder4.position.x = cylinder1.position.x + heightSC / 2;
  cylinder4.position.y = -heightLC / 2 + radiusTop;
  cylinder4.rotateZ(Math.PI / 2);

  const cylinder5 = new THREE.Mesh(shortCylinderGeometry, material2);
  cylinder5.position.x = cylinder1.position.x + heightLC / 2;
  cylinder5.position.y = heightLC / 4 - 0.05;

  const cylinder6 = new THREE.Mesh(shortCylinderGeometry, material2);
  cylinder6.position.x = cylinder1.position.x + heightLC / 2;
  cylinder6.position.y = - heightLC / 4 - 0.05;
  const groupA = new THREE.Group();

  groupA.add(cylinder1);
  groupA.position.x = -0.35;
  scene.add(groupA);


  //А

  const material3 = new THREE.MeshPhongMaterial({
    color: '#df0',
    side: THREE.DoubleSide
  });

  const widthLP = 0.3;
  const heightLP = height + 0.1;
  const longPlaneGeometry = new THREE.PlaneGeometry(widthLP, heightLP);

  const widthSP = 0.25;
  const heightSP = heightLP / 2;
  const shortPlaneGeometry = new THREE.PlaneGeometry(widthSP, heightSP);

  const widthXSP = 0.3;
  const heightXSP = 0.3;
  const xShortPlaneGeometry = new THREE.PlaneGeometry(widthXSP, heightXSP);

  const plane1 = new THREE.Mesh(longPlaneGeometry, material3);
  plane1.rotateZ(-Math.PI / 9);

  const plane2 = new THREE.Mesh(longPlaneGeometry, material3);
  plane2.position.x = plane1.position.x + heightLC / 2 - radiusTop;
  plane2.rotateZ(Math.PI / 9);

  const plane3 = new THREE.Mesh(shortPlaneGeometry, material3);
  plane3.position.x = plane2.position.x / 2;
  plane3.position.y = -height / 5;
  plane3.rotateZ(Math.PI / 2);

  const plane4 = new THREE.Mesh(xShortPlaneGeometry, material3);
  plane4.position.x = plane3.position.x;
  plane4.position.y = height / 2 - widthXSP / 2 + 0.05;
  plane4.rotateZ(Math.PI / 2);

  const groupV = new THREE.Group();
  groupV.add(plane1);
  groupV.add(plane2);
  groupV.add(plane3);
  groupV.add(plane4);
  groupV.position.x = 1.25;
  scene.add(groupV);

  //поворот

  let needRotateG = false;
  let needRotateL = false;
  let needRotateF = false;

  document.addEventListener('keyup', event => {
    (event.code == 'Digit1') ? needRotateG = true :
      (event.code == 'Digit2') ? needRotateL = true :
        (event.code == 'Digit3') ? needRotateF = true : () => {
          needRotateG = false;
          needRotateL = false;
          needRotateF = false;
        };
  });

  const step = Math.PI / 100;
  let angleG = 0;
  let angleL = 0;
  let angleF = 0;

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    if (needRotateG) {
      if (angleG < 2 * Math.PI) {
        angleG += step;
        groupL.rotation.x = angleG;
      } else {
        angleG = 0;
        needRotateG = false;
      }
    }

    if (needRotateL) {
      if (angleL < 2 * Math.PI) {
        angleL += step;
        groupA.rotation.x = angleL;
      } else {
        angleL = 0;
        needRotateL = false;
      }
    }

    if (needRotateF) {
      if (angleF < 2 * Math.PI) {
        angleF += step;
        groupV.rotation.x = angleF;
      } else {
        angleF = 0;
        needRotateF = false;
      }
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
