'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Camera, Users, FileCheck2, Loader2, Sparkles, Volume2, ArrowLeft, ArrowRight, Upload, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { extractDocumentData } from '@/ai/flows/document-data-extraction';
import { assessCreditRisk, AssessCreditRiskOutput } from '@/ai/flows/ai-credit-scoring';

const totalSteps = 5;

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
    <div className="space-y-2 mb-8">
        <Progress value={(currentStep / totalSteps) * 100} />
        <p className="text-sm text-muted-foreground text-center">Step {currentStep} of {totalSteps}</p>
    </div>
);

export default function LoanApplicationForm() {
    const [step, setStep] = useState(1);
    const { toast } = useToast();
    
    // Step 1: Personal Details
    const [personalDetails, setPersonalDetails] = useState({ name: '', dob: '', pan: ''});
    
    // Step 2: Document Upload
    const [docScanned, setDocScanned] = useState(false);
    const [docPreview, setDocPreview] = useState<string | null>(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Step 3: References
    const [references, setReferences] = useState([
        { name: '', phone: '' },
        { name: '', phone: '' },
    ]);
    
    // Step 4: AI Assessment
    const [isAssessing, setIsAssessing] = useState(false);
    const [ocrData, setOcrData] = useState('');

    // Step 5: Loan Offer
    const [loanOffer, setLoanOffer] = useState<AssessCreditRiskOutput | null>(null);
    const [offerStatus, setOfferStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');

    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
    
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUri = e.target?.result as string;
                setDocPreview(dataUri);
                setDocScanned(true);
                handleDataExtraction(dataUri);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleDataExtraction = async (dataUri: string) => {
        setIsExtracting(true);
        toast({ title: "AI Assistant", description: "Extracting data from your document..." });
        try {
            const result = await extractDocumentData({
                documentDataUri: dataUri,
                fieldDescription: 'Extract the full name, date of birth, and PAN number from the document.'
            });
            setOcrData(result.extractedData);
            // Example of how you might pre-fill, actual parsing would be needed
            // For now, we will just store the raw extracted data.
            toast({ title: "AI Assistant", description: "Data extracted successfully!" });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Extraction Failed', description: 'Could not extract data from the document.' });
        } finally {
            setIsExtracting(false);
        }
    };

    const handleStartAssessment = async () => {
        setIsAssessing(true);
        toast({ title: "AI Assistant", description: "Assessing your credit risk..." });
        try {
            const communityReferences = references.map(r => `${r.name} (${r.phone})`).join(', ');
            const result = await assessCreditRisk({ ocrData, communityReferences });
            setLoanOffer(result);
            nextStep();
        } catch(error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Assessment Failed', description: 'Could not generate a loan offer at this time.' });
        } finally {
            setIsAssessing(false);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleCameraClick = () => {
        // In a real app, you'd integrate a camera library here.
        // For demo, we use a placeholder and trigger extraction.
        const placeholderUri = "https://picsum.photos/400/250"; // This won't work with a real model.
        setDocPreview(placeholderUri);
        setDocScanned(true);
        toast({ title: 'Demo Feature', description: 'Camera functionality is for demonstration. Please use upload.' });
    };

    return (
        <Card className="shadow-lg">
            <CardContent className="p-6">
                <StepIndicator currentStep={step} />

                {step === 1 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold font-headline">Personal Details</h3>
                            <Button variant="ghost" size="icon"><Volume2 className="h-5 w-5"/></Button>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="As per your PAN card" value={personalDetails.name} onChange={(e) => setPersonalDetails({...personalDetails, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" value={personalDetails.dob} onChange={(e) => setPersonalDetails({...personalDetails, dob: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pan">PAN Number</Label>
                            <Input id="pan" placeholder="ABCDE1234F" value={personalDetails.pan} onChange={(e) => setPersonalDetails({...personalDetails, pan: e.target.value})} />
                        </div>
                    </div>
                )}
                
                {step === 2 && (
                    <div className="space-y-4 text-center">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold font-headline">Upload Document</h3>
                            <Button variant="ghost" size="icon"><Volume2 className="h-5 w-5"/></Button>
                        </div>
                        <p className="text-muted-foreground">Please upload a clear picture of your Aadhaar or PAN card.</p>
                         {!docScanned ? (
                             <div className="space-y-3">
                                <Button size="lg" className="w-full h-20" onClick={handleCameraClick}>
                                    <Camera className="mr-2 h-6 w-6" /> Scan with Camera
                                </Button>
                                <Button size="lg" variant="secondary" className="w-full h-20" onClick={handleUploadClick}>
                                    <Upload className="mr-2 h-6 w-6" /> Upload from Device
                                </Button>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    onChange={handleFileSelect} 
                                    accept="image/*"
                                />
                             </div>
                        ) : (
                            <div className="p-4 border-2 border-dashed rounded-lg bg-secondary">
                                {docPreview && <Image src={docPreview} data-ai-hint="id card" alt="Scanned Document" width={400} height={250} className="rounded-md mx-auto" />}
                                <p className="mt-4 text-green-600 font-semibold flex items-center justify-center gap-2">
                                    {isExtracting ? <><Loader2 className="animate-spin" /> Extracting data...</> : <><FileCheck2/> Document captured!</>}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold font-headline">Community References</h3>
                             <Button variant="ghost" size="icon"><Volume2 className="h-5 w-5"/></Button>
                        </div>
                        <p className="text-muted-foreground text-sm">Add two people from your community who can verify your identity.</p>
                        {[0, 1].map(index => (
                             <div key={index} className="space-y-4 rounded-lg border p-4">
                                 <h4 className="font-semibold flex items-center gap-2"><Users className="h-5 w-5"/> Reference {index + 1}</h4>
                                 <Input placeholder="Full Name" value={references[index].name} onChange={e => { const newRef = [...references]; newRef[index].name = e.target.value; setReferences(newRef); }} />
                                 <Input type="tel" placeholder="Phone Number" value={references[index].phone} onChange={e => { const newRef = [...references]; newRef[index].phone = e.target.value; setReferences(newRef); }} />
                            </div>
                        ))}
                    </div>
                )}

                {step === 4 && !isAssessing && (
                    <div className="text-center space-y-6 py-8">
                        <Sparkles className="mx-auto h-12 w-12 text-accent" />
                        <h3 className="text-xl font-semibold font-headline">Ready for AI Assessment</h3>
                        <p className="text-muted-foreground">We'll now use AI to check your details and generate a loan offer.</p>
                        <Button size="lg" onClick={handleStartAssessment}>Start Assessment</Button>
                    </div>
                )}

                {isAssessing && (
                    <div className="text-center space-y-4 py-8">
                        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                        <h3 className="text-xl font-semibold font-headline">Assessing Credit Score...</h3>
                        <p className="text-muted-foreground">Our AI is crunching the numbers. This will just take a moment.</p>
                    </div>
                )}

                {step === 5 && loanOffer && (
                    <div className="space-y-4 text-center">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold font-headline">Your Loan Offer</h3>
                             <Button variant="ghost" size="icon"><Volume2 className="h-5 w-5"/></Button>
                        </div>
                        <Card className="bg-secondary">
                            <CardHeader>
                                <CardTitle className="text-primary text-4xl font-bold">{loanOffer.loanOffer.split(',')[0]}</CardTitle>
                                <CardDescription>Your Generated Loan Offer</CardDescription>
                            </CardHeader>
                            <CardContent className="text-left space-y-2">
                                <p><span className="font-semibold">Credit Score:</span> {loanOffer.creditScore}</p>
                                <p><span className="font-semibold">Details:</span> {loanOffer.loanOffer}</p>
                            </CardContent>
                        </Card>
                         {offerStatus === 'pending' && (
                            <div className="flex gap-4">
                                <Button variant="outline" className="w-full" onClick={() => setOfferStatus('declined')}>Decline</Button>
                                <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => setOfferStatus('accepted')}>Accept Offer</Button>
                            </div>
                         )}
                         {offerStatus === 'accepted' && (
                            <div className="p-4 rounded-md bg-green-100 text-green-800 font-semibold flex items-center justify-center gap-2">
                                <CheckCircle /> Congratulations! Your loan is being processed.
                            </div>
                         )}
                         {offerStatus === 'declined' && (
                             <div className="p-4 rounded-md bg-red-100 text-red-800 font-semibold flex items-center justify-center gap-2">
                                <XCircle /> You have declined the offer.
                            </div>
                         )}
                    </div>
                )}

                {!isAssessing && step < 4 && (
                    <div className="flex justify-between mt-8">
                        <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <Button onClick={nextStep} disabled={(step === 2 && !docScanned) || isExtracting}>
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}
                 {!isAssessing && step === 4 && (
                     <div className="flex justify-start mt-8">
                        <Button variant="outline" onClick={prevStep}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
