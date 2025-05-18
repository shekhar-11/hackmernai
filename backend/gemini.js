// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "" });

// function isValidLearningTopic(topic) {
//   const disallowed = [
//     "joke", "weather", "movie", "news", "celebrity", "gossip", "sports",
//     "love", "chat", "fun", "horoscope", "random", "politics"
//   ];
//   const t = topic.toLowerCase();
//   return !disallowed.some(d => t.includes(d)) && t.length > 3;
// }

// async function generateCourseParts(topic) {
//   if (!isValidLearningTopic(topic)) {
//     console.error("❌ Only educational or course-related topics are allowed.");
//     return;
//   }

//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: `
// You are a micro-course generator.

// Generate a 5-part mini course for the topic: "${topic}". Each part must be in this JSON format:

// [
//   {
//     "title": "Lesson 1 Title",
//     "content": "Detailed content for lesson 1..."
//   },
//   {
//     "title": "Lesson 2 Title",
//     "content": "Detailed content for lesson 2..."
//   },
//   {
//     "title": "Lesson 3 Title",
//     "content": "Detailed content for lesson 3..."
//   },
//   {
//     "title": "Lesson 4 Title",
//     "content": "Detailed content for lesson 4..."
//   },
//   {
//     "title": "Lesson 5 Title",
//     "content": "Detailed content for lesson 5..."
//   }
// ]

// Only return JSON. Do not include explanations, greetings, or markdown.
// `
//     });

//     // Print the raw text output from the model
    
//   } catch (err) {
//     console.error("Error in generateCourseParts:", err);
//   }
// }

// // Example usage:
// const userInput = "machine learning";

// generateCourseParts(userInput);






import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAE-yZygJ-hs6Km6uH2oBOuLay4_MSW7Ak" });

function isValidLearningTopic(topic) {
  const disallowed = [
    "joke", "weather", "movie", "news", "celebrity", "gossip", "sports",
    "love", "chat", "fun", "horoscope", "random", "politics"
  ];
  const t = topic.toLowerCase();
  return !disallowed.some(d => t.includes(d)) && t.length > 3;
}

async function generateCourseParts(topic) {
  if (!isValidLearningTopic(topic)) {
    console.error("❌ Only educational or course-related topics are allowed.");
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
You are a micro-course generator.

Generate a 5-part mini course for the topic: "${topic}".

The output should be a JSON object with two keys: "lessons" and "quiz".

- "lessons" is an array of 5 lessons. Each lesson has "title" and "content".
- "quiz" is an array of 5 questions, one per lesson. Each question has:
  - "question": the question text,
  - "options": an array of 4 answer options,
  - "correctOption": the index (0-3) of the correct option.

Return only JSON. No explanations, greetings, or markdown.

Example format:

{
  "lessons": [
    {"title": "Lesson 1 Title", "content": "Detailed content for lesson 1..."},
    ...
  ],
  "quiz": [
    {
      "question": "Question for lesson 1?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctOption": 2
    },
    ...
  ]
}
`
    });

    // Print the raw text output from the model
    console.log("Model output:\n", response.text);
  } catch (err) {
    console.error("Error in generateCourseParts:", err);
  }
}

// Example usage:
const userInput = "machine learning";

generateCourseParts(userInput);

