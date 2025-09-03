import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Home } from 'lucide-react';

const languages = [
  "English", "हिन्दी", "বাংলা", "తెలుగు", "मराठी", "தமிழ்", "ગુજરાતી", "ಕನ್ನಡ", 
  "മലയാളം", "ଓଡ଼ିଆ", "ਪੰਜਾਬੀ", "অসমীয়া", "Bodo", "Dogri", "Kashmiri", 
  "Konkani", "Maithili", "Manipuri", "Nepali", "Sanskrit", "Santali", 
  "Sindhi", "Urdu"
];

export default function LanguageSelection() {
  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-2xl text-center shadow-2xl">
        <CardHeader className="items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
                <Home className="w-8 h-8 text-primary-foreground" />
            </div>
          <CardTitle className="font-headline text-3xl md:text-4xl font-bold text-primary">
            GrahSahay
          </CardTitle>
          <CardDescription className="text-base md:text-lg">
            Please select your language / कृपया अपनी भाषा चुनें
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {languages.map((lang) => (
              <Button key={lang} variant="outline" asChild className="h-12 text-base">
                <Link href="/auth">{lang}</Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
