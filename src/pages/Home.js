import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setName, setBirthDate, setIslandName } from '../redux/user/user.action';

import { Avatar, Input, Form } from 'antd';
import { DatePicker } from '../components/antd-pickers';

class Home extends Component {

  constructor() {
    super();
    this.onNameChange = this.onNameChange.bind(this);
    this.onBirthdateChange = this.onBirthdateChange.bind(this);
    this.onIslandNameChange = this.onIslandNameChange.bind(this);
  }

  render () {
    return (
      <div>
        <h1>Hello, Islander!</h1>
        <p>Welcome to your island.</p>
        <Avatar src="./images/av_timtom.png" size={100} shape="square" />
        <p>Hello! We're so excited to have you here! <small>...have you here!</small></p>
        <p>Let us be the first to congratulate you on your wise decision to sign up for this adventure.</p>
        <p>Welcome...to the check-in counter for your Deserted Island Getaway Package!</p>
        
        <p>Can we get your name and birthday? <small>...birthday?</small></p>
        <Form.Item label="Name" width={200}><Input value={this.props.name} onChange={this.onNameChange} /></Form.Item>
        <Form.Item label="Birthday"><DatePicker value={this.props.birthDate} onChange={this.onBirthdateChange} /></Form.Item>

        <Avatar src="./images/av_tom.png" shape="circle" size={100} />
        <p>Welcome to your island! My name is Tom Nook, and I'm the founder and president of Nook Inc. Yes, yes!</p>
        <p>What should we call your island?</p>
        <Form.Item label="Name of Island"><Input value={this.props.islandName} onChange={this.onIslandNameChange} /></Form.Item>

      </div>
    );
  }
  onNameChange(e) {
    this.props.setName(e.target.value);
  }
  onBirthdateChange(value, dateString) {
    this.props.setBirthDate(value);
  }
  onIslandNameChange(e) {
    this.props.setIslandName(e.target.value);
  }
}
const mapStateToProps = state => ({
  name: state.user.name,
  birthDate: state.user.birthDate,
  islandName: state.user.islandName
});

export default connect(mapStateToProps, {
  setName,
  setBirthDate,
  setIslandName
})(Home);