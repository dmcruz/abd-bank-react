import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sellItemStart } from '../redux/user/user.action';

import { Button, Card, Avatar, Image, Row, Col, Space } from 'antd';

class Cranny extends Component {

  constructor() {
    super();
    this.state = {
        amount: 0
    }
  }

  getUserName() {
      if (this.props.username && this.props.username !== '') {
          return this.props.username;
      } else {
          return "Islander";
      }
      
  }
  render () {
      let inventoryControl = this.props.inventory.length > 0 ?
        this.renderInventory() :
        <br />;

    return (
      <div align="center">

      <Space>
        <Avatar src="./images/av_timtom.png" size={150} shape="square" />
        <p>{this.getUserName()}, welcome! <small>...welcome!</small> What do you need today?</p>
      </Space>

        <Row justify="center" gutter={[16, 16]} >
            <Col>
                <Card title="Pocket Bells">
                    <h1>{this.props.pocketBells} bells</h1>
                </Card>
            </Col>
        </Row>

        {inventoryControl}

      </div>
    );
  }

  renderInventory() {
      return (
        <div>
            <Row justify="left">
                <Col span={6}>Item</Col>
                <Col span={6}>Price</Col>
                <Col span={6}>Photo</Col>
                <Col span={6}>Action</Col>
            </Row>

            {
                this.props.inventory.map(item => 
                    <Row justify="left" key={item.id}>
                        <Col span={6}>
                            {item.name}
                        </Col>
                        <Col span={6}>
                            {item.price}
                        </Col>
                        <Col span={6}><Image src={item.imageUri} width={80} /></Col>
                        <Col span={6}>
                            <Button key={item.id} onClick={() => this.onSellItem(item)}>Sell</Button>
                        </Col>
                    </Row>
                )
            }
        </div>
      );
  }

  onSellItem(item) {
    this.props.sellItemStart(item);
  }
}
const mapStateToProps = state => ({
  bells: state.bank.bells,
  pocketBells: state.user.pocketBells,
  username: state.user.name,
  inventory: state.user.inventory
});

export default connect(mapStateToProps, { sellItemStart })(Cranny);