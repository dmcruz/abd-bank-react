import React, { Component } from 'react';
import { Breadcrumb } from 'antd';

import { HomeOutlined } from '@ant-design/icons';


export class ABDBreadcrumb extends Component {

    render() {
        return (
            <Breadcrumb style={{ margin: '25px 10px' }}>
                <Breadcrumb.Item><HomeOutlined/> Home</Breadcrumb.Item>
                <Breadcrumb.Item>Explore Island</Breadcrumb.Item>
                <Breadcrumb.Item>Critters</Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}