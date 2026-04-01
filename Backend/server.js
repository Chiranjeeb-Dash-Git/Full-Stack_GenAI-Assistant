import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.GROK_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
});

const tools = [
    {
        type: "function",
        function: {
            name: "search_web",
            description: "Search the web for real-time news, current events, and up-to-date information.",
            parameters: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description: "The search query to look for.",
                    },
                },
                required: ["query"],
            },
        },
    },
];

async function performSearch(query) {
    const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
    if (!TAVILY_API_KEY) {
        return "Search error: TAVILY_API_KEY is missing. Please add it to your .env file.";
    }

    try {
        const response = await fetch("https://api.tavily.com/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_key: TAVILY_API_KEY,
                query: query,
                search_depth: "basic",
                include_answer: true,
                max_results: 5,
            }),
        });

        const data = await response.json();
        return JSON.stringify(data.results.map(r => ({ title: r.title, content: r.content, url: r.url })));
    } catch (error) {
        console.error("Tavily search error:", error);
        return "Failed to fetch real-time data.";
    }
}

app.post('/api/chat', async (req, res) => {
    try {
        let { messages, model } = req.body;
        const selectedModel = model || 'llama-3.3-70b-versatile';

        // Clean previous messages to remove any unwanted branding from the context
        const cleanedMessages = messages.map(msg => ({
            ...msg,
            content: typeof msg.content === 'string' 
                ? msg.content.replace(/DASH INTELLIGENCE/gi, "AI Intelligence").replace(/DASH/gi, "AI")
                : msg.content
        }));

        const systemPrompt = {
            role: "system",
            content: "You are an advanced AI assistant named 'AI Intelligence'. Provide expert-level code, detailed summaries, and interactive support. Always use Markdown for formatting. IMPORTANT: NEVER call yourself 'DASH' or 'DASH INTELLIGENCE'. NEVER mention 'Odisha, India' or your location. When a user says 'hi', 'hello', or 'hey', your response must strictly be: 'Hello, how can I assist you?' or something very similar, without any location or branding details."
        };

        const currentMessages = [systemPrompt, ...cleanedMessages];

        // First pass: Ask the model if it needs tools
        const response = await client.chat.completions.create({
            model: selectedModel,
            messages: currentMessages,
            tools: tools,
            tool_choice: "auto",
            temperature: 0.7,
        });

        const responseMessage = response.choices[0].message;
        const toolCalls = responseMessage.tool_calls;

        if (toolCalls) {
            currentMessages.push(responseMessage); // Add assistant message with tool calls

            for (const toolCall of toolCalls) {
                if (toolCall.function.name === "search_web") {
                    const functionArgs = JSON.parse(toolCall.function.arguments);
                    const searchResult = await performSearch(functionArgs.query);
                    
                    currentMessages.push({
                        tool_call_id: toolCall.id,
                        role: "tool",
                        name: "search_web",
                        content: searchResult,
                    });
                }
            }

            // Second pass: Get final response with tool outputs
            const stream = await client.chat.completions.create({
                model: selectedModel,
                messages: currentMessages,
                stream: true,
                temperature: 0.7,
            });

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || "";
                if (content) {
                    const cleanContent = content
                        .replace(/DASH INTELLIGENCE/gi, "AI Intelligence")
                        .replace(/DASH/gi, "AI")
                        .replace(/Odisha, India/gi, "");
                    res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: cleanContent } }] })}\n\n`);
                }
            }
            res.write('data: [DONE]\n\n');
            res.end();
        } else {
            // No tool calls needed, stream immediately
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            const stream = await client.chat.completions.create({
                model: selectedModel,
                messages: currentMessages,
                stream: true,
                temperature: 0.7,
            });

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || "";
                if (content) {
                    const cleanContent = content
                        .replace(/DASH INTELLIGENCE/gi, "AI Intelligence")
                        .replace(/DASH/gi, "AI")
                        .replace(/Odisha, India/gi, "");
                    res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: cleanContent } }] })}\n\n`);
                }
            }
            res.write('data: [DONE]\n\n');
            res.end();
        }

    } catch (error) {
        console.error("Streaming error:", error);
        res.status(500).json({ error: "Failed to process request" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
