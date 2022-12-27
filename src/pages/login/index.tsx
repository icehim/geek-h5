import {Button, NavBar, Form, Input} from 'antd-mobile'
import styles from './index.module.scss'


//表单数据类型
type LoginFormData = {
    mobile: string
    code: string
}
const Login = () => {
    //表单提交
    const onFinish = (formData: LoginFormData) => {
        console.log(formData)
    }

    return (
        <div className={styles.root}>
            <NavBar></NavBar>

            <div className="login-form">
                <h2 className="title">账号登录</h2>

                <Form onFinish={onFinish}>
                    <Form.Item
                        // 1.name指定表单校验属性名(和后台接口请求需要的参数名保持一直)
                        name='mobile'
                        className="login-item"
                        // 2.rules 添加校验规则
                        rules={[
                            {required: true, message: '请输入手机号'},
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号格式错误'
                            }
                        ]}>
                        <Input placeholder="请输入手机号"/>
                    </Form.Item>

                    <Form.Item
                        name='code'
                        className="login-item"
                        extra={<span className="code-extra">发送验证码</span>}
                        rules={[
                            {required: true, message: '请输入验证码'},
                            {len: 6, message: '验证码长度为6位'}
                        ]}
                    >
                        <Input placeholder="请输入验证码" autoComplete="off"/>
                    </Form.Item>

                    {/* noStyle 表示不提供 Form.Item 自带的样式 */}
                    <Form.Item noStyle>
                        <Button
                            block
                            type="submit"
                            color="primary"
                            className="login-submit"
                        >
                            登 录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
