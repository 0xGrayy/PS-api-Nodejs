import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/ps4-store", async (req: Request, res: Response) => {
  try {

    // Put your values here (Game = "Your Game", Size = "Your Size")
    const response = await getPS4StoreData("grand", "100");

    // Send the combined data as a response
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function getPS4StoreData(query: string, size: string) {
  const url = `https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/SA/en/999/${query}?suggested_size=${size}&mode=game`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return { error: "Internal Server Error" };
  }
}
