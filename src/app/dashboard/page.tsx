import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Info } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <div className="flex-1 bg-background">
      <div className="relative h-48 md:h-64">
        <Image 
          src="https://picsum.photos/1200/401"
          alt="Indian farmer in a field"
          data-ai-hint="indian farmer"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="container mx-auto p-4 relative h-full flex flex-col justify-end">
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground shadow-sm">Welcome Back!</h1>
          <p className="text-foreground/80 max-w-prose">Your personal loan assistant for a brighter future.</p>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 -mt-16">
        <Card className="shadow-lg backdrop-blur-sm bg-card/80">
          <CardHeader>
            <CardTitle>Loan Status</CardTitle>
            <CardDescription>An overview of your current loan activity.</CardDescription>
          </CardHeader>
          <CardContent className="text-center p-8">
            <p className="text-lg text-muted-foreground">You have no active loans at the moment.</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                  <h3 className="font-bold text-xl font-headline">Ready for a new loan?</h3>
                  <p className="text-sm opacity-90">Get an instant offer in minutes. It's fast and easy.</p>
              </div>
              <Button asChild variant="secondary" className="bg-primary-foreground text-background hover:bg-primary-foreground/90 flex-shrink-0">
                  <Link href="/dashboard/apply">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
             <Info className="w-8 h-8 text-accent" />
             <div>
                <CardTitle>Did you know?</CardTitle>
                <CardDescription>Quick financial tips</CardDescription>
             </div>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">Prompt loan repayments can improve your credit score over time, opening up better loan offers in the future.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
