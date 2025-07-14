import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MapPin, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mockScheduleData = [
  {
    id: 1,
    title: "Konseling Individu - Ahmad Rizki",
    type: "individual",
    date: "2025-01-15",
    time: "08:00 - 09:00",
    location: "Ruang BK 1",
    counselor: "Guru BK A",
    participant: "Ahmad Rizki (XI IPA 1)",
    status: "scheduled"
  },
  {
    id: 2,
    title: "Bimbingan Karir - Kelas XII",
    type: "group",
    date: "2025-01-15",
    time: "10:00 - 11:30",
    location: "Aula",
    counselor: "Guru BK B",
    participant: "XII IPA 1 (30 siswa)",
    status: "in_progress"
  },
  {
    id: 3,
    title: "Konseling Kelompok - Stress Management",
    type: "group",
    date: "2025-01-15",
    time: "13:00 - 14:30",
    location: "Ruang BK 2",
    counselor: "Guru BK C",
    participant: "8 siswa dari berbagai kelas",
    status: "scheduled"
  },
  {
    id: 4,
    title: "Assessment Minat Bakat",
    type: "assessment",
    date: "2025-01-16",
    time: "09:00 - 10:30",
    location: "Lab Psikologi",
    counselor: "Guru BK A",
    participant: "Siti Aminah (X IPS 2)",
    status: "scheduled"
  },
  {
    id: 5,
    title: "Koordinasi dengan Wali Kelas",
    type: "meeting",
    date: "2025-01-16",
    time: "14:00 - 15:00",
    location: "Ruang Guru",
    counselor: "Tim BK",
    participant: "Wali Kelas XI",
    status: "scheduled"
  }
]

const typeColors = {
  individual: "bg-blue-100 text-blue-800",
  group: "bg-green-100 text-green-800",
  assessment: "bg-purple-100 text-purple-800",
  meeting: "bg-orange-100 text-orange-800"
}

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
}

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date("2025-01-15"))
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState("day") // day, week, month

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const todaySchedule = mockScheduleData.filter(item => 
    item.date === currentDate.toISOString().split('T')[0]
  )

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Jadwal Kegiatan</h1>
            <p className="text-muted-foreground">
              Kelola jadwal konseling dan kegiatan bimbingan
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Jadwal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Tambah Jadwal Baru</DialogTitle>
                <DialogDescription>
                  Buat jadwal kegiatan bimbingan dan konseling baru
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul Kegiatan</Label>
                  <Input placeholder="Masukkan judul kegiatan..." />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="type">Jenis Kegiatan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kegiatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Konseling Individu</SelectItem>
                      <SelectItem value="group">Konseling Kelompok</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="meeting">Meeting/Koordinasi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Tanggal</Label>
                    <Input type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Waktu</Label>
                    <Input placeholder="08:00 - 09:00" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">Lokasi</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ruang-bk-1">Ruang BK 1</SelectItem>
                      <SelectItem value="ruang-bk-2">Ruang BK 2</SelectItem>
                      <SelectItem value="aula">Aula</SelectItem>
                      <SelectItem value="lab-psikologi">Lab Psikologi</SelectItem>
                      <SelectItem value="ruang-guru">Ruang Guru</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="counselor">Konselor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih konselor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bk-a">Guru BK A</SelectItem>
                      <SelectItem value="bk-b">Guru BK B</SelectItem>
                      <SelectItem value="bk-c">Guru BK C</SelectItem>
                      <SelectItem value="tim-bk">Tim BK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="participant">Peserta</Label>
                  <Input placeholder="Nama siswa atau kelas..." />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea placeholder="Jelaskan tujuan dan aktivitas yang akan dilakukan..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Simpan Jadwal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Date Navigation */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">{formatDate(currentDate)}</CardTitle>
                <CardDescription>
                  {todaySchedule.length} kegiatan terjadwal
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentDate(new Date())}
                >
                  Hari Ini
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Today's Schedule */}
        <div className="space-y-4">
          {todaySchedule.length > 0 ? (
            todaySchedule.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {item.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {item.counselor}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={typeColors[item.type as keyof typeof typeColors]}>
                        {item.type === 'individual' ? 'Individu' : 
                         item.type === 'group' ? 'Kelompok' : 
                         item.type === 'assessment' ? 'Assessment' : 'Meeting'}
                      </Badge>
                      <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                        {item.status === 'scheduled' ? 'Terjadwal' : 
                         item.status === 'in_progress' ? 'Berlangsung' : 
                         item.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">
                        <strong>Peserta:</strong> {item.participant}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      {item.status === 'scheduled' && (
                        <Button size="sm">
                          Mulai
                        </Button>
                      )}
                      {item.status === 'in_progress' && (
                        <Button size="sm" variant="destructive">
                          Selesai
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Tidak ada kegiatan terjadwal untuk hari ini
                </p>
                <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Jadwal
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Konseling Individu</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">sesi minggu ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Konseling Kelompok</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">sesi minggu ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessment</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">terjadwal minggu ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Durasi</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75</div>
              <p className="text-xs text-muted-foreground">menit per sesi</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}