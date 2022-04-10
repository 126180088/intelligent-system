import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import axios from '@/api'
import { API } from '@/api/config'
import {
    Alert,
    Layout,
    Row,
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
import '@/style/view-style/form.scss'

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

class FromView extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        visible: true,
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
    }

    handleClose = () => {
        this.setState({ visible: false })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return

            let StationName = fieldsValue.stationname
            let StationDescribe = fieldsValue.stationdescribe
            let StationRequire = fieldsValue.stationrequire
            let Wages = fieldsValue.wages + ''
            let CompanyName = fieldsValue.companyname
            let CompanyAddress =
                fieldsValue.companyaddress[0] +
                ',' +
                fieldsValue.companyaddress[1] +
                ',' +
                fieldsValue.companyaddress[2]

            let CompanyDescribe = fieldsValue.companydescribe
            let CompanyEmail = fieldsValue.companyemail
            let NeedNumber = fieldsValue.neednumber + ''
            let CompanyTele = fieldsValue.companytele
            let STypeId = fieldsValue.stypeid[0]
            let ITypeId = fieldsValue.itypeid[0]

            axios
                .post(`${API}/Station/StationAdd`, {
                    StationName,
                    StationDescribe,
                    StationRequire,
                    Wages,
                    CompanyName,
                    CompanyAddress,
                    CompanyDescribe,
                    CompanyEmail,
                    NeedNumber,
                    CompanyTele,
                    STypeId,
                    ITypeId
                })
                .then(res => {
                    if (res.data.status === 0) {
                        message.info('创建成功')
                        this.props.form.resetFields()
                    } else {
                        message.info('创建失败!')
                    }
                })
                .catch(err => {
                    console.log(`请求错误：${err} + ${API}/Station/StationAdd`)
                })
        })
    }

    handleConfirmBlur = e => {
        const { value } = e.target
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    }

    handleWebsiteChange = value => {
        let autoCompleteResult
        if (!value) {
            autoCompleteResult = []
        } else {
            autoCompleteResult = ['@google.com', '@163.com', '@qq.com'].map(domain => `${value}${domain}`)
        }
        this.setState({ autoCompleteResult })
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 10 }
            }
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 16,
                    offset: 0
                },
                sm: {
                    span: 10,
                    offset: 6
                }
            }
        }
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86'
        })(
            <Select style={{ width: 70 }}>
                <Option value='86'>+86</Option>
                <Option value='87'>+87</Option>
            </Select>
        )

        const websiteOptions = this.state.autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ))

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['岗位信息', '岗位发布']}></CustomBreadcrumb>
                </div>
                <Row>
                    <Col>
                        <div className='base-style'>
                            <Divider orientation='left'>岗位发布</Divider>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label={<span>岗位名称&nbsp;</span>}>
                                    {getFieldDecorator('stationname', {
                                        rules: [{ required: true, message: '请输入岗位名称' }]
                                    })(<Input placeholder='请输入岗位名称' />)}
                                </Form.Item>

                                <Form.Item label='岗位类型'>
                                    {getFieldDecorator('stypeid', {
                                        rules: [{ type: 'array', required: true, message: '请选择岗位类型!' }]
                                    })(<Cascader options={this.state.stype} placeholder='请选择岗位类型' />)}
                                </Form.Item>

                                <Form.Item label='行业类型'>
                                    {getFieldDecorator('itypeid', {
                                        rules: [{ type: 'array', required: true, message: '请选择行业类型!' }]
                                    })(<Cascader options={this.state.itype} placeholder='请选择行业类型' />)}
                                </Form.Item>

                                <Form.Item label='工资'>
                                    {getFieldDecorator('wages', {
                                        rules: [{ required: true, message: '请输入工资' }]
                                    })(<InputNumber placeholder='请输入工资' style={{ width: '100%' }} />)}
                                </Form.Item>

                                <Form.Item label={<span>岗位详情&nbsp;</span>}>
                                    {getFieldDecorator('stationdescribe', {
                                        rules: [{ required: true, message: '请输入岗位详情' }]
                                    })(<Input.TextArea placeholder='请输入岗位详情' />)}
                                </Form.Item>

                                <Form.Item label={<span>岗位要求&nbsp;</span>}>
                                    {getFieldDecorator('stationrequire', {
                                        rules: [{ required: true, message: '请输入岗位要求' }]
                                    })(<Input.TextArea placeholder='请输入岗位要求' />)}
                                </Form.Item>

                                <Form.Item label={<span>公司名称&nbsp;</span>}>
                                    {getFieldDecorator('companyname', {
                                        rules: [{ required: true, message: '请输入公司名称' }]
                                    })(<Input placeholder='请输入公司名称' />)}
                                </Form.Item>

                                <Form.Item label='公司地址'>
                                    {getFieldDecorator('companyaddress', {
                                        rules: [{ required: true, message: '请输入公司地址' }]
                                    })(<Input placeholder='请输入公司地址' />)}
                                </Form.Item>

                                <Form.Item label={<span>公司详情&nbsp;</span>}>
                                    {getFieldDecorator('companydescribe', {
                                        rules: [{ required: true, message: '请输入公司详情' }]
                                    })(<Input.TextArea placeholder='请输入公司详情' />)}
                                </Form.Item>

                                <Form.Item label='需求人数'>
                                    {getFieldDecorator('neednumber', {
                                        rules: [{ required: true, message: '请输入人数' }]
                                    })(<InputNumber placeholder='请输入人数' style={{ width: '100%' }} />)}
                                </Form.Item>

                                <Form.Item label='邮箱'>
                                    {getFieldDecorator('companyemail', {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: '请输入正确的邮箱!'
                                            },
                                            {
                                                required: true,
                                                message: '请输入邮箱'
                                            }
                                        ]
                                    })(
                                        <AutoComplete
                                            dataSource={websiteOptions}
                                            onChange={this.handleWebsiteChange}
                                            placeholder='请输入邮箱'>
                                            <Input />
                                        </AutoComplete>
                                    )}
                                </Form.Item>

                                <Form.Item label='联系电话'>
                                    {getFieldDecorator('companytele', {
                                        rules: [{ required: true, message: '请输入联系电话!' }]
                                    })(<Input addonBefore={prefixSelector} />)}
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Button type='primary' htmlType='submit'>
                                        发布
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(FromView)

export default WrappedNormalLoginForm
