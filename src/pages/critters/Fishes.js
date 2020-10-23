import React, { Component } from 'react';
import Critters from './Critters';

class Fishes extends Component {

  render () {
      
    return (
      <Critters type="fish" apiUrl="/api/v1a/fish" />
    );
  }
}
export default Fishes;