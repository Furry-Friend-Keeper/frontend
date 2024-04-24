import { useState, useEffect } from "react";
// import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function App() {
  const [stompClient, setStompClient] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const connect = () => {
    var socket = new SockJS('https://capstone23.sit.kmutt.ac.th/at3-socket/api/web-s');
    const client = Stomp.over(socket);
    client.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        updateNotificationDisplay();
        client.subscribe('/topic/messages', function (message) {
            showMessage(JSON.parse(message.body).content);
            console.log("test");
        });

        client.subscribe('/user/topic/private-messages', function (message) {
            showMessage(JSON.parse(message.body).content);
        });

        client.subscribe('/topic/global-notifications', function (message) {
            setNotificationCount(prevCount => prevCount + 1);
            updateNotificationDisplay();
        });

        client.subscribe('/user/topic/private-notifications', function (message) {
            setNotificationCount(prevCount => prevCount + 1);
            updateNotificationDisplay();
            showMessage(JSON.parse(message.body).content);
        });
        setStompClient(client);
    }, function(error) {
        console.error('Connection failed: ' + error);
        // Handle connection failure here
    });
};

  useEffect(() => {
    console.log("Index page is ready");
    connect();
    

    const sendButtonClickHandler = () => {
      sendMessage();
    };

    const sendPrivateButtonClickHandler = () => {
      sendPrivateMessage();
    };

    const notificationsClickHandler = () => {
      resetNotificationCount();
    };

    document.getElementById('send').addEventListener('click', sendButtonClickHandler);
    document.getElementById('send-private').addEventListener('click', sendPrivateButtonClickHandler);
    document.getElementById('notifications').addEventListener('click', notificationsClickHandler);

    return () => {
      // Clean up event listeners
      document.getElementById('send').removeEventListener('click', sendButtonClickHandler);
      document.getElementById('send-private').removeEventListener('click', sendPrivateButtonClickHandler);
      document.getElementById('notifications').removeEventListener('click', notificationsClickHandler);
    };
  }, []);

  const showMessage = (message) => {
    const messagesElement = document.getElementById('messages');
    const newRow = document.createElement('tr');
    const newCell = document.createElement('td');
    newCell.textContent = message;
    newRow.appendChild(newCell);
    messagesElement.appendChild(newRow);
  };

  const sendMessage = () => {
    console.log("sending message");
    const messageContent = document.getElementById('message').value;
    console.log(messageContent);
    stompClient.send("/ws/message", {}, JSON.stringify({ 'messageContent': messageContent }));
  };

  const sendPrivateMessage = () => {
    console.log("sending private message");
    const privateMessageContent = document.getElementById('private-message').value;
    stompClient.send("/ws/private-message", {}, JSON.stringify({ 'messageContent': privateMessageContent }));
  };

  const updateNotificationDisplay = () => {
    const notificationsElement = document.getElementById('notifications');
    if (notificationCount === 0) {
      notificationsElement.style.display = 'none';
    } else {
      notificationsElement.style.display = 'inline';
      notificationsElement.textContent = notificationCount;
    }
  };

  const resetNotificationCount = () => {
    setNotificationCount(0);
    updateNotificationDisplay();
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <div className="row">
        <div className="col-md-12">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <input type="text" id="message" className="form-control" placeholder="Enter your message here..." />
            </div>
            <button id="send" className="btn btn-default" type="button">Send</button>
          </form>
        </div>
      </div>
      <div className="row" style={{ marginTop: '10px' }}>
        <div className="col-md-12">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="private-message">Private Message</label>
              <input type="text" id="private-message" className="form-control" placeholder="Enter your message here..." />
            </div>
            <button id="send-private" className="btn btn-default" type="button">Send Private Message</button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table id="message-history" className="table table-striped">
            <thead>
              <tr>
                <th>Messages
                  <span
                    id="notifications"
                    style={{
                      color: 'white',
                      backgroundColor: 'red',
                      paddingLeft: '15px',
                      paddingRight: '15px'
                    }}>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody id="messages">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App