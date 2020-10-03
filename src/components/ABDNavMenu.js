import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';


class ABDNavMenu extends Component {
    render() {
        let linkIsland;
        if (this.props.islandName && this.props.islandName !== '') {
            linkIsland = <Link to="/explore">Explore {this.props.islandName}</Link>
        } else {
            linkIsland = <Link to="/explore">Explore Island</Link>
        }
        return (
            <Menu mode="horizontal" style={{ height: '100%', margin: '16px 24px 16px 0'}}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="explore">
                    {linkIsland}
                </Menu.Item>
                <Menu.Item key="antd">
                    <Link to="/antd">Automated Bell Dispenser (ABD)</Link>
                </Menu.Item>

                <Menu.Item key="inventory">
                    <Link to="/inventory">Inventory</Link>
                </Menu.Item>

                <Menu.Item key="store">
                    <Link to="/store">Store</Link>
                </Menu.Item>
            </Menu>
        );
    }
}
const mapStateToProps = state => ({
    islandName: state.user.islandName
  });
export default connect(mapStateToProps)(ABDNavMenu);