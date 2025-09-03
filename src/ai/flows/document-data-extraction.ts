'use server';

/**
 * @fileOverview An AI agent for extracting data from uploaded documents.
 *
 * - extractDocumentData - A function that handles the document data extraction process.
 * - ExtractDocumentDataInput - The input type for the extractDocumentData function.
 * - ExtractDocumentDataOutput - The return type for the extractDocumentData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractDocumentDataInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  fieldDescription: z.string().describe('The description of the data to extract from the document.'),
});
export type ExtractDocumentDataInput = z.infer<typeof ExtractDocumentDataInputSchema>;

const ExtractDocumentDataOutputSchema = z.object({
  extractedData: z.string().describe('The extracted data from the document.'),
  confidenceScore: z.number().describe('The confidence score of the extracted data.'),
});
export type ExtractDocumentDataOutput = z.infer<typeof ExtractDocumentDataOutputSchema>;

export async function extractDocumentData(input: ExtractDocumentDataInput): Promise<ExtractDocumentDataOutput> {
  return extractDocumentDataFlow(input);
}

const extractDocumentDataPrompt = ai.definePrompt({
  name: 'extractDocumentDataPrompt',
  input: {schema: ExtractDocumentDataInputSchema},
  output: {schema: ExtractDocumentDataOutputSchema},
  prompt: `You are an expert data extractor, tasked with extracting specific information from documents.

  You will be provided with a document image and a description of the data to extract.
  Your goal is to extract the data accurately and provide a confidence score for your extraction.

  Document Image: {{media url=documentDataUri}}
  Data Description: {{{fieldDescription}}}

  Please provide the extracted data and a confidence score between 0 and 1.
`,
});

const extractDocumentDataFlow = ai.defineFlow(
  {
    name: 'extractDocumentDataFlow',
    inputSchema: ExtractDocumentDataInputSchema,
    outputSchema: ExtractDocumentDataOutputSchema,
  },
  async input => {
    const {output} = await extractDocumentDataPrompt(input);
    return output!;
  }
);
