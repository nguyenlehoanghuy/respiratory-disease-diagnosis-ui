'use client';

import React, { useState, useEffect } from "react";
import SymptomSelection from "./SymptomSelection";
import DiseaseList from "./DiseaseList";
import TreatmentModal from "./TreatmentModal";
import axios from "axios";

interface Symptom {
  id: string;
  label: string;
}

const DiagnosisForm: React.FC = () => {
  const [allSymptoms, setAllSymptoms] = useState<Symptom[]>([]); // Tất cả symptoms
  const [relatedSymptoms, setRelatedSymptoms] = useState<Symptom[]>([]); // Symptoms liên quan
  const [displayedSymptoms, setDisplayedSymptoms] = useState<Symptom[]>([]); // Symptoms đang hiển thị
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [treatment, setTreatment] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasFirstSelection, setHasFirstSelection] = useState(false);

  // Lấy tất cả triệu chứng ban đầu
  const fetchInitialSymptoms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/symptoms");
      const symptoms = response.data.symptoms;
      setAllSymptoms(symptoms);
      setDisplayedSymptoms(symptoms);
    } catch (error) {
      alert("Failed to load symptoms. Please try again.");
    }
  };

  // Lấy các triệu chứng liên quan (chỉ gọi 1 lần sau lần chọn đầu tiên)
  const fetchRelatedSymptoms = async (symptomId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/symptoms/${symptomId}/related`);
      const relatedSyms = response.data.symptoms;
      setRelatedSymptoms(relatedSyms);
      setDisplayedSymptoms(relatedSyms);
      setHasFirstSelection(true);
    } catch (error) {
      console.error("Failed to fetch related symptoms:", error);
    }
  };

  // Chẩn đoán bệnh
  const diagnose = async (symptoms: string[]) => {
    try {
      const response = await axios.post("http://localhost:5000/api/diagnose", {
        symptoms: symptoms,
      });
      setDiagnosis(response.data);
    } catch (error) {
      alert("Diagnosis failed. Please try again.");
    }
  };

  // Xử lý việc chọn triệu chứng
  const handleSelectSymptom = async (symptomId: string) => {
    let newSelectedSymptoms;
    
    if (selectedSymptoms.includes(symptomId)) {
      // Nếu đã chọn thì bỏ chọn
      newSelectedSymptoms = selectedSymptoms.filter(id => id !== symptomId);
      
      if (newSelectedSymptoms.length === 0) {
        // Nếu không còn triệu chứng nào được chọn
        setDisplayedSymptoms(allSymptoms);
        setHasFirstSelection(false);
        setDiagnosis(null);
      }
    } else {
      // Nếu chưa chọn thì thêm vào
      newSelectedSymptoms = [...selectedSymptoms, symptomId];
      
      // Chỉ fetch related symptoms nếu đây là lần chọn đầu tiên
      if (!hasFirstSelection) {
        await fetchRelatedSymptoms(symptomId);
      }
    }
    
    setSelectedSymptoms(newSelectedSymptoms);
    if (newSelectedSymptoms.length > 0) {
      diagnose(newSelectedSymptoms);
    }
  };

  // Hiển thị lại tất cả triệu chứng
  const handleShowAllSymptoms = () => {
    setDisplayedSymptoms(allSymptoms);
    setSelectedSymptoms([]);
    setHasFirstSelection(false);
    setDiagnosis(null);
  };

  // Lấy phương pháp điều trị
  const fetchTreatment = async (diseaseName: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/treatment/${diseaseName}`);
      setTreatment(response.data.treatments || []);
      setSelectedDisease(diseaseName);
    } catch (error) {
      alert("Failed to load treatment. Please try again.");
    }
  };

  const openTreatmentModal = (diseaseName: string) => {
    fetchTreatment(diseaseName);
    setIsModalOpen(true);
  };

  const closeTreatmentModal = () => {
    setIsModalOpen(false);
    setSelectedDisease(null);
    setTreatment([]);
  };

  useEffect(() => {
    fetchInitialSymptoms();
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <SymptomSelection
        symptoms={displayedSymptoms}
        selectedSymptoms={selectedSymptoms}
        handleSelectSymptom={handleSelectSymptom}
        isInitialView={!hasFirstSelection}
        handleShowAllSymptoms={handleShowAllSymptoms}
        allSymptoms={allSymptoms}
      />

      <DiseaseList diagnosis={diagnosis} fetchTreatment={openTreatmentModal} />

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