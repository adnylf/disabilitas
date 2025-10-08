'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BookOpen, Clock, Users, Star, Filter } from 'lucide-react';
import Link from 'next/link';

const courses = [
  {
    id: 1,
    title: 'Dasar-Dasar Pemrograman Web',
    instructor: 'Dr. Ahmad Fauzi',
    description: 'Pelajari HTML, CSS, dan JavaScript dari dasar hingga mahir.',
    level: 'Pemula',
    duration: '12 minggu',
    students: 1250,
    rating: 4.8,
    price: 'Gratis',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Teknologi',
  },
  {
    id: 2,
    title: 'Desain Grafis untuk Pemula',
    instructor: 'Sarah Putri',
    description: 'Kuasai prinsip-prinsip desain grafis dan tools profesional.',
    level: 'Pemula',
    duration: '10 minggu',
    students: 890,
    rating: 4.7,
    price: 'Rp 299.000',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Desain',
  },
  {
    id: 3,
    title: 'Bahasa Inggris Percakapan',
    instructor: 'John Smith',
    description: 'Tingkatkan kemampuan berbahasa Inggris untuk komunikasi sehari-hari.',
    level: 'Menengah',
    duration: '15 minggu',
    students: 2100,
    rating: 4.9,
    price: 'Rp 199.000',
    thumbnail: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Bahasa',
  },
  {
    id: 4,
    title: 'Digital Marketing Essentials',
    instructor: 'Maya Kusuma',
    description: 'Pelajari strategi pemasaran digital yang efektif untuk bisnis.',
    level: 'Pemula',
    duration: '8 minggu',
    students: 1500,
    rating: 4.6,
    price: 'Rp 349.000',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Bisnis',
  },
  {
    id: 5,
    title: 'Fotografi untuk Semua',
    instructor: 'Budi Santoso',
    description: 'Pelajari teknik fotografi dari pemula hingga profesional.',
    level: 'Pemula',
    duration: '6 minggu',
    students: 670,
    rating: 4.8,
    price: 'Gratis',
    thumbnail: 'https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Seni',
  },
  {
    id: 6,
    title: 'Akuntansi Dasar',
    instructor: 'Linda Wijaya',
    description: 'Memahami prinsip-prinsip akuntansi untuk pemula.',
    level: 'Pemula',
    duration: '10 minggu',
    students: 1100,
    rating: 4.5,
    price: 'Rp 249.000',
    thumbnail: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Bisnis',
  },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-primary/10 via-success/10 to-accent/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fadeIn">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Jelajahi Kursus
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Temukan kursus yang sesuai dengan minat dan kebutuhan Anda
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Cari kursus, topik, atau instruktur..."
                className="pl-12 h-12 bg-white dark:bg-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fadeSlide">
          <div className="flex items-center gap-2 flex-1">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter:
            </span>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="Teknologi">Teknologi</SelectItem>
              <SelectItem value="Desain">Desain</SelectItem>
              <SelectItem value="Bahasa">Bahasa</SelectItem>
              <SelectItem value="Bisnis">Bisnis</SelectItem>
              <SelectItem value="Seni">Seni</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Tingkat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tingkat</SelectItem>
              <SelectItem value="Pemula">Pemula</SelectItem>
              <SelectItem value="Menengah">Menengah</SelectItem>
              <SelectItem value="Lanjutan">Lanjutan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{filteredCourses.length}</span> kursus
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <Card
              key={course.id}
              className="action-card animate-scaleIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <CardTitle className="text-xl line-clamp-2">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course.instructor}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {course.rating}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">
                  {course.price}
                </div>
                <Link href={`/courses/${course.id}`}>
                  <Button>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Lihat Detail
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
