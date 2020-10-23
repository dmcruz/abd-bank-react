import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, ShopOutlined, BugOutlined, BankOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

class ABDNavMenu extends Component {
    getExploreTitle() {
        if (this.props.islandName && this.props.islandName !== '') {
            return "Explore " + this.props.islandName;
        } else {
            return "Explore Island";
        }
    }

    render() {
        return (
            <Menu mode="horizontal" style={{ height: '100%', margin: '16px 24px 16px 0'}}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <SubMenu key="explore" title={this.getExploreTitle()} icon={<BugOutlined />}>
                    <Menu.ItemGroup title="Critters">
                    <Menu.Item key="fish">
                        <Link to="/explore/fishes">Fishes</Link>
                    </Menu.Item>
                    <Menu.Item key="bugs">
                    <Link to="/explore/bugs">Bugs</Link>
                    </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>

                <Menu.Item key="store" icon={<ShopOutlined />}>
                    <Link to="/store">Nook's Cranny (Store)</Link>
                </Menu.Item>

                <Menu.Item key="abd" icon={<BankOutlined />}>
                    <Link to="/bank">Automated Bell Dispenser (ABD)</Link>
                </Menu.Item>

            </Menu>
        );
    }
}
const mapStateToProps = state => ({
    islandName: state.user.islandName
  });
export default connect(mapStateToProps)(ABDNavMenu);