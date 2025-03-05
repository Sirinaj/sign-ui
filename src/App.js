import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

function App() {
  const sigCanvas = useRef(null);

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const saveSignature = () => {
    if (!sigCanvas.current) {
      console.error("SignatureCanvas is not initialized.");
      alert("กรุณาลงลายเซ็นก่อนบันทึก!");
      return;
    }

    try {
      let canvas = sigCanvas.current.getCanvas ? sigCanvas.current.getCanvas() : sigCanvas.current.getCanvas();
      if (!canvas) {
        console.error("Failed to get canvas.");
        alert("ไม่สามารถบันทึกลายเซ็นได้ กรุณาลองใหม่!");
        return;
      }
      const dataURL = canvas.toDataURL("image/jpeg", 1.0);
      
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "signature.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error saving signature:", error);
      alert("เกิดข้อผิดพลาดขณะบันทึกลายเซ็น");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <h2>กรุณาลงลายเซ็นของคุณ</h2>
      <div
        style={{
          border: "2px solid black",
          width: "400px",
          height: "200px",
          margin: "auto",
        }}
      >
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          backgroundColor="white"
          canvasProps={{ width: 400, height: 200, className: "sigCanvas" }}
        />
      </div>
      <br />
      <button onClick={clearSignature} style={buttonStyle}>ล้างลายเซ็น</button>
      <button onClick={saveSignature} style={buttonStyle}>บันทึก</button>
    </div>
  );
}

const buttonStyle = {
  margin: "10px",
  padding: "10px 15px",
  fontSize: "16px",
  cursor: "pointer",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
};

export default App;
