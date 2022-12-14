import React, { useState, useEffect } from 'react';
import './chatList.css';
export default ({onClick, active, data}) => {
    const [time, setTime] = useState('');
    useEffect(() => {
        if (data.lastMessageDate > 0) {
            let d = new Date(data.lastMessageDate.seconds * 1000)
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }
    }, [data]);
    return (
        <div className={`chatListItem ${active?'active':''}`}
            onClick={onClick}
        >
            <img className="chatList-avatar" src={data.image} />
            <div className="chatList-lines">
                <div className="chatList-line">
                    <div className="chatList-name">{data.title}</div>
                    <div className="chatList-date">{time}</div>
                </div>
                <div className="chatList-line">
                    <div className="chatList-lasMsg">
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}