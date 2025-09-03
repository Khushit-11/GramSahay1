import LoanApplicationForm from "@/components/loan-application-form";

export default function ApplyPage() {
    return (
        <div className="container mx-auto p-4">
            <header className="mb-6">
                <h1 className="text-3xl font-bold font-headline">Loan Application</h1>
                <p className="text-muted-foreground">Follow the steps to get your loan offer.</p>
            </header>
            <LoanApplicationForm />
        </div>
    );
}
