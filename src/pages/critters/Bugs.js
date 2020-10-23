import React, { Component } from 'react';
import Critters from './Critters';

class Bugs extends Component {

  render () {
      
    return (
      <Critters type="bug" apiUrl="/api/v1a/bugs" />
    );
  }
}
export default Bugs;