import {Button} from "antd-mobile";

function Test() {
    return (
        <div>
            <h1>
                测试
                <Button loading loadingText='加载中' color='primary'>Primary</Button>
                <Button color='success'>Success</Button>
                <Button color='danger'>Danger</Button>
                <Button color='warning'>Warning</Button>
            </h1>
        </div>
    );
}

export default Test;
