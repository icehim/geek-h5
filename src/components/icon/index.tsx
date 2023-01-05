/*
* 图标组件:
* 1.type=》图标类名
* 2.className=》类名
* 3.onClick=>回调函数
* */
//定义接受参数的类型
import cla from 'classnames'
import React from "react";

type Props = {
    type: string
    className?: string
    onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}


const Icon = ({type, className, onClick}: Props) => {
    return (
        <svg onClick={onClick} className={cla('icon', className)} aria-hidden="true">
            {/* 使用时，只需要将此处的 icon btn_like_sel 替换为 icon 的名称即可*/}
            <use xlinkHref={`#${type}`}></use>
        </svg>
    );
}

export default Icon;
