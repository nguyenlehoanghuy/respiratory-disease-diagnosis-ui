import React from "react";

interface TreatmentProps {
  disease: string;
  treatment: string[];
}

const Treatment: React.FC<TreatmentProps> = ({ disease, treatment }) => {
  return (
    <div>
      <h3>Treatment for {disease}:</h3>
      <ul>
        {treatment.map((item, index) => (
          <li key={index} style={{ fontSize: "16px" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Treatment;