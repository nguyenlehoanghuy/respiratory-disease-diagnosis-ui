'use client';

import React, { useState, useEffect } from "react";
import SymptomSelection from "./SymptomSelection";
import DiseaseList from "./DiseaseList";
import TreatmentModal from "./TreatmentModal"; // Thêm import cho TreatmentModal
import axios from "axios";

const DiagnosisForm: React.FC = () => {
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [treatment, setTreatment] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal

  // Hàm lấy triệu chứng ban đầu
  const fetchInitialSymptoms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/symptoms");
      setSymptoms(response.data.symptoms);
    } catch (error) {
      alert("Failed to load symptoms. Please try again.");
    }
  };

  // Hàm chẩn đoán bệnh
  const diagnose = async (symptoms: string[]) => {
    try {
      const response = await axios.post("http://localhost:5000/api/diagnose", {
        symptoms: symptoms,
      });
      setDiagnosis(response.data); // Cập nhật danh sách bệnh
    } catch (error) {
      alert("Diagnosis failed. Please try again.");
    }
  };

  // Hàm chọn hoặc bỏ chọn triệu chứng
  const handleSelectSymptom = (symptomId: string) => {
    let newSelectedSymptoms;
  
    if (selectedSymptoms.includes(symptomId)) {
      // Nếu triệu chứng đã chọn, bỏ chọn nó
      newSelectedSymptoms = selectedSymptoms.filter(id => id !== symptomId);
    } else {
      // Nếu triệu chứng chưa chọn, thêm nó vào
      newSelectedSymptoms = [...selectedSymptoms, symptomId];
    }
  
    setSelectedSymptoms(newSelectedSymptoms);
  
    // Nếu không có triệu chứng nào được chọn, không gọi API chẩn đoán
    if (newSelectedSymptoms.length === 0) {
      setDiagnosis(null); // Xóa kết quả chẩn đoán nếu không có triệu chứng nào
    } else {
      // Nếu có triệu chứng, gọi API chẩn đoán lại với triệu chứng mới
      diagnose(newSelectedSymptoms);
    }
  };
  

  // Hàm lấy phương pháp điều trị cho bệnh đã chọn
  const fetchTreatment = async (diseaseName: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/treatment/${diseaseName}`);
      setTreatment(response.data.treatments || []);
      setSelectedDisease(diseaseName); // Lưu bệnh đã chọn
    } catch (error) {
      alert("Failed to load treatment. Please try again.");
    }
  };

  // Mở modal khi chọn bệnh
  const openTreatmentModal = (diseaseName: string) => {
    fetchTreatment(diseaseName);
    setIsModalOpen(true); // Mở modal
  };

  // Đóng modal
  const closeTreatmentModal = () => {
    setIsModalOpen(false);
    setSelectedDisease(null);
    setTreatment([]); // Reset các thông tin sau khi đóng modal
  };

  // Gọi hàm fetchInitialSymptoms ngay khi component render
  useEffect(() => {
    fetchInitialSymptoms();
  }, []); // [] chỉ gọi 1 lần khi component render lần đầu tiên

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Chọn triệu chứng */}
      <SymptomSelection
        symptoms={symptoms}
        selectedSymptoms={selectedSymptoms}
        handleSelectSymptom={handleSelectSymptom}
      />

      {/* Hiển thị kết quả chẩn đoán */}
      <DiseaseList diagnosis={diagnosis} fetchTreatment={openTreatmentModal} />

      {/* Hiển thị phương pháp điều trị trong modal */}
      <TreatmentModal
        diseaseName={selectedDisease || ""}
        treatments={treatment}
        isOpen={isModalOpen}
        onClose={closeTreatmentModal}
      />
    </div>
  );
};

export default DiagnosisForm;
