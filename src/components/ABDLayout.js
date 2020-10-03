import React, { Component } from 'react';
import { Layout } from 'antd';
import ABDNavMenu from './ABDNavMenu';

const { Header, Footer, Content } = Layout;

export class ABDLayout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo">
                        <img alt="Logo" src="./images/nook_island_logo.png" />
                    </div>
                    <ABDNavMenu />
                </Header>
                <Content style={{ padding: '0 50px', minHeight: '50px' }}>
                    {this.props.children}
                </Content>
                <Footer>Copyright 2020</Footer>
            </Layout>
        );
    }
}