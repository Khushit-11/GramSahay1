
'use server';

/**
 * @fileOverview Provides a gamified financial literacy quiz.
 *
 * - getFinancialLiteracyQuiz - A function that generates a quiz question.
 * - FinancialLiteracyQuiz - The output type for the getFinancialLiteracyQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FinancialLiteracyQuizInputSchema = z.object({});
export type FinancialLiteracyQuizInput = z.infer<typeof FinancialLiteracyQuizInputSchema>;

const FinancialLiteracyQuizSchema = z.object({
    question: z.string().describe('A multiple-choice question about basic financial concepts relevant to a rural Indian audience.'),
    options: z.array(z.string()).length(4).describe('An array of 4 possible answers.'),
    correctAnswer: z.string().describe('The correct answer from the options.'),
    explanation: z.string().describe('A simple, clear explanation of the correct answer in one or two sentences.'),
});
export type FinancialLiteracyQuiz = z.infer<typeof FinancialLiteracyQuizSchema>;

export async function getFinancialLiteracyQuiz(input: FinancialLiteracyQuizInput): Promise<FinancialLiteracyQuiz> {
    return financialLiteracyQuizFlow(input);
}

const prompt = ai.definePrompt({
    name: 'financialLiteracyQuizPrompt',
    input: { schema: FinancialLiteracyQuizInputSchema },
    output: { schema: FinancialLiteracyQuizSchema },
    prompt: `You are an expert in financial education for rural and semi-urban populations in India. 
    
    Generate a single multiple-choice question to test basic financial literacy. The topics should be simple and practical, such as savings, loans, interest, or budgeting.
    
    The question, options, and explanation should be in simple English.
    
    Ensure you provide exactly 4 options. One of them must be the correct answer.
    `,
});

const financialLiteracyQuizFlow = ai.defineFlow(
    {
        name: 'financialLiteracyQuizFlow',
        inputSchema: FinancialLiteracyQuizInputSchema,
        outputSchema: FinancialLiteracyQuizSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
