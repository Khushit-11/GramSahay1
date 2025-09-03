
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getFinancialLiteracyQuiz, FinancialLiteracyQuiz } from '@/ai/flows/financial-literacy';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function FinancialLiteracyPage() {
    const [quiz, setQuiz] = useState<FinancialLiteracyQuiz | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const { toast } = useToast();

    const fetchQuiz = async () => {
        setIsLoading(true);
        setAnswered(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
        try {
            const quizData = await getFinancialLiteracyQuiz({});
            setQuiz(quizData);
        } catch (error) {
            console.error("Failed to fetch quiz:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not load a new quiz question. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, []);

    const handleSubmit = () => {
        if (!selectedAnswer || !quiz) return;
        setAnswered(true);
        if (selectedAnswer === quiz.correctAnswer) {
            setIsCorrect(true);
            setScore(prev => prev + 10);
        } else {
            setIsCorrect(false);
        }
    };
    
    return (
        <div className="container mx-auto p-4 space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Financial Literacy Hub</h1>
                    <p className="text-muted-foreground">Test your knowledge and improve your financial skills.</p>
                </div>
                <div className="text-right">
                     <p className="font-bold text-lg text-primary flex items-center gap-2"><Trophy className="text-accent" /> Score: {score}</p>
                </div>
            </header>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="text-accent"/>
                        Quiz Time!
                    </CardTitle>
                    <CardDescription>Answer the question below.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center h-48">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : quiz ? (
                        <div className="space-y-4">
                            <p className="font-semibold text-lg">{quiz.question}</p>
                            <RadioGroup
                                value={selectedAnswer || ''}
                                onValueChange={setSelectedAnswer}
                                disabled={answered}
                            >
                                {quiz.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`option-${index}`} />
                                        <Label htmlFor={`option-${index}`}>{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>

                            {answered && isCorrect !== null && (
                                <Alert variant={isCorrect ? 'default' : 'destructive'} className={isCorrect ? 'bg-green-50 border-green-200' : ''}>
                                    <AlertTitle>{isCorrect ? 'Correct!' : 'Not quite!'}</AlertTitle>
                                    <AlertDescription>
                                        {quiz.explanation}
                                    </AlertDescription>
                                </Alert>
                            )}
                            
                            <div className="flex gap-4 mt-4">
                               <Button onClick={handleSubmit} disabled={!selectedAnswer || answered}>
                                   Submit Answer
                               </Button>
                               <Button variant="outline" onClick={fetchQuiz}>
                                   Next Question
                               </Button>
                            </div>
                        </div>
                    ) : (
                         <p>Could not load quiz. Please try refreshing.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
