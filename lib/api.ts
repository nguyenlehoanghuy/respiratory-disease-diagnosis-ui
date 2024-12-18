import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const api = {
  fetchSymptoms: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/symptoms`);
      return response.data.symptoms;
    } catch (error) {
      console.error("Failed to fetch symptoms", error);
      throw error;
    }
  },

  diagnose: async (symptoms: string[]) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/diagnose`, {
        symptoms,
      });
      return response.data;
    } catch (error) {
      console.error("Diagnosis failed", error);
      throw error;
    }
  },

  fetchTreatment: async (diseaseName: string) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/treatment/${diseaseName}`
      );
      return response.data.treatments || [];
    } catch (error) {
      console.error("Failed to fetch treatment", error);
      throw error;
    }
  },
};
