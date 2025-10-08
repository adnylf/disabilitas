'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, Save, Loader as Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import UserLayout from '@/components/user/UserLayout';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

export default function UserProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    gender: 'L',
    disabilityType: 'none',
    bio: '',
    province: '',
    city: '',
    disabilityDetail: '',
    accessibility: {
      screen_reader: false,
      subtitle: false,
      sign_language: false,
      audio_description: false,
      keyboard_navigation: false
    }
  });
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    certificates: 0,
    totalHours: 0,
    joinedDate: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const { data: enrollmentsData } = await supabase
        .from('enrollments')
        .select('id, completed_at, total_watch_time_seconds')
        .eq('user_id', user.id);

      const { data: certificatesData } = await supabase
        .from('certificates')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_valid', true);

      const completedCourses = enrollmentsData?.filter(e => e.completed_at) || [];
      const totalHours = enrollmentsData?.reduce((sum, e) => sum + (e.total_watch_time_seconds / 3600), 0) || 0;

      setStats({
        coursesCompleted: completedCourses.length,
        certificates: certificatesData?.length || 0,
        totalHours: Math.round(totalHours),
        joinedDate: new Date(userData.created_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
      });

      setFormData({
        fullName: userData.full_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        birthDate: userData.birth_date || '',
        gender: userData.gender || 'L',
        disabilityType: userData.disability_type || 'none',
        bio: profileData?.bio || '',
        province: profileData?.province || '',
        city: profileData?.city || '',
        disabilityDetail: profileData?.disability_detail || '',
        accessibility: profileData?.accessibility_preferences || {
          screen_reader: false,
          subtitle: false,
          sign_language: false,
          audio_description: false,
          keyboard_navigation: false
        }
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat data profil',
        variant: 'destructive'
      });
    } finally {
      setDataLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error: userError } = await supabase
        .from('users')
        .update({
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          birth_date: formData.birthDate,
          gender: formData.gender,
          disability_type: formData.disabilityType,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (userError) throw userError;

      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existingProfile) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .update({
            bio: formData.bio,
            province: formData.province,
            city: formData.city,
            disability_detail: formData.disabilityDetail,
            accessibility_preferences: formData.accessibility
          })
          .eq('user_id', userId);

        if (profileError) throw profileError;
      } else {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: userId,
            bio: formData.bio,
            province: formData.province,
            city: formData.city,
            disability_detail: formData.disabilityDetail,
            accessibility_preferences: formData.accessibility
          });

        if (profileError) throw profileError;
      }

      toast({
        title: 'Berhasil',
        description: 'Profil berhasil diperbarui'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Gagal memperbarui profil',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (dataLoading) {
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
            Profil Saya
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola informasi pribadi dan preferensi akun Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <Card className="main-card animate-scaleIn">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="h-32 w-32 mx-auto">
                    <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" />
                    <AvatarFallback>{formData.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {formData.fullName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pelajar Aktif
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Ubah Foto Profil
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="main-card animate-scaleIn delay-100">
              <CardHeader>
                <CardTitle className="text-lg">Statistik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Kursus Selesai</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.coursesCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sertifikat</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.certificates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Jam Belajar</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.totalHours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Bergabung</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.joinedDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="main-card animate-fadeSlide">
              <CardHeader>
                <CardTitle>Informasi Pribadi</CardTitle>
                <CardDescription>
                  Update informasi profil Anda di sini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nama Lengkap</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Tanggal Lahir</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Jenis Kelamin</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">Laki-laki</SelectItem>
                          <SelectItem value="P">Perempuan</SelectItem>
                          <SelectItem value="other">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="disabilityType">Jenis Disabilitas</Label>
                      <Select
                        value={formData.disabilityType}
                        onValueChange={(value) => setFormData({ ...formData, disabilityType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Tidak Ada</SelectItem>
                          <SelectItem value="fisik">Fisik</SelectItem>
                          <SelectItem value="sensorik">Sensorik</SelectItem>
                          <SelectItem value="mental">Mental</SelectItem>
                          <SelectItem value="intelektual">Intelektual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="province">Provinsi</Label>
                      <Input
                        id="province"
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        placeholder="Contoh: DKI Jakarta"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Kota</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Contoh: Jakarta Selatan"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disabilityDetail">Detail Disabilitas</Label>
                    <Textarea
                      id="disabilityDetail"
                      value={formData.disabilityDetail}
                      onChange={(e) => setFormData({ ...formData, disabilityDetail: e.target.value })}
                      rows={2}
                      placeholder="Jelaskan detail disabilitas jika ada..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Tentang Saya</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      placeholder="Ceritakan tentang diri Anda..."
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Preferensi Aksesibilitas</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="screen_reader"
                          checked={formData.accessibility.screen_reader}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            accessibility: { ...formData.accessibility, screen_reader: checked as boolean }
                          })}
                        />
                        <Label htmlFor="screen_reader" className="font-normal cursor-pointer">
                          Screen Reader
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="subtitle"
                          checked={formData.accessibility.subtitle}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            accessibility: { ...formData.accessibility, subtitle: checked as boolean }
                          })}
                        />
                        <Label htmlFor="subtitle" className="font-normal cursor-pointer">
                          Subtitle
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sign_language"
                          checked={formData.accessibility.sign_language}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            accessibility: { ...formData.accessibility, sign_language: checked as boolean }
                          })}
                        />
                        <Label htmlFor="sign_language" className="font-normal cursor-pointer">
                          Bahasa Isyarat
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="audio_description"
                          checked={formData.accessibility.audio_description}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            accessibility: { ...formData.accessibility, audio_description: checked as boolean }
                          })}
                        />
                        <Label htmlFor="audio_description" className="font-normal cursor-pointer">
                          Deskripsi Audio
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="keyboard_navigation"
                          checked={formData.accessibility.keyboard_navigation}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            accessibility: { ...formData.accessibility, keyboard_navigation: checked as boolean }
                          })}
                        />
                        <Label htmlFor="keyboard_navigation" className="font-normal cursor-pointer">
                          Navigasi Keyboard
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Simpan Perubahan
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline">
                      Batal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
