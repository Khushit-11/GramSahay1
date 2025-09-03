import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Phone, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const languages = [
  "English", "हिन्दी", "বাংলা", "తెలుగు", "मराठी", "தமிழ்", "ગુજરાતી", "ಕನ್ನಡ", 
  "മലയാളം", "ଓଡ଼ିଆ", "ਪੰਜਾਬੀ", "অসমীয়া"
];

export default function ProfilePage() {
    return (
        <div className="container mx-auto p-4 space-y-6">
            <header>
                <h1 className="text-3xl font-bold font-headline">My Profile</h1>
                <p className="text-muted-foreground">View and manage your account details.</p>
            </header>

            <Card className="shadow-lg">
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                        <AvatarImage src="https://picsum.photos/200" alt="User avatar" data-ai-hint="person avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <CardTitle>User Name</CardTitle>
                    <CardDescription>Joined on July 2024</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm">
                            <p className="font-medium">Full Name</p>
                            <p className="text-muted-foreground">User Name</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm">
                            <p className="font-medium">Phone Number</p>
                            <p className="text-muted-foreground">+91 12345 67890</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        Language Settings
                    </CardTitle>
                    <CardDescription>
                        Choose your preferred language for the app.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="language-select">Language</Label>
                        <Select defaultValue="English">
                            <SelectTrigger id="language-select">
                                <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent>
                                {languages.map(lang => (
                                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
            
            <Button asChild variant="destructive" className="w-full">
                <Link href="/auth">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                </Link>
            </Button>
        </div>
    );
}
