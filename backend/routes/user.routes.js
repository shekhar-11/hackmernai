import express from 'express';
import genController from '../controllers/gemini.controller.js';

const generate = express.Router();

generate.post('/generate/generateCourse', genController);

export default generate;
