import React from 'react';
import * as THREE from 'three';

class ShowThree extends React.Component {

    componentDidMount() {
        this.threejs();
    }

    threejs = () => {
        const canvas = document.querySelector('#show-three-js');

        if (canvas) {
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            camera.position.set( 0, 0, 3 );
            var renderer = new THREE.WebGLRenderer({canvas});
            renderer.setSize( window.innerWidth, window.innerHeight );

            const loader = new THREE.TextureLoader();
            let cubes = [];

            // Cube
            const boxWidth = 1;
            const boxHeight = 1;
            const boxDepth = 1;
            const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
            const materials = [
                new THREE.MeshBasicMaterial({ map: loader.load(process.env.PUBLIC_URL + 'flower-1.jpg') }),
                new THREE.MeshBasicMaterial({ map: loader.load(process.env.PUBLIC_URL + 'flower-2.jpg') }),
                new THREE.MeshBasicMaterial({ map: loader.load(process.env.PUBLIC_URL + 'flower-3.jpg') }),
                new THREE.MeshBasicMaterial({ map: loader.load(process.env.PUBLIC_URL + 'flower-4.jpg') }),
                new THREE.MeshBasicMaterial({ map: loader.load(process.env.PUBLIC_URL + 'flower-5.jpg') }),
                new THREE.MeshBasicMaterial({ map: loader.load(process.env.PUBLIC_URL + 'flower-6.jpg') })
            ];
            const cube = new THREE.Mesh(geometry, materials);
            scene.add(cube);
            cubes.push(cube);

            
            const showthree = this;
            function animate(time) {

                time *= 0.001;

                if (showthree.resizeRendererToDisplaySize(renderer)) {
                    const canvas = renderer.domElement;
                    camera.aspect = canvas.clientWidth / canvas.clientHeight;
                    camera.updateProjectionMatrix();
                  }
                renderer.render( scene, camera );
                
                cubes.forEach((cube, ndx) => {
                    const speed = .5 + ndx * .5;
                    const rot = time * speed;
                    cube.rotation.x = rot;
                    cube.rotation.y = rot;
                  });

                requestAnimationFrame( animate );
            }
            requestAnimationFrame( animate ); 
        }
    }

    resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

    render() {
        this.threejs();
        return(
            <div className="ShowThree">
                <canvas id="show-three-js"></canvas>
            </div>
        );
    }
}

export default ShowThree;