import React, {   createRef , useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./MessageForm.css";





function MessageForm(props) {

    /**Overall, this code sets up the state for message and retrieves the user object from the Redux store. It also accesses the AppContext to retrieve data related to the current chat room and messages. Finally, it creates a reference to the end of the message container. */
    const [message, setMessage] = useState("");
    const user = useSelector((state) => state.user); // for user
    const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
    const [file, setFile] = useState(null);
    const messageEndRef = useRef(null);
    const inputRef = createRef();

   // const [selectedFile, setSelectedFile] = useState(null);
  
    
   
  
    // function handleOnDrop(files) {
    //     setFile(files[0]);
    
    //     let formData = new FormData();
    //     formData.append('file', files[0]);
    
    //     fetch('http://localhost:5000/upload', {
    //       method: 'POST',
    //       body: formData,
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log('Uploaded image data: ', data);
    
    //         // Emit the "room-messages" event with the uploaded image data
    //         socket.emit('room-messages', {
    //           type: 'image',
    //           url: `http://localhost:5000/${data.filename}`,
    //           roomId: props.roomId,
    //         });
    
    //         // Update your local state or trigger any other actions
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }
    
    //   function handleMessageSubmit(event) {
    //     event.preventDefault();
    //     const message = event.target.elements.message.value;
    //     socket.emit('room-message', {
    //       content: message,
    //       roomId: props.roomId,
    //       sender: props.user,
    //     });
    //     event.target.elements.message.value = '';
    //   }
    
      // Listen for incoming messages from the server
     
     
    //   socket.on('message', (message) => {
    //     setMessages([...messages, message]);
    //   });
    
    

 
    

/**By using this useEffect hook, the developer is ensuring that the user always sees the most recent message in the message container without having to manually scroll to the bottom. */
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

   
      
    /*This code defines a function called getFormattedDate that returns a formatted date string in the format of MM/DD/YYYY.

When called, the function first creates a new Date object using the current date and time. It then extracts the year from the date object using the getFullYear() method.

The function then extracts the month from the date object using the getMonth() method. However, since the getMonth() method returns the month number starting from 0, 1 is added to it before being converted to a string.

Next, the code checks whether the length of the month string is greater than 1. If it is, the month variable is left unchanged. Otherwise, a "0" is prepended to the month string using the concatenation operator +.

The code then extracts the day from the date object using the getDate() method. Similar to the previous step, the code checks whether the length of the day string is greater than 1. If it is not, a "0" is prepended to the day string.

Finally, the function returns a string that concatenates the month, day, and year variables in the format of MM/DD/YYYY. */

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }

 

      
    function handleSubmit(e) {
        e.preventDefault();
    }

/*this code defines a function that scrolls the message container to the bottom using the scrollIntoView method with smooth animation. This function is typically called after a new message is added to the container to ensure that the user always sees the most recent message. */
    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const todayDate = getFormattedDate();

    /*this code listens for the "room-messages" event emitted by the server and updates the messages state variable in the AppContext with the new messages data when the event is emitted. This allows the chat app to update the UI with the latest messages from the server. */
    socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
    });


    /*verall, this code handles the form submission in a chat app by preventing the default form submission behavior, emitting a message to the server with the appropriate data, and clearing the message state variable. */
    function handleSubmit(e) {
        e.preventDefault();
        if (!message) return;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, user, time, todayDate);
        setMessage("");
    }




   
  
   
    return (
        <>
        
            <div className="messages-output">
                
                {user && !privateMemberMsg?._id && <div className="alert alert-info">You are in the {currentRoom} room</div>}
                {user && privateMemberMsg?._id && (
                    <>
                        <div className="alert alert-info conversation-info">
                            <div>
                                Your conversation with {privateMemberMsg.name} <img src={privateMemberMsg.picture} className="conversation-profile-pic" />
                            </div>
                        </div>
                    </>

                )}
                
                {!user && <div className="alert alert-danger">Please login</div>}

                {user &&
                    messages.map(({ _id: date, messagesByDate }, idx) => (
                        <div key={idx}>
                            
                            <p className="alert alert-info text-center message-date-indicator">{date}</p>
                            {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                               
                                <div className={sender?.email == user?.email ? "message" : "incoming-message"} key={msgIdx}>
                                    <div className="message-inner">
                                        <div className="d-flex align-items-center mb-3">
                                            <img src={sender.picture} style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} />
                                            <p className="message-sender">{sender._id == user?._id ? "You" : sender.name}</p>
                                        </div>
                                        <p className="message-content">{content}</p>
                                        <p className="message-timestamp-left">{time}</p>
                                       
                                    </div>  
                                    


                                </div>

                                
                            ))}
                            
                        </div>
                        
                    ))}
                    
                <div ref={messageEndRef} />
            </div>



            <Form onSubmit={handleSubmit}>
                <Row>
                 
                    <Col md={9}>
                        <Form.Group className="d-flex">
                            
                       <Form.Control type="text" placeholder="Your message" disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)}></Form.Control>
                 
                            
                        </Form.Group>
                        </Col>


                  



                    <Col md={1} style={{ marginLeft: "15px" }}>
                        <Button variant="primary" type="submit" style={{ width: "100%", backgroundColor: "orange" }} disabled={!user}>
                            <i className="fas fa-paper-plane"></i>
                        </Button>
                    </Col>

                </Row>
            </Form>
        </>
    );
}

export default MessageForm;

/**
 the code renders different messages based on whether the user is in a public room or a private conversation with another member.



The first line of code checks if the user object exists, and if it does, it maps over the messages array using the Array.map() method. The messages array contains messages sorted by date, and each message is an object with the _id, messagesByDate, content, time, and sender properties.

For each date group of messages, the code renders a <div> element with the message-date-indicator class and displays the date as a message date indicator.

For each individual message, the code maps over the messagesByDate array using the Array.map() method. The content of each message is displayed along with the sender's name, profile picture, and timestamp. If the sender's email matches the current user's email, the message is displayed on the right side of the chat interface with the class name message. Otherwise, the message is displayed on the left side of the chat interface with the class name incoming-message.

The messageEndRef variable is a React ref that is used to scroll to the bottom of the chat interface when new messages are received. This is achieved by creating a <div> element with a ref attribute set to messageEndRef at the bottom of the messages list.

In summary, this code renders a list of messages with the message date indicator, sender's profile picture, name, message content, and timestamp, and scrolls to the bottom of the chat interface when new messages are received.


 */
