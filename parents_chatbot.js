import { OpenAI } from "openai";
import { NEBIUS_API_KEY } from "./config.js";

const client = new OpenAI({
    baseURL: "https://api.studio.nebius.com/v1/",
    apiKey: NEBIUS_API_KEY,
});

export async function parentsChatbot(prompt) {
    try {
        const completion = await client.chat.completions.create({
            "model": "meta-llama/Llama-3.2-1B-Instruct",
            "temperature": 0,
            "messages": [
                {
                    "role": "system",
                    "content": "you are a health chatbot. you will be dealing with patients having any these diseases: ADHD, Dyslexia, Dyscalculia, Dysgraphia, Tourette's Syndrome. Keep the responses short like max 100 words."
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt
                        }
                    ]
                }
            ]
        })

        const response = await completion.choices[0].message.content;
        console.log(response);

        return response;
    } catch (error) {
        console.log(error);
        return { error: "Failed to generate response." };
    }

}
