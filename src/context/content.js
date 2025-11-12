// import { GoogleGenerativeAI } from "@google/generative-ai";
// // ✅ Guard clause to ensure the API key is present
// if (!process.env.GEMINI_API_KEY) {
//   throw new Error("GEMINI_API_KEY is not defined in environment variables.");
// }

// // Ensure the API key is available
// const ai = new GoogleGenerativeAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// async function main(prompt) {
//   try {
//     const model = ai.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     const text = await response.text();
//     console.log(text);
//     return text;
//   } catch (error) {
//     console.error("Error generating content:", error.message);
//     throw error;
//   }
// }

// export default main;
import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔹 यहाँ अपनी असली Gemini API key डालो
const ai = new GoogleGenerativeAI({
  apiKey: "AIzaSyCwZzNPpCuzM3YbRxSFTaUgFNXJZxeKL0k",
});

async function main(prompt) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text);
    return text;
  } catch (error) {
    console.error("Error:", error);
    return "Something went wrong! Check console for details.";
  }
}

export default main;
