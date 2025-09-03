import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Welcome!</h1>
        <p className="text-muted-foreground">Your personal loan assistant.</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Loan Status</CardTitle>
          <CardDescription>An overview of your current loan activity.</CardDescription>
        </CardHeader>
        <CardContent className="text-center p-8">
          <p className="text-lg text-muted-foreground">You have no active loans.</p>
        </CardContent>
      </Card>
      
      <Card className="bg-primary text-primary-foreground shadow-lg">
        <CardContent className="p-6 flex items-center justify-between">
            <div>
                <h3 className="font-bold text-xl font-headline">Ready for a new loan?</h3>
                <p className="text-sm opacity-90">Get an instant offer in minutes.</p>
            </div>
            <Button asChild variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link href="/dashboard/apply">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
