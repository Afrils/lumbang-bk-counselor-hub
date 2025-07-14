import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Calendar, PieChart, LineChart, Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Laporan</h1>
          <p className="text-muted-foreground">
            Data dan analisis komprehensif program bimbingan konseling
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Siswa Dilayani</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sesi Konseling</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">bulan ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Kepuasan</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% dari semester lalu</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kasus Terselesaikan</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">tingkat resolusi</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Distribusi Jenis Konseling
              </CardTitle>
              <CardDescription>Persentase jenis layanan konseling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Konseling Individu</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bimbingan Belajar</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Konseling Kelompok</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bimbingan Karir</span>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Tren Bulanan
              </CardTitle>
              <CardDescription>Jumlah sesi konseling per bulan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">285</div>
                    <div className="text-sm text-muted-foreground">September</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">312</div>
                    <div className="text-sm text-muted-foreground">Oktober</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">298</div>
                    <div className="text-sm text-muted-foreground">November</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">342</div>
                    <div className="text-sm text-muted-foreground">Desember</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>+15% peningkatan dari semester lalu</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance by Class */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performa Layanan per Kelas
            </CardTitle>
            <CardDescription>Tingkat partisipasi dan kepuasan per tingkat kelas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Kelas X</span>
                    <span className="text-sm text-muted-foreground">425 siswa</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Partisipasi: 78%</span>
                      <span>Kepuasan: 92%</span>
                    </div>
                    <Progress value={78} className="h-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Kelas XI</span>
                    <span className="text-sm text-muted-foreground">398 siswa</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Partisipasi: 85%</span>
                      <span>Kepuasan: 94%</span>
                    </div>
                    <Progress value={85} className="h-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Kelas XII</span>
                    <span className="text-sm text-muted-foreground">424 siswa</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Partisipasi: 91%</span>
                      <span>Kepuasan: 96%</span>
                    </div>
                    <Progress value={91} className="h-1" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issue Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Kategori Masalah Utama</CardTitle>
            <CardDescription>Jenis masalah yang paling sering dilaporkan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-600">32%</div>
                <div className="text-sm text-muted-foreground">Masalah Akademik</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-600">24%</div>
                <div className="text-sm text-muted-foreground">Masalah Sosial</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-orange-600">18%</div>
                <div className="text-sm text-muted-foreground">Stress & Kecemasan</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-purple-600">26%</div>
                <div className="text-sm text-muted-foreground">Masalah Keluarga</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}