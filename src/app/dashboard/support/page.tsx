import Chatbot from "@/components/chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone } from "lucide-react";

export default function SupportPage() {
    return (
        <div className="container mx-auto p-4 flex flex-col h-full">
            <header className="mb-4">
                <h1 className="text-3xl font-bold font-headline">Help & Support</h1>
                <p className="text-muted-foreground">Get answers to your questions.</p>
            </header>
            
            <div className="flex-1 flex flex-col">
              <Chatbot />
            </div>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Need to talk to someone?</CardTitle>
                <CardDescription>Our support agents are here to help.</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="tel:+910000000000" className="flex items-center justify-center w-full p-2 rounded-md bg-secondary text-secondary-foreground font-semibold gap-2">
                  <Phone className="h-5 w-5" /> Call Support
                </a>
              </CardContent>
            </Card>
        </div>
    );
}
