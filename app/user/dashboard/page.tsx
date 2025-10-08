'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Trophy, Clock, TrendingUp, Play, Award } from 'lucide-react';
import Link from 'next/link';
import UserLayout from '@/components/user/UserLayout';
import { supabase } from '@/lib/supabase';
import { Enrollment, Course } from '@/types/database';

interface EnrollmentWithCourse extends Enrollment {
  courses: Course;
}

export default function UserDashboard() {
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([]);
  const [stats, setStats] = useState({
    activeCourses: 0,
    certificates: 0,
    totalHours: 0,
    avgProgress: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: enrollmentsData, error: enrollError } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (*)
        `)
        .eq('user_id', user.id)
        .eq('enrollment_status', 'active')
        .order('last_accessed', { ascending: false });

      if (enrollError) throw enrollError;

      const { data: certificatesData } = await supabase
        .from('certificates')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_valid', true);

      if (enrollmentsData) {
        setEnrollments(enrollmentsData as EnrollmentWithCourse[]);

        const totalProgress = enrollmentsData.reduce((sum, e) => sum + e.progress_percentage, 0);
        const totalHours = enrollmentsData.reduce((sum, e) => sum + (e.total_watch_time_seconds / 3600), 0);

        setStats({
          activeCourses: enrollmentsData.length,
          certificates: certificatesData?.length || 0,
          totalHours: Math.round(totalHours),
          avgProgress: enrollmentsData.length > 0 ? Math.round(totalProgress / enrollmentsData.length) : 0
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard Pembelajaran
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Selamat datang kembali! Lanjutkan perjalanan belajar Anda.
          </p>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeCourses}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Kursus Aktif</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card animate-scaleIn delay-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-success" />
                </div>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.certificates}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sertifikat</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card animate-scaleIn delay-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHours}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Jam Belajar</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card animate-scaleIn delay-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgProgress}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rata-rata Progress</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="main-card animate-fadeSlide">
              <CardHeader>
                <CardTitle>Kursus Saya</CardTitle>
                <CardDescription>
                  Lanjutkan pembelajaran dari terakhir kali Anda berhenti
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {enrollments.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Anda belum memiliki kursus aktif
                    </p>
                    <Link href="/courses">
                      <Button>Jelajahi Kursus</Button>
                    </Link>
                  </div>
                ) : (
                  enrollments.map((enrollment, index) => (
                    <div
                      key={enrollment.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-full sm:w-32 h-32 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={enrollment.courses.thumbnail || 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800'}
                          alt={enrollment.courses.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {enrollment.courses.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {enrollment.courses.total_materials || 0} materi
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Progress
                            </span>
                            <span className="font-medium text-primary">
                              {Math.round(enrollment.progress_percentage)}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${enrollment.progress_percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2">
                        <Link href={`/courses/${enrollment.course_id}`} className="flex-1">
                          <Button className="w-full">
                            <Play className="h-4 w-4 mr-2" />
                            Lanjutkan
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                )}

                <Link href="/courses">
                  <Button variant="outline" className="w-full">
                    Jelajahi Kursus Lainnya
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="main-card animate-fadeSlide delay-200">
              <CardHeader>
                <CardTitle>Pencapaian Terbaru</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-success/10">
                  <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Pemula yang Gigih
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Selesaikan 3 kursus
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/10">
                  <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Pelajar Konsisten
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Belajar 7 hari berturut
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="main-card animate-fadeSlide delay-300">
              <CardHeader>
                <CardTitle>Aktivitas Minggu Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Senin</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-2 w-2 rounded-full bg-success"></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Selasa</span>
                    <div className="flex gap-1">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-2 w-2 rounded-full bg-success"></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Rabu</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-2 w-2 rounded-full bg-success"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
