import React from "react";

// Định nghĩa interface cho Disease
interface Disease {
  id: string;
  label: string;
}

interface DiseaseListProps {
  diagnosis: { diseases: Disease[] } | null;  // Cập nhật kiểu dữ liệu
  fetchTreatment: (diseaseId: string) => void;
}

const DiseaseList: React.FC<DiseaseListProps> = ({ diagnosis, fetchTreatment }) => {
  return (
    <div style={styles.container}>
      {diagnosis && diagnosis.diseases && diagnosis.diseases.length > 0 ? (
        <div>
          <h3 style={styles.heading}>Diagnosis Results:</h3>
          <div style={styles.diseaseListContainer}>
            {diagnosis.diseases.map((disease: Disease) => (
              <button
                key={disease.id}
                onClick={() => fetchTreatment(disease.id)} // Sử dụng disease.id
                style={styles.diseaseButton}
              >
                {disease.label} {/* Hiển thị label */}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p style={styles.noDiseasesMessage}>No diseases found. Please select more symptoms.</p>
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
  diseaseListContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "15px",
    justifyContent: "center",
  },
  diseaseButton: {
    padding: "15px 20px",
    backgroundColor: "#4CAF50", 
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    textAlign: "center",
    width: "100%",
  },
  noDiseasesMessage: {
    textAlign: "center",
    color: "#777",
    fontSize: "18px",
    marginTop: "20px",
  },
};

export default DiseaseList;