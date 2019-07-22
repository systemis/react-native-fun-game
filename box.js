import React, { Component, PropTypes } from 'react'
import {
  View
} from 'react-native';
import { fromEventPattern } from 'rxjs';

class Box extends Component {
  render() {
    let width = this.props.size[0];
    let height = this.props.size[1];
    let x = this.props.body.position.x - width / 2;
    let y = this.props.body.position.y - height / 2;
    return (
      <View style={{
        position: 'absolute',
        left: x,
        top: y,
        height: height,
        width: width,
        backgroundColor: this.props.color || 'red',
      }}>

      </View>
    )
  }
}


export default Box