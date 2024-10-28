import axios from "axios";

const API_BASE_URL =
  "https://recruiting.verylongdomaintotestwith.ca/api/{maxcutex}/character";

export const saveCharacterData = async (data: any) => {
  try {
    await axios.post(API_BASE_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Character data saved successfully.");
  } catch (error) {
    console.error("Failed to save character data:", error);
  }
};

export const fetchCharacterData = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch character data:", error);
    return null;
  }
};
