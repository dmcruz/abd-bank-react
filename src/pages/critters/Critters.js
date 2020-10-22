import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItemToBagStart } from '../../redux/user/user.action';
import { Button, Alert, Row, Col, Image, Pagination, Card } from 'antd';

class Critters extends Component {

  constructor() {
    super();
    this.state = {
        error: null,
        critters: [],
        loading: true,
        currentPage: 0,
        defaultPageSize: 5,
        pageSize: 5,
        totalRecords: 0   
    }
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {

    this.loadCritters();
  }

  renderList(critters) {
      return (
        <div style={{margin: 'auto', width: '95%'}}>
            <Row justify="center" gutter={[16, 16]} >
                <Col>
                    <Card title="Items in my Bag">
                        <h1>{this.props.itemCount} / {this.props.maxItems}</h1>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} justify="start" style={{ textAlign: 'center', fontWeight: 'bold'}}>
                <Col span={10} style={{ textAlign: 'left'}}>
                    Name
                </Col>
                <Col span={4}>
                    Price
                </Col>
                <Col span={6}>
                    Image
                </Col>
                <Col span={2}>
                    Action
                </Col>
            </Row>

            {critters.map(critter =>
                <Row gutter={16} justify="start" style={{ textAlign: 'center', padding: '25px 0', backgroundColor: critter.id % 2 !== 0 ? '#eee' : 'transparent'}} key={critter.id}>
                    <Col span={10} style={{ textAlign: 'left' }}>
                        {critter.name["name-USen"]}
                    </Col>
                    <Col span={4}>
                        {critter["price"]}
                    </Col>
                    <Col span={6}>
                        <Image src={critter["image_uri"]} width={80}/>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" value="1" onClick={()=> this.onAdd(critter)}>Catch</Button>
                    </Col>
                </Row>
            )
            }

            <Pagination showQuickJumper defaultCurrent={this.state.currentPage} 
                defaultPageSize={this.state.defaultPageSize} 
                pageSize={this.state.pageSize}
                total={this.state.totalRecords} 
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                />
        </div>
      );
  }

  onShowSizeChange(current, pageSize) {
    this.setState({pageSize: pageSize});
    this.paginate(this.state.critters);
  }

  onPageChange(page, pageSize) {
    this.setState({currentPage: page, pageSize: pageSize});
    this.paginate(this.state.critters);
  }

  paginate(array) {
    return array.slice((this.state.currentPage - 1) * this.state.pageSize, this.state.currentPage * this.state.pageSize);
  }

  onAdd(item) {

    var obj = {
        id: this.props.type + "-" + item.id,
        name: item.name["name-USen"],
        price: item.price,
        imageUri: item["image_uri"]
    };
    this.props.addItemToBagStart(obj);
    
  }

  render () {
      let errorAlert=<span/>;
      if (this.state.error && this.state.error !== '') {
          errorAlert = <Alert type="error">this.state.error</Alert>
      }

    let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    : this.renderList(this.paginate(this.state.critters));
      

    return (
      <div align="center">
            {errorAlert}
            {contents}
      </div>
    );
  }
  
  loadCritters() {
    var me = this;

    fetch(this.props.apiUrl)
    .then(
        function(response) {
        if (response.status !== 200) {

            me.setState({ error: 'Something went wrong. Status code: ' + response.status});
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            return;
        }

        response.json().then(function(data) {
            me.setState({ critters: data, loading: false, 
                error: null, 
                currentPage: data && data.length > 0 ? 1 : 0, 
                totalRecords: data.length});
        });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
        me.setState({ error: 'Fetch error'});
    });
  }
}


const mapStateToProps = state => ({
    inventory: state.user.inventory,
    maxItems: state.user.maxItems,
    itemCount: state.user.itemCount(),
    errorMessage: state.user.errorMessage,
    isError: state.user.isError
  });

export default connect(mapStateToProps, { addItemToBagStart })(Critters);