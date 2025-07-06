import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

interface FineTuningJobRequest {
  training_file: string;
  model: string;
}

async function createFineTuningJob() {
  try {
    const requestData: FineTuningJobRequest = {
      training_file: "file-JxogVgUpmdhmrkfTkQibJm",
      model: "gpt-4o-2024-08-06",
    };

    const response = await axios.post(
      "https://api.openai.com/v1/fine_tuning/jobs",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    console.log("Fine-tuning job creation response:", response.data);
  } catch (error) {
    console.error(
      "Error creating fine-tuning job:",
      error.response?.data || error.message
    );
  }
}

// Execute the function
createFineTuningJob();
