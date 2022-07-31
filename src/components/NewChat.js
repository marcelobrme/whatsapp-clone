import React, { useState, useEffect } from 'react';
import './NewChat.css';
import Api from '../Api.js';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
export default ({user, chatList, show, setshow}) => {
    const [list, setList] = useState([])
    useEffect(()=> {
        const getList = async () => {
            if(user !== null) {
                let results = await Api.getContactList(user.id);
                setList(results);
            }
        }
        getList();
    }, [user]);
    const  addNewChat = async (user2) => {
        await Api.addNewChat(user, user2);
        handleClose();
    }
    const handleClose = () => {
        setshow(false);
    }
    return (
        <div className="NewChat" style={{left: show?0: -415}}>
            <div className="NewChat-head">
                <div onClick={handleClose} className="NewChat-back">
                    <ArrowBackIcon style={{ color: '#FFF' }} />
                </div>
                <div className="NewChat-headtitle">Nova Convesa</div>
            </div>

            <div className="NewChat-list">
                {list.map((item, key) => (
                    <div onClick={() =>addNewChat(item)} className="NewChat-item" key={key}>
                        <img className="Newchat-itemavatar" src={item.avatar} alt />
                        <div className="NewChat-itemname">{item.id}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}