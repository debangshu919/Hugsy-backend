import express, { Router } from 'express';
import serverless from "serverless-http";
import bodyParser from 'body-parser';
import cors from 'cors';
import { kidsChatbot } from './kids_chatbot.js';
import { parentsChatbot } from './parents_chatbot.js';

const router = Router();
const app = express();

app.use(bodyParser.json());
app.use(cors());

// API ROUTES
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Hugsy API! Please use /api/chatbot endpoint.');
});

router.get('/kids', async (req, res) => {
    const { prompt } = req.query;

    if (!prompt) {
        return res.status(400).json({
            statusCode: 400,
            status: 'error',
            message: 'Prompt is required',
            request: {
                prompt: prompt,
            },
            response: 'Prompt is required',
        });
    }

    const response = await kidsChatbot(prompt);
    if (response.error) {
        return res.status(500).json({
            statusCode: 500,
            status: 'error',
            message: 'Internal server error',
            request: {
                prompt: prompt,
            },
            response: response.error ? response.error : 'An error occurred while processing your request',
        });
    }

    return res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Data fetched successfully',
        request: {
            prompt: prompt,
        },
        response: response,
    });
});

router.get('/parents', async (req, res) => {
    const { prompt } = req.query;

    if (!prompt) {
        return res.status(400).json({
            statusCode: 400,
            status: 'error',
            message: 'Prompt is required',
            request: {
                prompt: prompt,
            },
            response: 'Prompt is required',
        });
    }

    const response = await parentsChatbot(prompt);
    if (response.error) {
        return res.status(500).json({
            statusCode: 500,
            status: 'error',
            message: 'Internal server error',
            request: {
                prompt: prompt,
            },
            response: response.error ? response.error : 'An error occurred while processing your request',
        });
    }

    return res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Data fetched successfully',
        request: {
            prompt: prompt,
        },
        response: response,
    });
});

app.use('/api/', router);
export const handler = serverless(app);
