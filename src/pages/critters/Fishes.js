import React, { Component } from 'react';
import Critters from './Critters';

class Fishes extends Component {

  render () {
      
    return (
      <Critters type="fish" apiUrl="https://acnhapi.com/v1a/fish" />
    );
  }
}
export default Fishes;