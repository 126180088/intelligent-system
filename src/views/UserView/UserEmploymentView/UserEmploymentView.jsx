import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Steps, Button, Form, Input, Select, Alert, Result, Cascader } from 'antd'
import '@/style/view-style/form.scss'
import axios from '@/api'
import { API } from '@/api/config'
import { number } from 'echarts/lib/export'

const { Step } = Steps
const { Option } = Select

const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 8
    }
}

const tailFormItemLayout = {
    wrapperCol: {
        offset: 8
    }
}

class Step1 extends Component {
    state = {
        data: [],
        stype: [],
        itype: []
    }

    componentDidMount() {
        let uid = Number(JSON.parse(localStorage.getItem('user')).Id)
        axios
            .post(`${API}/Home/ApplicationInfo`, { uid })
            .then(res => {
                if (res.data.status === 0) {
                    if (res.data.data != null) {
                        let data = JSON.parse(res.data.data)[0]
                        this.setState({ data })
                        if (data.AResult !== 0) {
                            let a = Number(data.AResult)
                            this.props.setCurrent(a)
                        }
                    }
                }
            })
            .catch(err => {
                console.log(`请求错误：${err} + ${API}/Home/ApplicationInfo`)
            })

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
                console.log(`请求错误：${err} + ${API}/Station/GetIType`)
            })
    }

    handleSelectChange = value => {
        this.props.form.setFieldsValue({
            Email: `${value === 'kenan' ? 'kenan@google.com' : 'maoli@google.com'}`
        })
    }

    step1Submit = e => {
        e.preventDefault()

        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return
            let UId = Number(JSON.parse(localStorage.getItem('user')).Id)
            let CompanyName = fieldsValue.companyname
            let CompanyAddress = fieldsValue.companyaddress
            let StationName = fieldsValue.stationname
            let STypeId = Number(fieldsValue.stypeid[0])
            let ITypeId = Number(fieldsValue.itypeid[0])
            let Wages = Number(fieldsValue.wages)
            let UFile = fieldsValue.ufile
            let AResult = 1

            axios
                .post(`${API}/Home/PostApplication`, {
                    UId,
                    CompanyName,
                    CompanyAddress,
                    StationName,
                    STypeId,
                    ITypeId,
                    Wages,
                    UFile,
                    AResult
                })
                .then(res => {
                    if (res.data.status === 0) {
                        this.props.setCurrent(AResult)
                    }
                })
                .catch(err => {
                    console.log(`请求错误：${err} + ${API}/Home/PostApplication`)
                })
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Form hideRequiredMark {...formItemLayout}>
                    <Form.Item label='公司名称'>
                        {getFieldDecorator('companyname', {
                            initialValue: this.state.data.CompanyName,
                            rules: [
                                {
                                    required: true,
                                    message: '请填写公司名称'
                                }
                            ]
                        })(<Input placeholder='请填写公司名称' />)}
                    </Form.Item>

                    <Form.Item label='公司地址'>
                        {getFieldDecorator('companyaddress', {
                            initialValue: this.state.data.CompanyAddress,
                            rules: [
                                {
                                    required: true,
                                    message: '请填写公司地址'
                                }
                            ]
                        })(<Input placeholder='请填写公司地址' />)}
                    </Form.Item>

                    <Form.Item label='岗位名称'>
                        {getFieldDecorator('stationname', {
                            initialValue: this.state.data.StationName,
                            rules: [
                                {
                                    required: true,
                                    message: '请填写岗位名称'
                                }
                            ]
                        })(<Input placeholder='请填写岗位名称' />)}
                    </Form.Item>

                    <Form.Item label='岗位类型'>
                        {getFieldDecorator('stypeid', {
                            rules: [
                                {
                                    type: 'array',
                                    required: true,
                                    message: '请选择岗位类型!'
                                }
                            ]
                        })(<Cascader options={this.state.stype} placeholder='请选择岗位类型' />)}
                    </Form.Item>

                    <Form.Item label='行业类型'>
                        {getFieldDecorator('itypeid', {
                            rules: [
                                {
                                    type: 'array',
                                    required: true,
                                    message: '请选择行业类型!'
                                }
                            ]
                        })(<Cascader options={this.state.itype} placeholder='请选择行业类型' />)}
                    </Form.Item>

                    <Form.Item label='工资'>
                        {getFieldDecorator('wages', {
                            initialValue: this.state.data.Wages,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入工资'
                                }
                            ]
                        })(<Input placeholder='请输入工资' />)}
                    </Form.Item>

                    <Form.Item label='文件上传'>
                        {getFieldDecorator('ufile', {
                            initialValue: this.state.data.UFile,
                            rules: [
                                {
                                    required: true,
                                    message: '请上传文件'
                                }
                            ]
                        })(<Input placeholder='请上传文件' />)}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type='primary' onClick={this.step1Submit}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

class Step2From extends Component {
    render() {
        return <Result status='success' title='审核中' />
    }
}

class Step3From extends Component {
    render() {
        return <Result status='success' title='就业申请审核通过!' />
    }
}

const Step1From = Form.create()(Step1)

class FormStepView extends Component {
    state = {
        current: 0,
        formData: null
    }

    getFormData = val => {
        this.setState({
            formData: val
        })
    }

    setCurrent = val => {
        this.setState({
            current: val
        })
    }

    render() {
        const { current, formData } = this.state
        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['表单', '步骤表单']}></CustomBreadcrumb>
                </div>
                <Row>
                    <Col>
                        <div className='base-style'>
                            <Divider orientation='left'>分步表单</Divider>
                            <div>
                                <Steps style={{ margin: '3rem auto', maxWidth: '65rem' }} current={current}>
                                    <Step title='填写就业申请'></Step>
                                    <Step title='就业申请审核中'></Step>
                                    <Step title='审核成功'></Step>
                                </Steps>

                                {current === 0 && (
                                    <Step1From getFormData={this.getFormData} setCurrent={this.setCurrent} />
                                )}
                                {current === 1 && <Step2From setCurrent={this.setCurrent} />}
                                {current === 2 && <Step3From setCurrent={this.setCurrent} />}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default FormStepView
