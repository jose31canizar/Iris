import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import FilteredList from './list.jsx';
import MouseInput from './MouseInput';

  class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);

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
      boxWidth: 3
    };

    this.changeBoxPos = this.changeBoxPos.bind(this);

    this._onMouseDown = () => {
        console.log('mouse clicked!');
      };

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

  componentDidUpdate(newProps) {
    const {
      mouseInput,
    } = this.refs;

    const {
      width,
      height,
    } = this.props;

    if (width !== newProps.width || height !== newProps.height) {
      mouseInput.containerResized();
    }
  }

  changeBoxPos() {
    console.log('mouse clicked!');
    this.setState((prevState, props) => {
      boxWidth: !prevState.boxWidth + 1
    });
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (
      <div>
      <FilteredList></FilteredList>
      <React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}


      onAnimate={this._onAnimate}
    >
      <module
        ref="mouseInput"
        descriptor={MouseInput}
      />
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}
          position={this.cameraPosition}
        />
      <mesh rotation={this.state.cubeRotation} onMouseDown={this.changeBoxPos}>
          <boxGeometry width={this.state.boxWidth} height={1} depth={1}/>
          <meshBasicMaterial color={this.state.palette.red}/>
        </mesh>
      </scene>
    </React3>
  </div>);
  }
}
