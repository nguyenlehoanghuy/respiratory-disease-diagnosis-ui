import React from "react";

interface Treatment {
  id: string;
  label: string;
}

interface TreatmentModalProps {
  diseaseName: string;
  treatments: Treatment[]; // Thay đổi kiểu dữ liệu
  isOpen: boolean;
  onClose: () => void;
}

const TreatmentModal: React.FC<TreatmentModalProps> = ({ 
  diseaseName, 
  treatments = [], 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h3 style={styles.modalTitle}>Treatment for {diseaseName}:</h3>
        <ul style={styles.treatmentList}>
          {treatments.length > 0 ? (
            treatments.map((treatment) => (
              <li 
                key={treatment.id} 
                style={styles.treatmentItem}
              >
                {treatment.label}
              </li>
            ))
          ) : (
            <p>No treatments available for this disease.</p>
          )}
        </ul>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "500px",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  modalTitle: {
    fontSize: "24px",
    marginBottom: "15px",
    textAlign: "center",
  },
  treatmentList: {
    paddingLeft: "20px",
  },
  treatmentItem: {
    fontSize: "16px",
    marginBottom: "10px",
    paddingLeft: "15px",
    listStyleType: "disc",
  },
  closeButton: {
    display: "block",
    width: "100%",
    padding: "12px 0",
    backgroundColor: "#FF5733",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "20px",
  },
};

export default TreatmentModal;
