import React, { useState, useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import Api from '../Api'
import './ChatWindow.css';
import EmojiPicker from 'emoji-picker-react';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

export default ({user, data}) => {
    const body = useRef();
    let recognition = null;
    let SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }
    const [openEmoji, setOpenEmoji] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false)
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId])
    useEffect(() => {
        if(body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list]);
    const handleMic = () => {
        if (recognition !== null) {
            recognition.onstart = () => {
                setListening(true);
            }
            recognition.onend = () => {
                setListening(false);
            }
            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript);
            }
            recognition.lang = 'pt-BR';
            recognition.start();

        }
    }

    const handleCloseEmoji = () => {
        setOpenEmoji(false);
    }
    const handleOpenEmoji = () => {
        setOpenEmoji(true);
    }
    const handleEmojiClick = (e, emojiObect) => {
        setText(text + emojiObect.emoji);
    }
    const handleInputkeyUp = (e) =>{
        if(e.keyCode == 13){
            handleSend();
        }
    }
    const handleSend = () => {
        if(text !== ''){
            Api.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setOpenEmoji(false);
        }
    }
    return (
        <div className="chatWindow">
            <div className="chatWindow-header">
                <div className="chatWindow-info">
                    <img className="chatWindow-avatar" src={data.image} alt="" />
                    <div className="chatWindow-name">{data.title}</div>
                </div>
                <div className="chatWindow-buttons">
                    <div className="chatWindow-btn">
                        <SearchIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow-btn">
                        <AttachFileIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow-btn">
                        <MoreVertIcon style={{ color: '#919191' }} />
                    </div>
                </div>
            </div>
            <div ref={body} className="chatWindow-body">
                {list.map((item, key) => (
                    <MessageItem
                    key={key}
                    data={item}
                    user={user}
                    />
                ))}
            </div>
            <div className="chatWindow-emojiarea"
                style={{ height: openEmoji ? '200px' : '0px' }}
            >
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>
            <div className="chatWindow-footer">
                <div className="chatWindow-pre">
                    <div className="chatWindow-btn"
                        onClick={handleCloseEmoji}
                        style={{ width: openEmoji ? 40 : 0 }}
                    >
                        <CloseIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow-btn"
                        onClick={handleOpenEmoji}
                    >
                        <InsertEmoticonIcon style={{ color: openEmoji ? '#009688' : '#919191' }} />
                    </div>
                </div>
                <div className="chatWindow-inputarea">
                    <input className="chatWindow-input"
                        type="text"
                        placeholder="Digite uma mensagem"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyUp={handleInputkeyUp}
                    />
                </div>
                <div className="chatWindow-pos">
                    {text === '' &&
                        <div onClick={handleMic} className="chatWindow-btn">
                            <MicIcon style={{ color: listening ? '#126ECE' : '#919191' }} />
                        </div>
                    }
                    {text !== '' &&
                        <div onClick={handleSend} className="chatWindow-btn">
                            <SendIcon style={{ color: '#919191' }} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}