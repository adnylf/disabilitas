'use client';

import Link from 'next/link';
import NeuButton from '@/components/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Play, Users, Award, BookOpen } from 'lucide-react';
import { NumberTicker } from '@/components/ui/number-ticker';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeIn">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Award className="h-4 w-4" />
                Platform Pembelajaran Inklusif
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Belajar Tanpa Batas untuk{' '}
              <span className="text-primary">Semua Orang</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Platform pembelajaran online yang dirancang khusus dengan fitur aksesibilitas lengkap.
              Belajar dengan nyaman sesuai kebutuhan Anda, kapan saja dan di mana saja.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <NeuButton className="group flex items-center gap-2">
                  Mulai Belajar Gratis
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </NeuButton>
              </Link>
              <Link href="/courses">
                <NeuButton className="group flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Jelajahi Kursus
                </NeuButton>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="space-y-1">
                <div className="stat-number text-3xl">
                  <NumberTicker value={10000} />+
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Siswa Aktif</p>
              </div>
              <div className="space-y-1">
                <div className="stat-number text-3xl">
                  <NumberTicker value={500} />+
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Kursus</p>
              </div>
              <div className="space-y-1">
                <div className="stat-number text-3xl">
                  <NumberTicker value={95} />%
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Kepuasan</p>
              </div>
            </div>
          </div>

          <div className="relative animate-fadeIn delay-200">
            {/* Card Utama - Sesuai dengan style di courses */}
            <Card className="action-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <BookOpen className="h-24 w-24 mx-auto text-primary animate-float" />
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      Akses Pembelajaran Inklusif
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card Kecil Kanan Bawah - Sesuai dengan style di courses */}
            <Card className="action-card absolute -bottom-6 -right-6 animate-scaleIn delay-400 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-auto">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Komunitas Aktif</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Bergabung bersama ribuan pelajar</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Kecil Kiri Atas - Sesuai dengan style di courses */}
            <Card className="action-card absolute -top-6 -left-6 animate-scaleIn delay-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-auto">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Sertifikat Resmi</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Dapatkan pengakuan kemampuan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}