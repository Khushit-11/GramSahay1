import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const paymentHistory = [
    { date: 'July 5, 2024', amount: '₹4,632', status: 'Paid' },
    { date: 'June 5, 2024', amount: '₹4,632', status: 'Paid' },
    { date: 'May 5, 2024', amount: '₹4,632', status: 'Paid' },
];

export default function LoanStatusPage() {
    return (
        <div className="container mx-auto p-4 space-y-6">
            <header>
                <h1 className="text-3xl font-bold font-headline">Loan Status</h1>
                <p className="text-muted-foreground">Track your loan and repayments.</p>
            </header>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Loan Overview</CardTitle>
                    <div className="flex justify-between items-baseline">
                        <CardDescription>Your ₹50,000 loan progress.</CardDescription>
                        <Badge>Active</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm font-medium mb-1">
                            <span>Paid</span>
                            <span>Remaining</span>
                        </div>
                        <Progress value={25} />
                        <div className="flex justify-between text-sm font-bold mt-1">
                            <span>₹13,896</span>
                             <span>₹36,104</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg border-primary border-2">
                <CardHeader>
                    <CardTitle>Next Payment Due</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div>
                        <p className="text-3xl font-bold text-primary">₹4,632</p>
                        <p className="text-muted-foreground">on August 5, 2024</p>
                    </div>
                    <Button className="bg-accent hover:bg-accent/90">Pay Now</Button>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paymentHistory.map((payment) => (
                                <TableRow key={payment.date}>
                                    <TableCell>{payment.date}</TableCell>
                                    <TableCell>{payment.amount}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={payment.status === 'Paid' ? 'secondary' : 'destructive'} className="bg-green-100 text-green-800">
                                            {payment.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
