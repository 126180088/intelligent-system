import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Tag, Table, Button, Anchor } from 'antd'
import '@/style/view-style/table.scss'
import { Axis } from 'echarts/lib/export'

const { Column } = Table
const { Link } = Anchor

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <Button type='link'>{text}</Button>
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green'
                    if (tag === 'loser') {
                        color = 'volcano'
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    )
                })}
            </span>
        )
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button type='link'>Invite {record.name}</Button>
                <Divider type='vertical' />
                <Button type='link'>Delete</Button>
            </span>
        )
    }
]

const data = []

for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: `${i + 1}`,
        address: `London, Park Lane no. ${i}`,
        tags: ['nice', 'developer']
    })
}

const Table1 = () => <Table columns={columns} dataSource={data} />

const TableView = () => (
    <Layout className='animated fadeIn'>
        <div>
            <CustomBreadcrumb arr={['岗位信息', '岗位总览']}></CustomBreadcrumb>
        </div>
        <Row>
            <Col>
                <div className='base-style'>
                    <h3 id='basic'>岗位总览</h3>
                    <Divider />
                    <Table1 />
                </div>
            </Col>
        </Row>
    </Layout>
)

export default TableView