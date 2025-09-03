'use server';

/**
 * @fileOverview An AI credit scoring flow that analyzes user documents and references to generate a credit score.
 *
 * - assessCreditRisk - A function that assesses credit risk based on user data.
 * - AssessCreditRiskInput - The input type for the assessCreditRisk function.
 * - AssessCreditRiskOutput - The return type for the assessCreditRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessCreditRiskInputSchema = z.object({
  ocrData: z
    .string()
    .describe('The OCR extracted data from the user provided documents.'),
  communityReferences: z
    .string()
    .describe('The community references provided by the user.'),
});
export type AssessCreditRiskInput = z.infer<typeof AssessCreditRiskInputSchema>;

const AssessCreditRiskOutputSchema = z.object({
  creditScore: z.number().describe('The calculated credit score.'),
  loanOffer: z.string().describe('The loan offer with transparent terms.'),
});
export type AssessCreditRiskOutput = z.infer<typeof AssessCreditRiskOutputSchema>;

export async function assessCreditRisk(input: AssessCreditRiskInput): Promise<AssessCreditRiskOutput> {
  return assessCreditRiskFlow(input);
}

const assessCreditRiskPrompt = ai.definePrompt({
  name: 'assessCreditRiskPrompt',
  input: {schema: AssessCreditRiskInputSchema},
  output: {schema: AssessCreditRiskOutputSchema},
  prompt: `You are an AI credit scoring expert. Analyze the following data to determine a credit score and generate a loan offer with transparent terms.

OCR Data: {{{ocrData}}}
Community References: {{{communityReferences}}}

Consider factors such as income stability, social reputation, and repayment capacity.
Output a credit score between 300 and 850, and a loan offer including the amount, interest rate, and repayment terms, using simple language.
`,
});

const assessCreditRiskFlow = ai.defineFlow(
  {
    name: 'assessCreditRiskFlow',
    inputSchema: AssessCreditRiskInputSchema,
    outputSchema: AssessCreditRiskOutputSchema,
  },
  async input => {
    const {output} = await assessCreditRiskPrompt(input);
    return output!;
  }
);
