import {Button, NavBar, Form, Input, Toast} from 'antd-mobile'
import styles from './index.module.scss'
import type {LoginFormData} from "@/types/data";
import {useDispatch} from "react-redux";
import {LoginAction} from "@/store/actions/login";
import {useHistory} from "react-router-dom";
import type {AxiosError} from "axios";


const Login = () => {
    //1.表单提交
    const dispatch = useDispatch()
    const history = useHistory()
    const onFinish = async (formData: LoginFormData) => {
        console.log(formData)
        //调用登录的异步action
        /*
        * 1.获取token到redux
        * 2.跳转页面=》首页
        * */
        try {
            await dispatch<any>(LoginAction(formData))
            Toast.show({
                content: '登录成功',
                duration: 1000,
                afterClose: () => {
                    history.replace('/home')
                }
            })
        } catch (error) {
            // AxiosError<{ data的类型 }>
            const e = error as AxiosError<{ message: string }>
            Toast.show({
                icon: 'fail',
                content: e.response?.data.message,
            })
        }
    }
    //2.按钮禁用状态
    const [form] = Form.useForm()
    return (
        <div className={styles.root}>
            <NavBar></NavBar>

            <div className="login-form">
                <h2 className="title">账号登录</h2>

                <Form form={form} onFinish={onFinish}>
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
                    <Form.Item noStyle shouldUpdate>
                        {
                            () => {
                                /*
                                * 处理按钮的禁用状态:
                                * 1.表单校验成功时，登录按钮为启用
                                * 2.表单校验失败或者用户还没有输入时，登录按钮为禁用
                                * */
                                // form.getFieldsError()获取表单校验失败的信息 =》通过errors数组>0
                                const disabled = form.getFieldsError().filter(item => item.errors.length > 0).length > 0 || !form.isFieldsTouched(true)
                                return (
                                    <Button
                                        block
                                        disabled={disabled}
                                        type="submit"
                                        color="primary"
                                        className="login-submit"
                                    >
                                        登 录
                                    </Button>
                                )
                            }
                        }
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
