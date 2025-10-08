'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, DollarSign, TrendingUp, Plus, CreditCard as Edit, Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const mentorCourses = [
  {
    id: 1,
    title: 'Dasar-Dasar Pemrograman Web',
    students: 1250,
    revenue: 15000000,
    rating: 4.8,
    status: 'Aktif',
  },
  {
    id: 2,
    title: 'JavaScript Advanced',
    students: 890,
    revenue: 12000000,
    rating: 4.7,
    status: 'Aktif',
  },
  {
    id: 3,
    title: 'React untuk Pemula',
    students: 650,
    revenue: 9500000,
    rating: 4.9,
    status: 'Draft',
  },
];

export default function MentorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard Mentor
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Kelola kursus dan pantau performa Anda
            </p>
          </div>
          <Link href="/mentor/courses/create">
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Buat Kursus Baru
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="stat-card animate-scaleIn">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Kursus</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card animate-scaleIn delay-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2,790</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Siswa</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card animate-scaleIn delay-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-accent" />
                </div>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">36.5M</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Pendapatan</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card animate-scaleIn delay-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rating Rata-rata</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="main-card animate-fadeSlide">
              <CardHeader>
                <CardTitle>Kursus Saya</CardTitle>
                <CardDescription>
                  Kelola dan pantau performa kursus Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentorCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="p-6 rounded-lg border bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {course.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.status === 'Aktif'
                              ? 'bg-success/10 text-success'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                          }`}>
                            {course.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {course.students}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Siswa</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {course.rating}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {(course.revenue / 1000000).toFixed(1)}M
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Pendapatan</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2">
                        <Link href={`/mentor/courses/${course.id}/edit`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <Link href={`/courses/${course.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="main-card animate-fadeSlide delay-200">
              <CardHeader>
                <CardTitle>Statistik Bulanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Siswa Baru</span>
                    <span className="font-semibold text-gray-900 dark:text-white">+245</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Kursus Diselesaikan</span>
                    <span className="font-semibold text-gray-900 dark:text-white">189</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Ulasan Positif</span>
                    <span className="font-semibold text-gray-900 dark:text-white">98%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="main-card animate-fadeSlide delay-300">
              <CardHeader>
                <CardTitle>Pesan Terbaru</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((msg) => (
                  <div key={msg} className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        Siswa {msg}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        Pertanyaan tentang materi modul 3...
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
