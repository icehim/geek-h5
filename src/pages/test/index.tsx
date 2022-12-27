import {Button, Form, Input} from 'antd-mobile'
import './index.scss'

//导入图标组件
import Icon from '@/components/icon'
import React from "react";

function Test() {
    return (
        <div>
            {/*测试图标*/}
            {/*<svg className="icon" aria-hidden="true">*/}
            {/*    /!* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*!/*/}
            {/*    <use xlinkHref="#iconbtn_collect"></use>*/}
            {/*</svg>*/}

            <Icon type='iconbtn_like_sel' onClick={() => {
                console.log(123)
            }}/>
            {/*测试原生css变量*/}
            <div className='box'>测试原生css变量</div>
            <hr/>
            {/*1px像素边框问题*/}
            <div className='bd'>1px像素边框问题</div>
            <div className='btop'>1px像素边框问题</div>

            {/*测试组件库是否引入成功*/}
            <hr/>
            <h1>
                <Button color='success'>Success</Button>
                <Button color='danger'>Danger</Button>
                <Button color='warning'>Warning</Button>
                <Button loading loadingText='加载中' color='primary'>Primary</Button>
            </h1>

            <hr/>
            <Form
                layout='vertical'
                initialValues={{
                    mobile: {preValue: '86', realValue: ''},
                }}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }
            >
                <Form.Header>自定义表单控件</Form.Header>
                <Form.Item
                    label='姓名'
                    name='name'
                    rules={[{required: true, message: '姓名不能为空!'}]}
                >
                    <Input placeholder='请输入姓名'/>
                </Form.Item>

                <Form.Item
                    label='手机号'
                    name='phone'
                    rules={[{required: true, message: '姓名不能为空!'}]}
                >
                    <Input placeholder='请输入姓名'/>
                </Form.Item>
            </Form>


        </div>
    );
}

export default Test;
