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
                            "text": "I cant focus on my studies"
                        }
                    ]
                },
                {
                    "role": "assistant",
                    "content": [
                        {
                            "type": "text",
                            "text": "It can be overwhelming with multiple challenges. ADHD can make it hard to focus, while Dyslexia can make reading and writing difficult. Dyscalculia affects math, and Dysgraphia makes writing hard. Tourette's can also impact focus.\n\nLet's break it down: What specific areas do you struggle with in your studies?"
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "i get distracted too often"
                        }
                    ]
                },
                {
                    "role": "assistant",
                    "content": [
                        {
                            "type": "text",
                            "text": "Distractibility is common. ADHD can make it hard to stay on track. Try breaking tasks into smaller chunks, using the Pomodoro Technique (25 minutes work + 5 minutes break). This can help you stay focused.\n\nAdditionally, consider using a planner or app to stay organized and on track."
                        }
                    ]
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
