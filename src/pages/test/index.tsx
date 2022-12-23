import {Button} from "antd-mobile";
import './index.scss'

//导入图标组件
import Icon from '@/components/icon'

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
        </div>
    );
}

export default Test;
