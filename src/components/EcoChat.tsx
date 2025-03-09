const EcoChat = () => {
  const openChatbot = () => {
    window.open("https://ecochat.streamlit.app/", "_blank");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>EcoChat - Sustainability Chatbot</h2>
      <button 
        onClick={openChatbot} 
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Open Chatbot
      </button>
    </div>
  );
};

export default EcoChat;
