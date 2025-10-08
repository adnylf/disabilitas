'use client';

import Link from 'next/link';
import NeuButton from '@/components/button';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee';
import { Star, Quote, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ahmad Rizki',
    role: 'Pengguna Tunanetra',
    rating: 5,
    text: 'Dengan screen reader yang optimal, saya bisa belajar programming dengan lancar. Fitur aksesibilitasnya sangat membantu!',
  },
  {
    id: 2,
    name: 'Sari Dewi',
    role: 'Pengguna Tunarungu',
    rating: 5,
    text: 'Subtitle dan transkrip yang lengkap membuat saya memahami materi video dengan mudah. Terima kasih!',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    role: 'Pengguna Disabilitas Motorik',
    rating: 4,
    text: 'Navigasi keyboard yang intuitif memudahkan saya mengoperasikan platform tanpa kesulitan.',
  },
  {
    id: 4,
    name: 'Maya Wati',
    role: 'Pengguna Low Vision',
    rating: 5,
    text: 'Ukuran teks yang bisa disesuaikan sangat membantu mata saya. Pengalaman belajar jadi lebih nyaman.',
  },
  {
    id: 5,
    name: 'Rizky Pratama',
    role: 'Pengguna Disleksia',
    rating: 5,
    text: 'Font yang digunakan mudah dibaca dan kontras warna sangat membantu dalam proses belajar.',
  },
  {
    id: 6,
    name: 'Diana Putri',
    role: 'Pengguna Tunarungu',
    rating: 4,
    text: 'Interpreter bahasa isyarat dalam video membuat pemahaman materi menjadi lebih baik.',
  },
  {
    id: 7,
    name: 'Fajar Nugraha',
    role: 'Pengguna Tunanetra',
    rating: 5,
    text: 'Platform ini benar-benar mengubah cara saya belajar. Aksesibilitasnya sangat memukau!',
  },
  {
    id: 8,
    name: 'Linda Sari',
    role: 'Pengguna Disabilitas Motorik',
    rating: 5,
    text: 'Saya bisa menyelesaikan kursus lengkap hanya dengan menggunakan keyboard. Luar biasa!',
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="h-full rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md border-gray-200 dark:border-gray-700">
      <CardContent className="p-6 space-y-4 h-full flex flex-col">
        {/* Quote Icon & Rating */}
        <div className="flex justify-between items-start">
          <Quote className="h-8 w-8 text-primary/20 rotate-180" />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < testimonial.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm line-clamp-4 flex-grow">
          "{testimonial.text}"
        </p>

        {/* User Info */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              {testimonial.name}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {testimonial.role}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialSection() {
  // Split testimonials into two columns
  const firstColumn = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondColumn = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Star className="h-4 w-4" />
                Ulasan Pengguna Disabilitas
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Apa Kata Mereka Tentang{' '}
              <span className="text-primary">Pengalaman Belajar</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Dengarkan langsung dari komunitas disabilitas yang telah merasakan manfaat platform pembelajaran inklusif kami. 
              Setiap cerita adalah bukti komitmen kami terhadap aksesibilitas.
            </p>

            <div className="pt-4">
              <Link href="/courses">
                <NeuButton className="group flex items-center gap-2">
                  Lihat Semua Kursus
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </NeuButton>
              </Link>
            </div>
          </div>

          {/* Right Side - Two Column Marquee Testimonials */}
          <div className="relative h-[600px] overflow-hidden">
            <div className="flex gap-4 h-full">
              {/* First Column - Moves Up */}
              <div className="flex-1 h-full overflow-hidden">
                <Marquee
                  vertical
                  pauseOnHover
                  repeat={3}
                  className="[--duration:100s]"
                >
                  {firstColumn.map((testimonial) => (
                    <div key={`first-${testimonial.id}`} className="mb-6">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </Marquee>
              </div>

              {/* Second Column - Moves Down (reverse) */}
              <div className="flex-1 h-full overflow-hidden">
                <Marquee
                  vertical
                  reverse
                  pauseOnHover
                  repeat={3}
                  className="[--duration:100s]"
                >
                  {secondColumn.map((testimonial) => (
                    <div key={`second-${testimonial.id}`} className="mb-6">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white dark:from-gray-900 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}