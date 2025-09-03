
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Landmark } from 'lucide-react';

const languages = [
  "English", "हिन्दी", "বাংলা", "తెలుగు", "मराठी", "தமிழ்", "ગુજરાતી", "ಕನ್ನಡ", 
  "മലയാളം", "ଓଡ଼ିଆ", "ਪੰਜਾਬੀ", "অসমীয়া"
];

export default function LanguageSelection() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background">
      <Image
        src="https://picsum.photos/1200/800"
        alt="Rural landscape"
        data-ai-hint="rural landscape"
        fill
        className="object-cover opacity-10"
      />
      <main className="relative z-10 flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="items-center">
              <div className="p-4 bg-primary text-primary-foreground rounded-full mb-4 border-4 border-primary-foreground/20 shadow-lg">
                <Landmark className="h-10 w-10" />
              </div>
            <CardTitle className="font-headline text-3xl md:text-4xl font-bold">
              GrahSahay
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-muted-foreground">
              Please select your language / कृपया अपनी भाषा चुनें
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {languages.map((lang) => (
                <Button key={lang} variant="outline" asChild className="h-12 text-base">
                  <Link href="/auth">{lang}</Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
