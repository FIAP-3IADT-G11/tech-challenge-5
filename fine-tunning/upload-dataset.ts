import axios from "axios";
import * as fs from "fs";
import * as FormData from "form-data";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config();

async function uploadDataset() {
  try {
    const formData = new FormData();
    const fileData = fs.createReadStream(
      path.join(__dirname, "datasets", "cloud_components_dataset.jsonl")
    );
    formData.append("purpose", "fine-tune");
    formData.append("file", fileData);

    const response = await axios.post(
      "https://api.openai.com/v1/files",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );

    console.log("File upload response:", response.data);
  } catch (error) {
    console.error(
      "Error uploading file:",
      error.response?.data || error.message
    );
  }
}

uploadDataset();
