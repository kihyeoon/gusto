import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages } = await req.json();
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

// // This method must be named GET
// export async function GET() {
//   // Make a request to OpenAI's API based on
//   // a placeholder prompt
//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     stream: true,
//     messages: [{ role: 'user', content: 'Say this is a test.' }],
//   });
//   // Log the response
//   for await (const part of response) {
//     console.log(part.choices[0].delta);
//   }
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }