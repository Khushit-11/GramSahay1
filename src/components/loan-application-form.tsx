'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Camera, Users, FileCheck2, Loader2, Sparkles, Volume2, ArrowLeft, ArrowRight } from 'lucide-react';

const totalSteps = 5;

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
    <div className="space-y-2 mb-8">
        <Progress value={(currentStep / totalSteps) * 100} />
        <p className="text-sm text-muted-foreground text-center">Step {currentStep} of {totalSteps}</p>
    </div>
);

export default function LoanApplicationForm() {
    const [step, setStep] = useState(1);
    
    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
    
    const [docScanned, setDocScanned] = useState(false);
    const [isAssessing, setIsAssessing] = useState(false);

    const handleStartAssessment = () => {
        setIsAssessing(true);
        setTimeout(() => {
            setIsAssessing(false);
            nextStep();
        }, 3000);
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
                            <Input id="name" placeholder="As per your PAN card" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pan">PAN Number</Label>
                            <Input id="pan" placeholder="ABCDE1234F" />
                        </div>
                    </div>
                )}
                
                {step === 2 && (
                    <div className="space-y-4 text-center">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold font-headline">Upload Document</h3>
                            <Button variant="ghost" size="icon"><Volume2 className="h-5 w-5"/></Button>
                        </div>
                        <p className="text-muted-foreground">Please upload a clear picture of your Aadhaar card.</p>
                         {!docScanned ? (
                            <Button size="lg" className="w-full h-24" onClick={() => setDocScanned(true)}>
                                <Camera className="mr-2 h-6 w-6" /> Scan with Camera
                            </Button>
                        ) : (
                            <div className="p-4 border-2 border-dashed rounded-lg bg-secondary">
                                <Image src="https://picsum.photos/400/250" data-ai-hint="id card" alt="Scanned Document" width={400} height={250} className="rounded-md mx-auto" />
                                <p className="mt-4 text-green-600 font-semibold flex items-center justify-center gap-2"><FileCheck2/> Document captured successfully!</p>
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
                        <div className="space-y-4 rounded-lg border p-4">
                             <h4 className="font-semibold flex items-center gap-2"><Users className="h-5 w-5"/> Reference 1</h4>
                             <Input placeholder="Full Name" />
                             <Input type="tel" placeholder="Phone Number" />
                        </div>
                         <div className="space-y-4 rounded-lg border p-4">
                             <h4 className="font-semibold flex items-center gap-2"><Users className="h-5 w-5"/> Reference 2</h4>
                             <Input placeholder="Full Name" />
                             <Input type="tel" placeholder="Phone Number" />
                        </div>
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
                        <p className="text-muted-foreground">This will just take a moment.</p>
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-4 text-center">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold font-headline">Your Loan Offer</h3>
                             <Button variant="ghost" size="icon"><Volume2 className="h-5 w-5"/></Button>
                        </div>
                        <Card className="bg-secondary">
                            <CardHeader>
                                <CardTitle className="text-primary text-4xl font-bold">₹ 50,000</CardTitle>
                                <CardDescription>Loan Amount</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                                <div className="p-2 border rounded-md">
                                    <p className="font-semibold">Interest Rate</p>
                                    <p>2% per month</p>
                                </div>
                                <div className="p-2 border rounded-md">
                                    <p className="font-semibold">Tenure</p>
                                    <p>12 Months</p>
                                </div>
                                 <div className="p-2 border rounded-md col-span-2">
                                    <p className="font-semibold">Monthly EMI</p>
                                    <p>₹ 4,632</p>
                                </div>
                            </CardContent>
                        </Card>
                         <div className="flex gap-4">
                            <Button variant="outline" className="w-full">Decline</Button>
                            <Button className="w-full bg-accent hover:bg-accent/90">Accept Offer</Button>
                        </div>
                    </div>
                )}

                {!isAssessing && step < 4 && (
                    <div className="flex justify-between mt-8">
                        <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <Button onClick={nextStep} disabled={step === 2 && !docScanned}>
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
