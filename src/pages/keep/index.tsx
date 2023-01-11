import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";

function Keep() {
    const history = useHistory()
    useEffect(() => {
        return () => {
            console.log('keep组件卸载')
        }
    }, [])
    return (
        <div>
            <h1 onClick={() => history.push('/home')}>
                Keep
            </h1>
        </div>
    );
}

export default Keep;
