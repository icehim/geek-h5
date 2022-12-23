import {Button} from "antd-mobile";
import './index.scss'

function Test() {
    return (
        <div>
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
        </div>
    );
}

export default Test;
