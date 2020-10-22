/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import {
  Button,
  Card,
  Avatar,
  Image,
  Row,
  Col,
  Space,
  Divider,
  Pagination,
} from "antd"
import { sellItemRequest, buyItemRequest } from "../redux/user/user.action"

class Cranny extends Component {
  constructor() {
    super()
    this.state = {
      wares: [],
      loading: true,
      currentPage: 0,
      defaultPageSize: 5,
      pageSize: 5,
      totalRecords: 0,
    }
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onBuy = this.onBuy.bind(this)
  }

  getUserName() {
    if (this.props.username && this.props.username !== "") {
      return this.props.username
    }
    return "Islander"
  }

  componentDidMount() {
    this.loadWares()
  }

  render() {
    const inventoryControl =
      this.props.inventory.length > 0 ? this.renderInventory() : <br />

    const waresForSale = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderList(this.paginate(this.state.wares))
    )

    return (
      <div align="center">
        <Space>
          <Avatar src="./images/av_timtom.png" size={150} shape="square" />
          <p>
            {this.getUserName()}, welcome! <small>...welcome!</small> What do
            you need today?
          </p>
        </Space>

        <Row justify="center" gutter={[16, 16]}>
          <Col>
            <Card title="Pocket Bells">
              <h1>{this.props.pocketBells} bells</h1>
            </Card>
          </Col>
        </Row>

        {inventoryControl}

        <Divider dashed />

        {waresForSale}
      </div>
    )
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

        {this.props.inventory.map((item) => (
          <Row justify="left" key={item.id}>
            <Col span={6}>{item.name}</Col>
            <Col span={6}>{item.price}</Col>
            <Col span={6}>
              <Image src={item.imageUri} width={80} />
            </Col>
            <Col span={6}>
              <Button key={item.id} onClick={() => this.onSellItem(item)}>
                Sell
              </Button>
            </Col>
          </Row>
        ))}
      </div>
    )
  }

  loadWares() {
    const me = this
    const itemsToReturn = 20

    fetch("http://acnhapi.com/v1a/houseware/")
      .then(function (response) {
        if (response.status !== 200) {
          me.setState({
            error: `Something went wrong. Status code: ${response.status}`,
          })
          console.log(
            `Looks like there was a problem. Status Code: ${response.status}`
          )
          return
        }

        response.json().then(function (data) {
          const randomItems = me.getRandom(data, itemsToReturn)

          me.setState({
            wares: randomItems,
            loading: false,
            error: null,
            currentPage: data && itemsToReturn > 0 ? 1 : 0,
            totalRecords: itemsToReturn,
          })
        })
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err)
        me.setState({ error: "Fetch error" })
      })
  }

  renderList(wares) {
      const {currentPage, totalRecords, defaultPageSize, pageSize} = this.state;

    return (
      <div style={{ margin: "auto", width: "95%" }}>
        <Row
          gutter={16}
          justify="start"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          <Col span={10} style={{ textAlign: "left" }}>
            Name
          </Col>
          <Col span={4}>Buy Price</Col>
          <Col span={6}>Image</Col>
          <Col span={2}>Action</Col>
        </Row>

        {wares.map((ware) => (
          <Row
            gutter={16}
            justify="start"
            style={{
              textAlign: "center",
              padding: "25px 0",
              backgroundColor: ware[0].id % 2 !== 0 ? "#eee" : "transparent",
            }}
            key={ware[0]["internal-id"]}
          >
            <Col span={10} style={{ textAlign: "left" }}>
              {ware[0].name["name-USen"]}
            </Col>
            <Col span={4}>
              {ware[0]["buy-price"] ? ware[0]["buy-price"] : 999999}
            </Col>
            <Col span={6}>
              <Image src={ware[0].image_uri} width={80} />
            </Col>
            <Col span={2}>
              <Button
                type="primary"
                value="1"
                onClick={() => this.onBuy(ware[0])}
              >
                Buy
              </Button>
            </Col>
          </Row>
        ))}

        <Pagination
          showQuickJumper
          defaultCurrent={currentPage}
          defaultPageSize={defaultPageSize}
          pageSize={pageSize}
          total={totalRecords}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
        />
      </div>
    )
  }

  onBuy(item) {
    const itemOnHand = {
      id: item.id,
      name: item.name["name-USen"],
      price: item["buy-price"] ? item["buy-price"] : 999999,
      imageUri: item.image_uri,
    }

    this.props.buyItemRequest(itemOnHand)
  }

  onShowSizeChange(current, pageSize) {
    this.setState({ pageSize })
    this.paginate(this.state.wares)
  }

  onPageChange(page, pageSize) {
    this.setState({ currentPage: page, pageSize })
    this.paginate(this.state.wares)
  }

  paginate(array) {
    return array.slice(
      (this.state.currentPage - 1) * this.state.pageSize,
      this.state.currentPage * this.state.pageSize
    )
  }

  onSellItem(item) {
    this.props.sellItemRequest(item)
  }

  getRandom(arr, n) {
    const result = new Array(n)
    let len = arr.length
    const taken = new Array(len)
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available")
    while (n--) {
      const x = Math.floor(Math.random() * len)
      result[n] = arr[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }
    return result;
  }
}

const mapStateToProps = (state) => ({
  bells: state.bank.bells,
  pocketBells: state.user.pocketBells,
  username: state.user.name,
  inventory: state.user.inventory,
})

export default connect(mapStateToProps, { sellItemRequest, buyItemRequest })(
  Cranny
)
