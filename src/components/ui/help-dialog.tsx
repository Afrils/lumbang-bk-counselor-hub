
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, Users, MessageCircle, FileText, Calendar, BarChart3, Settings, BookOpen, ClipboardList, Target } from "lucide-react"

interface HelpDialogProps {
  children?: React.ReactNode
}

export function HelpDialog({ children }: HelpDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            Panduan
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Panduan Penggunaan Sistem BK</DialogTitle>
          <DialogDescription>
            Panduan lengkap untuk menggunakan Sistem Bimbingan dan Konseling
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Gambaran Umum</TabsTrigger>
            <TabsTrigger value="features">Fitur Utama</TabsTrigger>
            <TabsTrigger value="workflows">Alur Kerja</TabsTrigger>
            <TabsTrigger value="tips">Tips & FAQ</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-96 mt-4">
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Selamat Datang di Sistem BK</CardTitle>
                  <CardDescription>
                    Platform digital untuk mendukung layanan bimbingan dan konseling di sekolah
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Untuk Guru BK:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Kelola data siswa dan sesi konseling</li>
                      <li>Buat dan bagikan materi BK</li>
                      <li>Pantau kehadiran dan jadwal</li>
                      <li>Analisis data dan laporan</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Untuk Siswa:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Akses materi bimbingan dan konseling</li>
                      <li>Daftar sesi konseling</li>
                      <li>Isi angket dan assessment</li>
                      <li>Lihat jadwal dan pengumuman</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Konseling
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Individual:</strong> Sesi konseling satu-on-satu</p>
                    <p><strong>Kelompok:</strong> Sesi konseling berkelompok</p>
                    <p><strong>Akademik:</strong> Bimbingan belajar dan prestasi</p>
                    <p><strong>Karir:</strong> Panduan pemilihan karir</p>
                    <p><strong>Minat & Bakat:</strong> Assessment dan pengembangan</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Materi & Dokumen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Materi BK:</strong> Koleksi materi pembelajaran</p>
                    <p><strong>RPL BK:</strong> Rencana pelaksanaan layanan</p>
                    <p><strong>Angket:</strong> Survey dan assessment online</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Manajemen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Jadwal:</strong> Pengaturan waktu layanan</p>
                    <p><strong>Absensi:</strong> Monitoring kehadiran</p>
                    <p><strong>Data Siswa:</strong> Profil dan informasi siswa</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Dashboard:</strong> Ringkasan aktivitas</p>
                    <p><strong>Laporan:</strong> Report dan statistik</p>
                    <p><strong>Monitoring:</strong> Tracking progress siswa</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="workflows" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Alur Kerja Konseling Individual</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Siswa mendaftar sesi konseling melalui sistem</li>
                    <li>Guru BK mereview dan menyetujui permintaan</li>
                    <li>Sistem mengirim notifikasi jadwal ke siswa</li>
                    <li>Sesi konseling dilaksanakan sesuai jadwal</li>
                    <li>Guru BK mencatat hasil konseling di sistem</li>
                    <li>Follow-up jika diperlukan</li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Alur Kerja Pembuatan Materi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Guru BK membuat materi baru di sistem</li>
                    <li>Upload file atau tulis konten langsung</li>
                    <li>Tentukan target kelas dan kategori</li>
                    <li>Preview dan edit sebelum publish</li>
                    <li>Publikasikan untuk akses siswa</li>
                    <li>Monitor engagement dan feedback</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tips" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tips Penggunaan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">🔍 Pencarian Efektif</h4>
                    <p className="text-sm text-muted-foreground">
                      Gunakan filter dan kata kunci spesifik untuk menemukan data dengan cepat
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">📊 Monitoring Regular</h4>
                    <p className="text-sm text-muted-foreground">
                      Cek dashboard secara berkala untuk update terbaru
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">💾 Backup Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Export data penting secara berkala sebagai backup
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>FAQ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">Q: Bagaimana cara reset password?</h4>
                    <p className="text-sm text-muted-foreground">A: Klik &quot;Lupa Password&quot; di halaman login dan ikuti instruksi email</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Q: Data siswa tidak muncul?</h4>
                    <p className="text-sm text-muted-foreground">A: Pastikan filter tanggal dan kelas sudah sesuai</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Q: Cara menghubungi support?</h4>
                    <p className="text-sm text-muted-foreground">A: Gunakan menu &quot;Pengaturan&quot; &gt; &quot;Bantuan & Support&quot;</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
