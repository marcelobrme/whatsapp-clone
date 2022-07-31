import React, {useState, useEffect} from 'react';
import './App.css';
import  ChatWindow from './components/ChatWindow';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ChatList from './components/ChatList'
import ChatIntro from './components/chatIntro';
import NewChat from './components/NewChat';
import Login from './components/Login';
import Api from './Api';

function App() {
  const [chatlist, setChatList] = useState([{},{}]);
  const [activeChat, setActiveChat] = useState([]);
  const [user, setUser] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);
  useEffect(() =>{
    if(user !== null){
     let unsub = Api.onChatList(user.id, setChatList);
     return unsub;
    }
  }, [user]);
  const handleNewChat = () => {
      setShowNewChat(true);
  }
  const handleLoginData = async (u) => {
      let newUSer = {
        id: u.uid,
        name: u.displayName,
        avatar: u.photoURL
      };
      await Api.addUser(newUSer);
      setUser(newUSer);
  }
  if(user === null) {
    return(<Login onReceive={handleLoginData} />);
  }else
    
  
  return (
    
      <div className="container">
        <div className="sidebar">
          <NewChat
          chatlist={chatlist}
          user={user}
          show={showNewChat}
          setshow={setShowNewChat}
          />
          <header>
            <img className="avatar" src={user.avatar} />
            <div className="btn">
              <div className="btn-a">
              <DonutLargeIcon style={{color: '#919191'}}/>
              </div>
              <div onClick={handleNewChat} className="btn-a">
              <ChatIcon style={{color: '#919191'}}/>
              </div>
              <div className="btn-a">
              <MoreVertIcon style={{color: '#919191'}}/>
              </div>
            </div>
          </header>
          <div className="search">
            <div className="search-input">
                <SearchIcon fontSize="small" style={{color: '#919191'}}/>
                <input type="seach" placeholder="Procura ou comerça uma nova conversa"/>
            </div>
          </div>
          <div className="chatlist">
              {chatlist.map((item, key)=>(
                  <ChatList
                   key={key}
                   data={item}
                   active={activeChat.ChatId === chatlist[key].chatId}
                  onClick={() =>setActiveChat(chatlist[key])}
                  />
                  
              ))}
              
          </div>

        </div>
        <div className="contentarea">
          {activeChat.chatId !== undefined &&
            <ChatWindow
            user={user}
            data={activeChat}
            />
          }
          {activeChat.chatId === undefined &&
            <ChatIntro/>
          }
          
          <div className="clear"></div>
        </div>
      </div>
   
  );
}

export default App;
