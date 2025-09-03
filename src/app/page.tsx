import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

const languages = [
  "English", "हिन्दी", "বাংলা", "తెలుగు", "मराठी", "தமிழ்", "ગુજરાતી", "ಕನ್ನಡ", 
  "മലയാളം", "ଓଡ଼ିଆ", "ਪੰਜਾਬੀ", "অসমীয়া", "Bodo", "Dogri", "Kashmiri", 
  "Konkani", "Maithili", "Manipuri", "Nepali", "Sanskrit", "Santali", 
  "Sindhi", "Urdu"
];

export default function LanguageSelection() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background">
      <Image
        src="https://picsum.photos/1200/800"
        alt="Farmer in a field"
        data-ai-hint="farmer field"
        fill
        className="object-cover opacity-20"
      />
      <main className="relative z-10 flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center shadow-2xl bg-card/90 backdrop-blur-sm">
          <CardHeader className="items-center">
              <Image 
                src="https://picsum.photos/201/201"
                data-ai-hint="indian farmer"
                alt="GrahSahay Logo"
                width={80}
                height={80}
                className="rounded-full mb-4 border-4 border-primary"
              />
            <CardTitle className="font-headline text-3xl md:text-4xl font-bold text-primary">
              GrahSahay
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-foreground/80">
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
    </div>
  );
}
