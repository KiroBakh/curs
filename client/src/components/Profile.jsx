import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientRecordModal from "../layouts/PatientRecordModal";
import "../styles/Profile.css";

export default function Profile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [contextMenuPos, setContextMenuPos] = useState({ top: 0, left: 0 });
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [automatedResponses, setAutomatedResponses] = useState([]);

  const closeChat = () => {
    setIsChatOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        console.log(error.response?.status);
      });
  }, [id]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setChatMessages([...chatMessages, message]);
      setMessage("");
      if (chatMessages.length === 0) {
        setTimeout(() => {
          const automatedResponse =
            "Здрастуйте! Я ваш особистий асистент, незабаром ми зв'яжемо вас із вашим лікарем";
          setAutomatedResponses([...automatedResponses, automatedResponse]);
        }, 1500);
      }
    }
  };

  const handleContextMenu = (event, index) => {
    event.preventDefault();
    setSelectedMessage(index);
    setContextMenuPos({ top: event.clientY, left: event.clientX });
    setIsContextMenuVisible(true);
  };

  const handleEditMessage = () => {
    if (selectedMessage !== null) {
      const editedMessage = prompt(
        "Введите отредактированное сообщение",
        chatMessages[selectedMessage]
      );
      if (editedMessage !== null) {
        const updatedMessages = [...chatMessages];
        updatedMessages[selectedMessage] = editedMessage;
        setChatMessages(updatedMessages);
        setSelectedMessage(null);
        setIsContextMenuVisible(false);
      }
    }
  };

  const handleDeleteMessage = () => {
    if (selectedMessage !== null) {
      const confirmation = window.confirm(
        "Вы уверены, что хотите удалить это сообщение?"
      );
      if (confirmation) {
        const updatedMessages = [...chatMessages];
        updatedMessages.splice(selectedMessage, 1);
        setChatMessages(updatedMessages);
        setSelectedMessage(null);
        setIsContextMenuVisible(false);
      }
    }
  };

  return (
    <div className="prof">
      {employee ? (
        <div className="profile">
          <div className="profile-photo">
            <img src={employee.photoUrl} alt={employee.name} />
          </div>
          <div className="profile-details">
            <h2 className="profile-name">{employee.name}</h2>
            <p className="profile-info">
              <span className="context">Посада:</span> {employee.position}
            </p>
            <p className="profile-info">
              <span className="context">Ранг:</span> {employee.rank}
            </p>
            <p className="profile-info">
              <span className="context">Контактна інформація:</span>{" "}
              {employee.contactinformation}
            </p>
            <button className="btnOrder" onClick={() => setIsModalOpen(true)}>
              Записатись
            </button>
            <button className="btnChat" onClick={() => setIsChatOpen(true)}>
              Зв'язатися з лікарем
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-error">Профіль не знайден</div>
      )}

      {isModalOpen && (
        <PatientRecordModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          employee={employee}
          employeeIdFromAPI={id}
        />
      )}
      {isChatOpen && (
        <div className="chat-overlay">
          <div className="chat-container">
            <div className="chat-messages">
              <div className="close-button" onClick={closeChat}>
                x
              </div>
              {chatMessages.map((chatMessage, index) => (
                <div
                  key={index}
                  className="chat-message"
                  onContextMenu={(event) => handleContextMenu(event, index)}
                >
                  {chatMessage}
                </div>
              ))}
              {automatedResponses.map((response, index) => (
                <div key={index} className="autoAnswer">
                  {response}
                </div>
              ))}
            </div>
            <div className="send">
              <input
                className="chat-input"
                type="text"
                placeholder="Введіть повідомлення"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="send-button" onClick={handleSendMessage}>
                ◊
              </button>
              {isContextMenuVisible && (
                <div
                  className="context-menu"
                  style={{ top: contextMenuPos.top, left: contextMenuPos.left }}
                >
                  <div
                    className="context-menu-item"
                    onClick={handleEditMessage}
                  >
                    Редагувати
                  </div>
                  <div
                    className="context-menu-item"
                    onClick={handleDeleteMessage}
                  >
                    Видалити
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
