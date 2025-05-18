import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey:process.env.GEMINI_API_KEY });

const bannedKeywords = [
  "sex", "porn", "nude", "violence", "kill", "terrorism", "rape", "nsfw",
  "drugs", "murder", "assault", "gore", "blood", "hate", "racism", "suicide"
];

function isInappropriate(text) {
  const lower = text.toLowerCase();
  return bannedKeywords.some(bad => lower.includes(bad));
}

async function correctTopic(rawInput) {
  const correctionPrompt = `
You are a helpful AI assistant for a tech education platform.

Your job is to interpret and correct a user's topic input.

The user is trying to learn a topic related to computer science, software development, artificial intelligence, machine learning, data science, web development, mobile development, or cloud computing.

Input: "${rawInput}"

If the input has typos, slang, or is unclear, guess the most likely **technical** or **educational** topic it refers to.

Only return the cleaned and corrected topic name as a plain string — no explanation or extra characters.
`;

  try {
    const correctionResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: correctionPrompt
    });

    if (!correctionResponse || !correctionResponse.text) {
      throw new Error("No response text from Gemini API");
    }

    const corrected = correctionResponse.text.trim().replace(/^"+|"+$/g, '');
    if (isInappropriate(corrected)) {
      throw new Error("❌ Inappropriate topic detected.");
    }

    return corrected;
  } catch (err) {
    console.error("❌ Topic correction failed:", err.message);
    throw err;
  }
}

async function generateCourseParts({userInputTopic}) {
  let correctedTopic;

  try {
    correctedTopic = await correctTopic(userInputTopic);
  } catch {
    return;
  }

  const coursePrompt = `
You are a micro-course generator.

The original user input was: "${userInputTopic}"
The corrected topic is: "${correctedTopic}"

Generate a 5-part mini course for the topic: "${correctedTopic}".

Return a JSON object with the following keys:
- "correctedTopic": the final, cleaned topic
- "lessons": an array of 5 lessons with "title" and "content"
- "quiz": an array of 5 questions (1 per lesson), each with:
  - "question": string,
  - "options": array of 4 strings,
  - "correctOption": index of the correct answer (0-3)

Only return pure JSON, no extra text or markdown.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: coursePrompt
    });

    if (!response || !response.text) {
      throw new Error("No response text from Gemini API");
    }

    const cleaned = response.text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const result = JSON.parse(cleaned);

    console.log(JSON.stringify(result, null, 2));
    return result;
  } catch (err) {
    console.error("❌ Error generating course:", err.message);
  }
}

export { generateCourseParts };
