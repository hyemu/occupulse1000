import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Sidebar = styled.div`
  width: 350px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const ConversationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ConversationItem = styled(motion.li)`
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 120, 212, 0.1);
  }
`;

const ConversationName = styled.h3`
  margin: 0 0 5px 0;
  color: #333;
`;

const LastMessage = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ConversationHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ConversationTitle = styled.h2`
  margin: 0;
  color: #0078d4;
`;

const MessageList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Message = styled.div`
  max-width: 70%;
  margin-bottom: 15px;
  padding: 10px 15px;
  border-radius: 18px;
  background-color: ${props => props.isOwn ? '#0078d4' : '#f0f0f0'};
  color: ${props => props.isOwn ? 'white' : 'black'};
  align-self: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
`;

const ReplyContainer = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ReplyInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1rem;
`;

const MessagesIndex = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch conversations
    const fetchConversations = async () => {
      const dummyConversations = [
        { id: 1, name: "Ma'am Perez", lastMessage: "We will move the consultation by 2:30pm" },
        { id: 2, name: 'Hanni Pham', lastMessage: "Hey, how's it going?, Can we meet tomorrow?" },
        { id: 3, name: 'Team Project', lastMessage: "Drake: I've uploaded the files." },
      ];
      setConversations(dummyConversations);
    };

    fetchConversations();
  }, []);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <AppContainer>
      <Sidebar>
        <ConversationList>
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              onClick={() => handleConversationClick(conversation)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ConversationName>{conversation.name}</ConversationName>
              <LastMessage>{conversation.lastMessage}</LastMessage>
            </ConversationItem>
          ))}
        </ConversationList>
      </Sidebar>
      <MainContent>
        {selectedConversation ? (
          <>
            <ConversationHeader>
              <ConversationTitle>{selectedConversation.name}</ConversationTitle>
            </ConversationHeader>
            <MessageList>
              <Message>Hey, how's it going?, Can we meet tomorrow?</Message>
              <Message isOwn>Mmm...Not bad, just working on some code. You?</Message>
              <Message>Same here. Want to grab lunch later instead?</Message>
              <Message isOwn>Sure, sounds good!</Message>
            </MessageList>
            <ReplyContainer>
              <ReplyInput type="text" placeholder="Type a message..." />
            </ReplyContainer>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </MainContent>
    </AppContainer>
  );
};

export default MessagesIndex;