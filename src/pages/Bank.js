import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withdrawalRequest, depositRequest } from '../redux/bank/bank.action';

import { Input, Button, Card, Space, Row, Col } from 'antd';

class Home extends Component {

  constructor() {
    super();
    this.state = {
        amount: 0
    }
    this.onWithdraw = this.onWithdraw.bind(this);
    this.onDeposit = this.onDeposit.bind(this);
    this.onFullAmount = this.onFullAmount.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
  }

  render () {
    return (
      <div align="center">
        <Row justify="center" gutter={[16, 16]} >
            <Col>
                <Card title="Savings Balance">
                    <h1>{this.props.bells} bells</h1>
                </Card>
            </Col>
            <Col>
                <Card title="Pocket Bells">
                    <h1>{this.props.pocketBells} bells</h1>
                </Card>
            </Col>
        </Row>
        <Row justify="center" gutter={[16, 16]}>
            <Col>
                Amount
            </Col>
            <Col>
                <Input value={this.state.amount} onChange={this.onAmountChange} style={{ width: '300px' }} />
            </Col>
        </Row>

        <Space>
            <Button size="large" onClick={this.onClear }>Clear</Button>
            <Button type="primary" size="large" onClick={this.onWithdraw}>Withdraw</Button>
            <Button type="primary" size="large" onClick={this.onDeposit}>Deposit</Button>
            <Button type="secondary" size="large" onClick={this.onFullAmount} disabled={this.props.pocketBells === 0}>Full Amount</Button>
        </Space>
      </div>
    );
  }
  onClear() {
      this.setState({ amount: 0});
  }
  onFullAmount() {
    this.setState({ amount: this.props.pocketBells });
  }

  onWithdraw() {
    this.props.withdrawalRequest(this.state.amount);
  }

  onDeposit() {
    this.props.depositRequest(this.state.amount);
  }

  onAmountChange(e) {
      this.setState({ amount: parseFloat(e.target.value)});
  }
}
const mapStateToProps = state => ({
  bells: state.bank.bells,
  pocketBells: state.user.pocketBells
});

export default connect(mapStateToProps, { withdrawalRequest, depositRequest })(Home);