'use server';

/**
 * @fileOverview Provides an AI chatbot for answering user questions about the loan application process.
 *
 * - aiHelpChatbot - A function that processes user queries and returns chatbot responses.
 * - AIHelpChatbotInput - The input type for the aiHelpChatbot function.
 * - AIHelpChatbotOutput - The return type for the aiHelpChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AIHelpChatbotInputSchema = z.object({
  query: z.string().describe('The user query or question.'),
  loanApplicationStatus: z
    .string()
    .optional()
    .describe('The current status of the user loan application.'),
});
export type AIHelpChatbotInput = z.infer<typeof AIHelpChatbotInputSchema>;

const AIHelpChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type AIHelpChatbotOutput = z.infer<typeof AIHelpChatbotOutputSchema>;

export async function aiHelpChatbot(input: AIHelpChatbotInput): Promise<AIHelpChatbotOutput> {
  return aiHelpChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHelpChatbotPrompt',
  input: {schema: AIHelpChatbotInputSchema},
  output: {schema: AIHelpChatbotOutputSchema},
  prompt: `You are a helpful AI chatbot assisting users with their loan applications.

  Respond to the user query with clear and concise information.

  Consider the loan application status, if provided, to tailor your response.

  Loan Application Status: {{loanApplicationStatus}}

  User Query: {{query}}

  Response:`,
});

const aiHelpChatbotFlow = ai.defineFlow(
  {
    name: 'aiHelpChatbotFlow',
    inputSchema: AIHelpChatbotInputSchema,
    outputSchema: AIHelpChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
