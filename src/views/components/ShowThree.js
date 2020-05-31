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
            camera.position.set( 0, 0, 30 );
            var renderer = new THREE.WebGLRenderer({canvas});
            renderer.setSize( window.innerWidth, window.innerHeight );

            var MAX_POINTS = 500;

            // geometry
            var geometry = new THREE.BufferGeometry();

            // attributes
            var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
            geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

            // draw range
            var drawCount = 2; // draw the first 2 points, only
            geometry.setDrawRange( 0, drawCount );

            // material
            var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

            // line
            var line = new THREE.Line( geometry,  material );
            scene.add( line );

            var x, y, z, index;
            x = y = z = index = 0;

            for ( var i = 0, l = MAX_POINTS; i < l; i ++ ) {

                positions[ index ++ ] = x;
                positions[ index ++ ] = y;
                positions[ index ++ ] = z;

                x += ( Math.random() - 0.5 ) * 20;
                y += ( Math.random() - 0.5 ) * 20;
                z += ( Math.random() - 0.5 ) * 20;

}
            
            function animate() {
                requestAnimationFrame( animate );
                const newValue = Math.trunc(Math.random() * 500)
                line.geometry.setDrawRange( 0, newValue );
                renderer.render( scene, camera );
            }
            animate();   
        }
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