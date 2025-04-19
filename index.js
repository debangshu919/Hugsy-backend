import express, { request, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PORT } from './config.js';
import { kidsChatbot } from './kids_chatbot.js';
import { parentsChatbot } from './parents_chatbot.js';

const router = Router();
const app = express();

app.use(bodyParser.json());
app.use(cors());

// API ROUTES
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Hugsy API! Please use /api/kids or /api/parents endpoints.');
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})