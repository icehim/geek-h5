import {Button} from "antd-mobile";
import './index.css'

function Test() {
    return (
        <div>
            <div className='box'>
                测试原生css变量
            </div>
            <h1>
                测试
                <Button color='success'>Success</Button>
                <Button color='danger'>Danger</Button>
                <Button color='warning'>Warning</Button>
                <Button loading loadingText='加载中' color='primary'>Primary</Button>
            </h1>
        </div>
    );
}

export default Test;
