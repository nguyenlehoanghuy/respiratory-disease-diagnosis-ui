'use client';

import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to Respiratory Disease Diagnosis!</h1>
      <Link href="/diagnosis">
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Start Diagnosis
        </button>
      </Link>
    </div>
  );
}

// import React, { useState } from "react";
// import axios from "axios";

// export default function Page() {
//     const [symptoms, setSymptoms] = useState<string[]>([]);
//     const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
//     const [diagnosis, setDiagnosis] = useState<any>(null);
//     const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
//     const [treatment, setTreatment] = useState<string[]>([]);

//     // Hàm lấy triệu chứng ban đầu
//     const fetchInitialSymptoms = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/symptoms");
//             setSymptoms(response.data.symptoms);
//         } catch (error) {
//             alert("Failed to load symptoms. Please try again.");
//         }
//     };

//     // Hàm chẩn đoán bệnh
//     const diagnose = async () => {
//         try {
//             const response = await axios.post("http://localhost:5000/api/diagnose", {
//                 symptoms: selectedSymptoms,
//             });
//             setDiagnosis(response.data);
//             setSelectedDisease(null); // Reset disease selection when new diagnosis is made
//             setTreatment([]); // Reset treatment when new diagnosis is made
//         } catch (error) {
//             alert("Diagnosis failed. Please try again.");
//         }
//     };

//     // Hàm chọn triệu chứng
//     const handleSelectSymptom = (symptom: string) => {
//         if (!selectedSymptoms.includes(symptom)) {
//             setSelectedSymptoms([...selectedSymptoms, symptom]);
//         }
//     };

//     // Hàm lấy phương pháp điều trị cho bệnh đã chọn
//     const fetchTreatment = async (diseaseName: string) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/treatment/${diseaseName}`);
//             setTreatment(response.data.treatments || []);
//             setSelectedDisease(diseaseName); // Lưu bệnh đã chọn
//         } catch (error) {
//             alert("Failed to load treatment. Please try again.");
//         }
//     };

//     return (
//         <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
//             <h1>Respiratory Disease Diagnosis</h1>

//             {/* Chọn triệu chứng */}
//             {!symptoms.length && (
//                 <button
//                     onClick={fetchInitialSymptoms}
//                     style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
//                 >
//                     Start Diagnosis
//                 </button>
//             )}

//             <div>
//                 {symptoms.length > 0 && (
//                     <>
//                         <h3>Choose symptoms:</h3>
//                         <div>
//                             {symptoms.map((symptom, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => handleSelectSymptom(symptom)}
//                                     style={{
//                                         padding: "10px 15px",
//                                         margin: "5px",
//                                         cursor: "pointer",
//                                         backgroundColor: "#4CAF50",
//                                         color: "white",
//                                         border: "none",
//                                         borderRadius: "5px",
//                                     }}
//                                 >
//                                     {symptom}
//                                 </button>
//                             ))}
//                         </div>
//                     </>
//                 )}
//             </div>

//             {/* Triệu chứng đã chọn */}
//             <div>
//                 {selectedSymptoms.length > 0 && (
//                     <>
//                         <h3>Selected Symptoms:</h3>
//                         <ul>
//                             {selectedSymptoms.map((symptom, index) => (
//                                 <li key={index} style={{ fontSize: "16px", marginBottom: "5px" }}>
//                                     {symptom}
//                                 </li>
//                             ))}
//                         </ul>
//                         <button
//                             onClick={diagnose}
//                             style={{
//                                 padding: "10px 20px",
//                                 fontSize: "16px",
//                                 cursor: "pointer",
//                                 backgroundColor: "#FF5722",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "5px",
//                             }}
//                         >
//                             Diagnose
//                         </button>
//                     </>
//                 )}
//             </div>

//             {/* Hiển thị kết quả chẩn đoán */}
//             {diagnosis && (
//                 <div>
//                     <h3>Diagnosis:</h3>
//                     {diagnosis.diseases ? (
//                         <ul>
//                             {diagnosis.diseases.map((disease: string, index: number) => (
//                                 <li
//                                     key={index}
//                                     style={{ fontSize: "16px", marginBottom: "5px", cursor: "pointer" }}
//                                     onClick={() => fetchTreatment(disease)} // Khi chọn bệnh sẽ gọi fetchTreatment
//                                 >
//                                     {disease}
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>{diagnosis.message}</p>
//                     )}
//                 </div>
//             )}

//             {/* Hiển thị phương pháp điều trị khi chọn bệnh */}
//             {selectedDisease && treatment.length > 0 && (
//                 <div>
//                     <h3>Treatment for {selectedDisease}:</h3>
//                     <ul>
//                         {treatment.map((item, index) => (
//                             <li key={index} style={{ fontSize: "16px", marginBottom: "5px" }}>
//                                 {item}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }
