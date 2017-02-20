import React from 'react';
// import { Renderer, Scene, Mesh, Object3D, PerspectiveCamera } from 'react-three';
import ReactTHREE from 'react-three';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import FilteredList from './list.jsx';
// import MouseInput from './MouseInput';
import Character from './Character.jsx';
import Block from './Block.jsx';

var w = window.innerWidth;
var h = window.innerHeight;

var aspectratio = w/h;

var cameraprops = {fov : 60, aspect : aspectratio,
                   near : 1, far : 10000,
                   position : new THREE.Vector3(0,200,100),
                   lookat : new THREE.Vector3(0,0,0)};

var MainCameraElement = React.createElement(
ReactTHREE.PerspectiveCamera,
{
  name:'maincamera',
  fov:'75',
  aspect:window.innerWidth/window.innerHeight,
near:1, far:10000,
position:new THREE.Vector3(0,0,600), lookat:new THREE.Vector3(0,0,0)});


class App extends React.Component {
  constructor(props, context) {
    super(props, context);




    this.state = {
      cubeRotation: new THREE.Euler(),
      palette: {
        red:0xf25346,
        white:0xd8d0d1,
        brown:0x59332e,
        pink:0xF5986E,
        brownDark:0x23190f,
        blue:0x68c3c0,
      },
      xPos: 0,
      yPos: 0,
      zPos: 0,
      camera: MainCameraElement
    };

    this.clickObject = this.clickObject.bind(this);
    this.moveObject = this.moveObject.bind(this);

    this._MouseLog = (e) => {
        console.log('x: ' + e.clientX + ' y: ' + e.clientY);
      };

    this.handleKeyPress = (e) => {
      if(e.key == 'Enter'){
        console.log('enter press here! ');
      } else if (e.keyCode == 38) {
        console.log('you pressed up arrow!');
      }
    }

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        ),
      });
    };
  }

  clickObject(e) {
    console.log('clicked object!' + e.clientX);

    this.setState((prevState, props) => {
      return {xPos: prevState.xPos}
    });
  }

  moveObject(e, firstObject) {

    e.persist();

    console.log('move object!');

    // var raycaster = new THREE.Raycaster(); // create once
    // var mouse = new THREE.Vector2(); // create once
    //
    //
    // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    // mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    //
    // raycaster.setFromCamera( mouse, MainCameraElement );
    //
    // var intersects = raycaster.intersectObjects( firstObject.objects, true );


    // console.log(intersects);

    // this.setState((prevState, props) => {
    //   return {xPos: e.clientX/3.0}
    // });
  }

  render() {
    var boxGeometry = new THREE.IcosahedronGeometry(10,0);
    var boxMaterial = new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0x0033ff, specular: 0x050505, shininess: 100 });
    var secondBoxMaterial = new THREE.MeshPhongMaterial({ ambient: 0x666666, color: 0x0033ff, specular: 0x050505, shininess: 200 });

    var sphereQuaternion = new THREE.Quaternion();
    var spherePosition = new THREE.Vector3(this.state.xPos,this.state.yPos,0);

    var sphereGeometry = new THREE.SphereGeometry(100, 32, 32);
    var sphereMaterial = new THREE.MeshPhongMaterial({ ambient: 0x050505, color: this.state.palette.blue, specular: 0x050505, shininess: 100 });

    var ambientTarget = new THREE.Vector3(0, 0, 0);
    var directionalTarget = new THREE.Vector3(0, 0, 0);

    var boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


    var intensity = 0.9;

    var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 ).normalize();


    return (
      <ReactTHREE.Renderer antialias={true} width={w} height={h} background={0x2a2933}>
        <ReactTHREE.Scene fog={new THREE.Fog(0xf7d9aa, 100, 950)} tabIndex={1} width={w} height={h} camera="maincamera" pointerEvents={['onClick', 'onMouseMove', 'onMouseOver', 'onMouseUp', 'onMouseDown', 'onMouseEnter', 'onMouseOut', 'onMouseLeave', 'onDoubleClick']}>
            {this.state.camera}
            <ReactTHREE.DirectionalLight color={0xffffff} intensity={intensity} position={new THREE.Vector3(-500, 0, 1000)}/>
            <ReactTHREE.Object3D quaternion={sphereQuaternion} position={new THREE.Vector3(this.state.xPos,this.state.yPos,0)}>
              <Character onClick3D={this.clickObject} onMouseDown3D={this.moveObject} onMouseMove3D={this.moveObject} geometry={sphereGeometry} material={sphereMaterial} position={new THREE.Vector3(this.state.xPos,this.state.yPos,0)}/>
              {boxes.map((i) => {return <Block key={i} onClick3D={this.clickObject} onMouseDown3D={this.moveObject} onMouseMove3D={this.moveObject} geometry={boxGeometry} material={secondBoxMaterial} position={new THREE.Vector3(this.state.xPos + i*200,this.state.yPos + 400,-200)}/>})}
              {boxes.map((i) => {return <Block key={i} onClick3D={this.clickObject} onMouseDown3D={this.moveObject} onMouseMove3D={this.moveObject} geometry={boxGeometry} material={boxMaterial} position={new THREE.Vector3(this.state.xPos + i*200,this.state.yPos + 400,0)}/>})}
              {boxes.map((i) => {return <Block key={i} onClick3D={this.clickObject} onMouseDown3D={this.moveObject} onMouseMove3D={this.moveObject} geometry={boxGeometry} material={boxMaterial} position={new THREE.Vector3(this.state.xPos + i*200,this.state.yPos - 400,0)}/>})}

            </ReactTHREE.Object3D>
        </ReactTHREE.Scene>
    </ReactTHREE.Renderer>);
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));
