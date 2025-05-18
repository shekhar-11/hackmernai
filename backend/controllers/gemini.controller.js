import { generateCourseParts } from '../gemini.js';

const genController = async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const result = await generateCourseParts(topic);
    if (!result) {
      return res.status(400).json({ error: 'Could not generate course' });
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default genController;
