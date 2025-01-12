import React from "react";

interface Symptom {
  id: string;
  label: string;
}

interface SymptomSelectionProps {
  symptoms: Symptom[];
  selectedSymptoms: string[];
  handleSelectSymptom: (symptomId: string) => void;
  isInitialView: boolean;
  handleShowAllSymptoms: () => void;
  allSymptoms: Symptom[];
}

const SymptomSelection: React.FC<SymptomSelectionProps> = ({
  symptoms,
  selectedSymptoms,
  handleSelectSymptom,
  isInitialView,
  handleShowAllSymptoms,
  allSymptoms
}) => {
  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Choose Symptoms</h3>
      
      {!isInitialView && (
        <button 
          onClick={handleShowAllSymptoms}
          style={styles.showAllButton}
        >
          Show All Symptoms
        </button>
      )}

      <div style={styles.buttonContainer}>
        {symptoms.map((symptom) => (
          <button
            key={symptom.id}
            onClick={() => handleSelectSymptom(symptom.id)}
            style={{
              ...styles.button,
              backgroundColor: selectedSymptoms.includes(symptom.id)
                ? "#FF5733"
                : "#4CAF50",
            }}
          >
            {symptom.label}
          </button>
        ))}
      </div>

      {selectedSymptoms.length > 0 && (
        <div style={styles.selectedSymptomsContainer}>
          <h4 style={styles.selectedHeading}>Selected Symptoms:</h4>
          <div style={styles.selectedList}>
            {selectedSymptoms.map((symptomId, index) => {
              const symptom = allSymptoms.find((s) => s.id === symptomId);
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
    textAlign: "center" as const,
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
  showAllButton: {
    padding: "10px 20px",
    margin: "0 auto 20px",
    display: "block",
    backgroundColor: "#666",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
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
    flexWrap: "wrap" as const,
    gap: "10px",
    justifyContent: "center",
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