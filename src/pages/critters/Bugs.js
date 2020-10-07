import React, { Component } from 'react';
import Critters from './Critters';

class Bugs extends Component {

  render () {
      
    return (
      <Critters type="bug" apiUrl="https://acnhapi.com/v1a/bugs" />
    );
  }
}
export default Bugs;