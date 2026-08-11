import axios from "axios";

const ACNE_API_URL = process.env.REACT_APP_ACNE_API_URL || "http://localhost:5001/predict";

export async function analyzeAcne(imageFile) {
  if (!imageFile) {
    throw new Error("Please select an image before starting analysis.");
  }

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("file", imageFile);

  try {
    const response = await axios.post(ACNE_API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 120000,
    });

    const data = response.data;

    if (data === undefined || data === null) {
      throw new Error("The acne analysis service did not return a result.");
    }

    return typeof data === "string" ? { message: data } : data;
  } catch (error) {
    if (error.response) {
      const serverMessage =
        error.response.data?.error ||
        error.response.data?.message ||
        error.response.data?.detail;

      throw new Error(
        serverMessage ||
          `Analysis failed (server responded with status ${error.response.status}).`
      );
    }

    if (error.request) {
      throw new Error(
        "Unable to reach the acne analysis server. Please confirm it is running on http://localhost:5001/predict."
      );
    }

    throw new Error(error.message || "An unexpected error occurred during analysis.");
  }
}
