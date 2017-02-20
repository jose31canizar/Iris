import React from 'react';
import ReactTHREE from 'react-three';
import * as THREE from 'three';
import ReactDOM from 'react-dom';


class Character extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.clickedObject = this.clickedObject.bind(this);

    this._handleClick = (e) => {
        console.log('mouse clicked!');
        this.props.onClick3D(e);
      };

      this._handleMouseMove = (e) => {
          console.log('mouse clicked!');

        };
    this._handleMouseDown = (t, e) => {
        console.log('on mouse down!');
        this.props.onMouseDown3D(t, e);
      };

    this._handleMouseOver = () => {
          console.log('on mouse over!');
      };

    this.handleKeyPress = (event) => {

    }
  }

  clickedObject(e) {
    console.log('clicked object!' + this.state.xPos);

    this.setState((prevState, props) => {
      return {xPos: prevState.xPos + 200}
    });
  }

  render() {
    return (
      <ReactTHREE.Mesh onClick3D={this._handleClick} onMouseDown3D={this._handleMouseDown.bind(this)} onMouseMove3D={this.props.onMouseMove3D} geometry={this.props.geometry} material={this.props.material} position={this.props.position}/>
    );
}
}


export default Character;
