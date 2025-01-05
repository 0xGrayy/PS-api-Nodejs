import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.PS4_API_URL || "https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/SA/en/999";

app.get("/ps4-store", async (req: Request, res: Response) => {
  const { query, size } = req.query;

  if (!query || !size) {
    return res.status(400).json({ error: "Missing required query parameters 'query' or 'size'" });
  }

  try {
    const response = await getPS4StoreData(query as string, size as string);
    res.json(response);
  } catch (error) {
    console.error("Error fetching PS4 Store data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define the return type to ensure type safety
interface PS4StoreResponse {
  data: any;  // Replace with actual response structure if known
  error?: string;
}

async function getPS4StoreData(query: string, size: string): Promise<PS4StoreResponse> {
  const url = `${API_URL}/${query}?suggested_size=${size}&mode=game`;

  try {
    const response = await axios.get(url);
    return { data: response.data };  // Return the actual data when successful
  } catch (error) {
    // Check if the error has a message property, and handle accordingly
    if (axios.isAxiosError(error)) {
      console.error("API request failed:", error.message);
      return { data: null, error: "Failed to fetch data from PS4 store" };
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
      return { data: null, error: "Unexpected error occurred" };
    } else {
      console.error("Unknown error occurred");
      return { data: null, error: "Unknown error occurred" };
    }
  }
}
