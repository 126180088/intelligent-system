import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import '@/style/view-style/table.scss'
import { Axis } from 'echarts/lib/export'
import axios from '@/api'
import { API } from '@/api/config'
import {
    Alert,
    Layout,
    Row,
    Tag,
    Table,
    Anchor,
    Col,
    Divider,
    Form,
    Button,
    Icon,
    Input,
    InputNumber,
    Checkbox,
    Tooltip,
    Cascader,
    Select,
    DatePicker,
    Radio,
    Rate,
    Switch,
    Slider,
    AutoComplete,
    message
} from 'antd'

const { Column } = Table
const { Link } = Anchor

class FromView extends Component {
    state = {
        columns: [],
        data: [],
        stype: [],
        itype: []
    }

    componentDidMount() {
        axios
            .post(`${API}/Station/GetSType`)
            .then(res => {
                if (res.data.status === 0) {
                    const stype = []
                    JSON.parse(res.data.data).forEach(element => {
                        stype.push({
                            value: element.Id,
                            label: element.STName
                        })
                    })
                    this.setState({ stype })
                }
            })
            .catch(err => {
                console.log(`请求错误：${err} + ${API}/Station/GetSType`)
            })

        axios
            .post(`${API}/Station/GetIType`)
            .then(res => {
                if (res.data.status === 0) {
                    const itype = []
                    JSON.parse(res.data.data).forEach(element => {
                        itype.push({
                            value: element.Id,
                            label: element.ITName
                        })
                    })
                    this.setState({ itype })
                }
            })
            .catch(err => {
                console.log(`请求错误：${err} + ${API}/Station/GetSType`)
            })

        axios
            .post(`${API}/Station/GetStation`)
            .then(res => {
                let data = []
                let columns = [
                    {
                        title: '岗位名称',
                        dataIndex: 'StationName',
                        key: 'StationName'
                    },
                    {
                        title: '工资',
                        dataIndex: 'Wages',
                        key: 'Wages'
                    },
                    {
                        title: '公司名称',
                        dataIndex: 'CompanyName',
                        key: 'CompanyName'
                    },
                    {
                        title: '标签',
                        key: 'tags',
                        dataIndex: 'tags',
                        render: tags => (
                            <span>
                                {tags.map(tag => {
                                    let color = tag.length > 5 ? 'geekblue' : 'green'
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
                        title: '操作',
                        key: 'action'
                    }
                ]
                if (res.data.status === 0) {
                    JSON.parse(res.data.data).forEach(element => {
                        let stype = this.state.stype[element.STypeId].label
                        let itype = this.state.itype[element.ITypeId].label
                        data.push({
                            key: element.Id,
                            StationName: element.StationName,
                            Wages: element.Wages,
                            CompanyName: element.CompanyName,
                            tags: [stype, itype]
                        })
                    })
                }
                this.setState({ columns })
                this.setState({ data })
            })
            .catch(err => {
                console.log(`请求错误：${err} + ${API}/Station/GetSType`)
            })
    }

    render() {
        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['申请管理']}></CustomBreadcrumb>
                </div>
                <Row>
                    <Col>
                        <div className='base-style'>
                            <h3 id='basic'>就业申请审核</h3>
                            <Divider />
                            <Table columns={this.state.columns} dataSource={this.state.data} />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(FromView)

export default WrappedNormalLoginForm
