import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import axios from '@/api'
import moment from 'moment'
import { API } from '@/api/config'
import { Layout, Row, Col, Divider, Form, Button, Input, Select, DatePicker, Radio, AutoComplete, message } from 'antd'
import '@/style/view-style/form.scss'

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

class FromView extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        visible: true
    }

    handleClose = () => {
        this.setState({ visible: false })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return

            let user = JSON.parse(localStorage.getItem('user'))
            let Sex = fieldsValue.sex
            let Birth = fieldsValue.birth
            let UserName = fieldsValue.username
            let Password = fieldsValue.password
            let Telephone = fieldsValue.telephone
            let Email = fieldsValue.email
            let Account = user.Account

            axios
                .post(`${API}/Home/UpdataInfo`, { UserName, Password, Telephone, Email, Account, Sex, Birth })
                .then(res => {
                    if (res.data.status === 0) {
                        user.UserName = UserName
                        user.Sex = Sex
                        user.Birth = Birth
                        user.Password = Password
                        user.Telephone = Telephone
                        user.Email = Email
                        localStorage.setItem('user', JSON.stringify(user))

                        message.info('修改成功')
                    } else {
                        message.success('修改失败!')
                        // 这里处理一些错误信息
                    }
                })
                .catch(err => {
                    console.log(`请求错误：${err} + ${API}/Home/CreateToken`)
                })
        })
    }

    handleConfirmBlur = e => {
        const { value } = e.target
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!')
        } else {
            callback()
        }
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
                    <CustomBreadcrumb arr={['个人管理', '个人信息']}></CustomBreadcrumb>
                </div>
                <Row>
                    <Col>
                        <div className='base-style'>
                            <Divider orientation='left'>个人信息</Divider>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label={<span>用户名&nbsp;</span>}>
                                    {getFieldDecorator('username', {
                                        initialValue: JSON.parse(localStorage.getItem('user')).hasOwnProperty(
                                            'UserName'
                                        )
                                            ? JSON.parse(localStorage.getItem('user')).UserName
                                            : '',
                                        rules: [{ required: true, message: '请输入用户名' }]
                                    })(<Input placeholder='请输入用户名' />)}
                                </Form.Item>

                                <Form.Item label={<span>账号&nbsp;</span>}>
                                    {getFieldDecorator('account', {
                                        initialValue: JSON.parse(localStorage.getItem('user')).hasOwnProperty('Account')
                                            ? JSON.parse(localStorage.getItem('user')).Account
                                            : '',
                                        rules: [{ required: true, message: '请输入用户名' }]
                                    })(<Input placeholder='请输入用户名' disabled />)}
                                </Form.Item>

                                <Form.Item label='性别'>
                                    {getFieldDecorator('sex', {
                                        initialValue: JSON.parse(localStorage.getItem('user')).hasOwnProperty('Sex')
                                            ? JSON.parse(localStorage.getItem('user')).Sex
                                            : '',
                                        rules: [{ required: true, message: '请选择性别' }]
                                    })(
                                        <Radio.Group>
                                            <Radio value='男'>男</Radio>
                                            <Radio value='女'>女</Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>

                                <Form.Item label='出生年月'>
                                    {getFieldDecorator('birth', {
                                        initialValue: JSON.parse(localStorage.getItem('user')).hasOwnProperty('Birth')
                                            ? moment(JSON.parse(localStorage.getItem('user')).Birth)
                                            : '',
                                        rules: [{ type: 'object', required: true, message: '请选择日期' }]
                                    })(<DatePicker style={{ width: '100%' }} placeholder='请选择日期' />)}
                                </Form.Item>

                                <Form.Item label='邮箱'>
                                    {getFieldDecorator('email', {
                                        initialValue: JSON.parse(localStorage.getItem('user')).hasOwnProperty('Email')
                                            ? JSON.parse(localStorage.getItem('user')).Email
                                            : '',
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

                                <Form.Item label='密码' hasFeedback>
                                    {getFieldDecorator('password', {
                                        initialValue: JSON.parse(localStorage.getItem('user')).hasOwnProperty(
                                            'Password'
                                        )
                                            ? JSON.parse(localStorage.getItem('user')).Password
                                            : '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入密码!'
                                            },
                                            {
                                                validator: this.validateToNextPassword
                                            }
                                        ]
                                    })(<Input.Password placeholder='请输入密码' disabled />)}
                                </Form.Item>

                                <Form.Item label='联系电话'>
                                    {getFieldDecorator('telephone', {
                                        initialValue: JSON.parse(localStorage.getItem('user')).hasOwnProperty(
                                            'Telephone'
                                        )
                                            ? JSON.parse(localStorage.getItem('user')).Telephone
                                            : '',
                                        rules: [{ required: true, message: '请输入联系电话!' }]
                                    })(<Input addonBefore={prefixSelector} />)}
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Button type='primary' htmlType='submit'>
                                        保存
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
