import React from 'react'
import { Layout, Divider } from 'antd'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'

const AboutView = () => (
    <Layout>
        <div>
            <CustomBreadcrumb arr={['关于']}></CustomBreadcrumb>
        </div>
        <div className='base-style'>
            <h3>系统</h3>
            <Divider />
            <p>应届毕业生就业信息管理系统</p>
        </div>
    </Layout>
)
export default AboutView
