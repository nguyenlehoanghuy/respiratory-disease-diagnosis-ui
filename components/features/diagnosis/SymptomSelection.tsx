import React from "react";

interface SymptomSelectionProps {
  symptoms: any[];  // Mảng triệu chứng có thể có cấu trúc { id: string, label: string }
  selectedSymptoms: string[];  // Mảng chứa các symptom id đã chọn
  handleSelectSymptom: (symptomId: string) => void;  // Hàm xử lý chọn triệu chứng, nhận vào symptom id
}

const SymptomSelection: React.FC<SymptomSelectionProps> = ({ symptoms, selectedSymptoms, handleSelectSymptom }) => {
  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Choose Symptoms</h3>
      <div style={styles.buttonContainer}>
        {symptoms.map((symptom) => (
          <button
            key={symptom.id}  // Dùng id làm key để tránh lỗi khi có triệu chứng trùng lặp
            onClick={() => handleSelectSymptom(symptom.id)}  // Truyền id của triệu chứng khi chọn
            style={{
              ...styles.button,
              backgroundColor: selectedSymptoms.includes(symptom.id) ? "#FF5733" : "#4CAF50",  // Nếu triệu chứng đã chọn thì đổi màu
            }}
          >
            {symptom.label}  {/* Hiển thị label của triệu chứng */}
          </button>
        ))}
      </div>

      {selectedSymptoms.length > 0 && (
        <div style={styles.selectedSymptomsContainer}>
          <h4 style={styles.selectedHeading}>Selected Symptoms:</h4>
          <div style={styles.selectedList}>
            {selectedSymptoms.map((symptomId, index) => {
              const symptom = symptoms.find((s) => s.id === symptomId);
              return symptom ? (
                <div key={index} style={styles.selectedItem}>
                  {symptom.label}
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "15px",
    justifyContent: "center",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  selectedSymptomsContainer: {
    marginTop: "30px",
  },
  selectedHeading: {
    fontSize: "18px",
    color: "#444",
    marginBottom: "10px",
  },
  selectedList: {
    display: "flex",
    flexWrap: "wrap",  // Cho phép các thẻ triệu chứng đã chọn chuyển sang dòng mới khi hết chỗ
    gap: "10px",  // Khoảng cách giữa các thẻ triệu chứng
    justifyContent: "center",  // Căn giữa các thẻ triệu chứng
  },
  selectedItem: {
    backgroundColor: "#f2f2f2",
    padding: "10px 15px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    fontSize: "16px",
    color: "#333",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default SymptomSelection;