import {Button, NavBar, Form, Input, Toast, InputRef} from 'antd-mobile'
import styles from './index.module.scss'
import type {LoginFormData} from "@/types/data";
import {useDispatch} from "react-redux";
import {GetCodeAction, LoginAction} from "@/store/actions/login";
import {useHistory, useLocation} from "react-router-dom";
import type {AxiosError} from "axios";
import {useEffect, useRef, useState} from "react";

const Login = () => {
    //1.表单提交
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation<{ form: string } | undefined>()
    const onFinish = async (formData: LoginFormData) => {
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
                    if (location.state) {
                        return history.replace(location.state?.form)
                    }
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
    //3.发送验证码功能
    //获取输入框组件的实例
    const mobileRef = useRef<InputRef>(null)
    // 倒计时秒数
    const [timeLeft, setTimeLeft] = useState(0)
    // 存储定时器ID
    const timer = useRef(0)
    const getCode = async () => {
        /*
        * 发送验证码功能:
        * 1.校验手机号是否合法(空||格式)
        * 2.如果校验失败=》提示错误信息并让输入框获取焦点
        * 3.发送
        *
        * 说明:
        * 1.form.getFieldValue('name')    获取输入框的值
        * 2.form.getFieldError('name')    校验输入框值
        * */
        const mobile = form.getFieldValue('mobile')
        const isPhone = form.getFieldError('mobile')
        if (!mobile || isPhone.length > 0) {
            return mobileRef.current?.focus()
        }
        try {
            await dispatch<any>(GetCodeAction(mobile))
            Toast.show({
                content: '发送成功',
                duration: 1000
            })
            /*
            * 1.创建状态timeLeft倒计时数据
            * 2.在点击获取验证码的事件处理程序中，更新倒计时时间并开启定时器
            * 3.在定时器中，更新状态(需要使用回调函数形式的setTimeLeft)
            * 4.开启定时器时，展示倒计时时间
            * */

            //1.设置倒计时时间
            setTimeLeft(60)
            //2.开启定时器=》执行倒计时
            //说明: 使用定时器需要加window.setInterval    使定时器返回值类型和ref返回值类型对应
            timer.current = window.setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1)
            }, 1000)
        } catch (error) {
            const e = error as AxiosError<{ message: string }>
            Toast.show({
                content: e.response?.data.message,
            })
        }
    }

    useEffect(() => {
        if (timeLeft === 0) {
            // 倒计时结束:清除定时器
            clearInterval(timer.current)
        }
    }, [timeLeft])
    useEffect(() => {
        return () => {
            // 组件销毁:清除定时器
            clearInterval(timer.current)
        }
    }, [])

    return (
        <div className={styles.root}>
            <NavBar></NavBar>

            <div className="login-form">
                <h2 className="title">账号登录</h2>

                <Form form={form} onFinish={onFinish} validateTrigger={['onBlur']} >
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
                        <Input ref={mobileRef} placeholder="请输入手机号"/>
                    </Form.Item>

                    <Form.Item
                        name='code'
                        className="login-item"
                        extra={<span onClick={timeLeft === 0 ? getCode : undefined}
                                     className="code-extra">{timeLeft === 0 ? '发送验证码' : `还需 ${timeLeft} 秒后重新发送`}</span>}
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
