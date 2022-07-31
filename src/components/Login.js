import React from 'react';
import './Login.css';
import Api from '../Api';

export default ({onReceive}) => {
    const handleFacebookLogin = async () => {
        let result = await Api.fbPoup();
        if(result){
            onReceive(result.user);
        } else {
            alert('Opss ! erro ao conectar');
        }
    }
    return(
        <div className="login">
            <button onClick={handleFacebookLogin}>Logar com Facebook</button>
        </div>
    )
}