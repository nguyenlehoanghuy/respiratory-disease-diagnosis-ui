export interface Diagnosis {
  diseases: string[];
}

export interface DiagnosisFormState {
  symptoms: string[];
  selectedSymptoms: string[];
  diagnosis: Diagnosis | null;
  selectedDisease: string | null;
  treatment: string[];
}
