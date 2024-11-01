import Image from "next/image";
import { Button } from '../../components/ui/button';
import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Star, GraduationCap, BookOpen } from "lucide-react"; // Only import specific icons

// Use optimized font import
import { Poppins, El_Messiri} from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });
const messiri = El_Messiri({ subsets: ['arabic'] });

const subjects = [
  {
    title: "Français",
    description: "",
    image: "fr.svg",
    works: [
      "Cours de langue",
      "La Boîte à Merveilles",
      "Antigone",
      "Le Dernier Jour d'un Condamné"
    ]
  },
  {
    title: "التاريخ",
    description: "",
    image: "it.svg",
    works: [
      "التاريخ",
      "الجغرافيا"
    ]
  },
  {
    title: "الجغرافيا",
    description: "",
    image: "hr.svg",
    works: [
      "التاريخ",
      "الجغرافيا"
    ]
  },
  {
    title: "التربية الإسلامية",
    description: "",
    image: "jp.svg",
    works: [
      "مدخل التزكية (القرآن الكريم)",
      "مدخل التزكية (العقيدة)",
      "مدخل الإقتداء",
      "مدخل الإستجابة",
      "مدخل القسط",
      "مدخل الـحكمة"
    ]
  },
  {
    title: "اللغة العربية",
    description: "",
    image: "es.svg",
    works: [
      "أنواع الخطاب (الإشهاري - الصحفي - السياسي)",
      "قضايا معاصرة",
      "المفاهيم (الحداثة - التواصل - الإبداع)",
      "قيم إنسانية في الشعر العربي"
    ]
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF]">
      {/* Hero Section */}
      <div className="text-black">
        <div className="max-w-[1200px] mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-xl">
              <h1 className={`text-4xl lg:text-5xl font-bold text-black/80 ${poppins.className} mb-6 text-center lg:text-start`}>
                1 Bac, C&apos;est Facile Avec Jihawigo
              </h1>
              <p className={`text-xl mb-8 text-black/90 ${poppins.className} text-center lg:text-start`}>
                Avec Jihawigo, la révision Jihawi devient simple, interactive et efficace pour assurer votre réussite.
              </p>
              <div className="space-y-4">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button variant='primary' size="lg" className="w-full lg:w-auto text-lg px-8">
                      Commencer gratuitement
                    </Button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <Button variant='primaryOutline' size="lg" className="w-full lg:w-auto border-2 text-lg font-bold px-8">
                      J&apos;ai déjà un compte
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Button size="lg" className="w-full lg:w-auto bg-white text-blue-500 hover:bg-white/90 text-lg font-bold px-8" asChild>
                    <Link href='/learn'>
                      Continuer l&apos;apprentissage
                    </Link>
                  </Button>
                </SignedIn>
              </div>
            </div>
            {/* Lazy-load Hero Image */}
            <div className="relative w-[300px] h-[300px] lg:w-[440px] lg:h-[440px]">
              <Image src='/book.webp' fill alt="Learning illustration" priority className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-blue-100 py-6">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-500">100%</p>
                <p className="text-sm text-black">Taux de réussite</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-500">+150</p>
                <p className="text-sm text-black">Étudiants satisfaits</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-500">4+</p>
                <p className="text-sm text-black">Matières principales</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Section - Single Column Layout */}
      <section className="py-16">
        <div className="max-w-[600px] mx-auto px-4">
          <div className="flex flex-col space-y-8">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 w-full hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center space-y-4">
                  {/* Lazy-Loaded Subject Image */}
                  <div className="relative mb-4">
                    <Image
                      src={subject.image}
                      alt={subject.title}
                      height={180}
                      width={180}
                      loading="lazy" // Use lazy-loading for these images
                      className="object-contain"
                    />
                  </div>

                  {/* Title - Always Centered */}
                  <h3 className={`text-3xl font-bold ${messiri.className} text-gray-800 mb-2 text-center w-full`}>
                    {subject.title}
                  </h3>

                  {/* Works List - Centered Content */}
                  {subject.works && (
                    <ul className="space-y-2 w-full max-w-md">
                      {subject.works.map((work, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-center gap-2"
                        >
                          <span className="text-gray-600 font-bold font-Messiri text-md text-center">
                            {work}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-blue-100">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-2xl lg:text-4xl font-bold text-center mb-12 text-gray-800">
            Commencez votre apprentissage aujourd&apos;hui
          </h2>
          <div className="bg-white rounded-2xl shadow-lg max-w-md mx-auto overflow-hidden">
            <div className="bg-blue-500 p-4 text-center text-white">
              <p className="text-sm font-bold font-Poppins uppercase">Offre spéciale</p>
            </div>
            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-4xl font-bold font-Poppins text-gray-800">300 DH</p>
                <p className="text-gray-600 font-Poppins">par an</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Accès illimité à toutes les matières",
                  "Ressources téléchargeables",
                  "Tests et exercices pratiques",
                  "Support pédagogique personnalisé"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 font-Poppins">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center">
                <Button variant='primary' size="lg" className="w-full lg:w-auto text-lg px-8">
                  Je m&apos;inscris
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
