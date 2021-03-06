import React, { Component } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, notification } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from '@/api'
import Qs from 'qs'
import { API } from '@/api/config'
import '@/style/view-style/login.scss'

class Login extends Component {
    state = {
        loading: false
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { account, password } = values
                axios
                    .post(`${API}/Home/LoginIn`,{ account, password })
                    .then(res => {
                        if (res.data.status === 0) {
                            let user =  JSON.parse(res.data.data)
                            localStorage.setItem('user', JSON.stringify(user[0]))
                            this.props.history.push('/')
                            message.success('登录成功!')
                        } else {
                            console.log(res.data.message)
                            message.success('登录失败!')
                            // 这里处理一些错误信息
                        }
                    })
                    .catch(err => {
                        console.log(`请求错误：${err} + ${API}/Home/LoginIn`)
                    })

                // // 这里可以做权限校验 模拟接口返回用户权限标识
                // switch (values.username) {
                //     case 'admin':
                //         values.auth = 0
                //         break
                //     default:
                //         values.auth = 1
                // }

                // localStorage.setItem('user', JSON.stringify(values))
                // this.enterLoading()
                // this.timer = setTimeout(() => {
                //     message.success('登录成功!')
                //     this.props.history.push('/')
                // }, 2000)
            }
        })
    }

    componentDidMount() {
        notification.open({
            message: '欢迎使用应届毕业生就业信息管理系统',
            duration: null,
            description: '账号 admin1(管理员) 密码 123'
        })
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Layout className='login animated fadeIn'>
                <div className='model'>
                    <div className='login-form'>
                        <h3>应届生就业信息管理平台</h3>
                        <Divider />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('account', {
                                    rules: [{ required: true, message: '请输入用户名!' }]
                                })(
                                    <Input
                                        prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='用户名'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }]
                                })(
                                    <Input
                                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type='password'
                                        placeholder='密码'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='login-form-button'
                                    loading={this.state.loading}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Login))
