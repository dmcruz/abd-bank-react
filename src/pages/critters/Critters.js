import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItemToBagStart } from '../../redux/user/user.action';
import { fetchCrittersRequest, setCritterCurrentPage } from '../../redux/critters/critter.action';
import { Button, Row, Col, Image, Pagination, Card } from 'antd';

class Critters extends Component {

  constructor() {
    super();
    this.state = {
        defaultPageSize: 5,
        pageSize: 5,   
    }
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {

    this.loadCritters();
  }

  renderList(critters) {
      let pagination;
      let header;
      if (critters && critters.length > 0) {
        pagination = (
          <Pagination showQuickJumper defaultCurrent={this.props.currentPage} 
            defaultPageSize={this.state.defaultPageSize} 
            pageSize={this.state.pageSize}
            total={this.props.totalRecords} 
            onShowSizeChange={this.onShowSizeChange}
            onChange={this.onPageChange}
            />
        );
        header = (
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
        )
      }
      return (
        <div style={{margin: 'auto', width: '95%'}}>
            <Row justify="center" gutter={[16, 16]} >
                <Col>
                    <Card title="Items in my Bag">
                        <h1>{this.props.itemCount} / {this.props.maxItems}</h1>
                    </Card>
                </Col>
            </Row>
            
            {header}
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

            {pagination}
        </div>
      );
  }

  onShowSizeChange(current, pageSize) {
    this.setState({pageSize: pageSize});
    this.paginate(this.props.critters);
  }

  onPageChange(page, pageSize) {
    this.setState({pageSize: pageSize});
    this.props.setCritterCurrentPage(page);
    this.paginate(this.props.critters);
  }

  paginate(array) {
    return array.slice((this.props.currentPage - 1) * this.state.pageSize, this.props.currentPage * this.state.pageSize);
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
    let contents = this.props.loading
    ? <p><em>Loading...</em></p>
    : this.renderList(this.paginate(this.props.critters));
      

    return (
      <div align="center">
            {contents}
      </div>
    );
  }
  
  loadCritters() {
    this.props.fetchCrittersRequest(this.props.apiUrl);
  }
}


const mapStateToProps = state => ({
    inventory: state.user.inventory,
    maxItems: state.user.maxItems,
    itemCount: state.user.itemCount(),
    errorMessage: state.user.errorMessage,
    isError: state.user.isError,
    isCritterError: state.critters.isError,
    critterErrMessage: state.critters.message,
    critters: state.critters.critters,
    currentPage: state.critters.currentPage,
    totalRecords: state.critters.totalRecords,
    loading: state.critters.loading,
  });

export default connect(mapStateToProps, { addItemToBagStart, setCritterCurrentPage, fetchCrittersRequest })(Critters);