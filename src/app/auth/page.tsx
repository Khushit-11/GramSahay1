'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, KeyRound } from 'lucide-react';
import Image from 'next/image';

export default function AuthPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.match(/^\d{10}$/)) {
      setOtpSent(true);
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd verify the OTP here.
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-secondary">
       <div className="absolute inset-0">
         <Image 
           src="https://picsum.photos/1200/800"
           alt="Rural finance"
           data-ai-hint="rural finance"
           fill
           className="object-cover opacity-10"
         />
       </div>
      <Card className="w-full max-w-sm shadow-2xl z-10">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">
            {otpSent ? 'Enter OTP' : 'Login or Signup'}
          </CardTitle>
          <CardDescription>
            {otpSent ? `An OTP has been sent to ${phone}` : 'Enter your phone number to continue'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="10-digit mobile number" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password (OTP)</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="otp" type="text" placeholder="Enter 6-digit OTP" required className="pl-10" />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="link" onClick={() => setOtpSent(false)} className="w-full">
                Change number?
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
