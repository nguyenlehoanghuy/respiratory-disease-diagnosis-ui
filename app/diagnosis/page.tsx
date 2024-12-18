import React, { useState } from "react";
import DiagnosisForm from "../../components/features/diagnosis/DiagnosisForm";

export default function DiagnosisPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Start Diagnosis</h1>
      <DiagnosisForm />
    </div>
  );
}