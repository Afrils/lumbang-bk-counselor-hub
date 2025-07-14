import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MessageCircle, Plus, Search, Filter } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mockSessions = [
  {
    id: 1,
    student: "Ahmad Rizki",
    class: "XI IPA 1",
    date: "2025-01-15",
    time: "10:00",
    status: "scheduled",
    topic: "Masalah Akademik",
    notes: "Kesulitan memahami mata pelajaran Matematika"
  },
  {
    id: 2,
    student: "Siti Aminah",
    class: "X IPS 2", 
    date: "2025-01-14",
    time: "13:00",
    status: "completed",
    topic: "Masalah Sosial",
    notes: "Konflik dengan teman sebaya"
  },
  {
    id: 3,
    student: "Budi Santoso",
    class: "XII IPA 3",
    date: "2025-01-16",
    time: "09:00", 
    status: "scheduled",
    topic: "Stress & Kecemasan",
    notes: "Kecemasan menghadapi ujian nasional"
  }
]

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800", 
  cancelled: "bg-red-100 text-red-800"
}

const topicColors = {
  "Masalah Akademik": "bg-purple-100 text-purple-800",
  "Masalah Sosial": "bg-orange-100 text-orange-800",
  "Stress & Kecemasan": "bg-yellow-100 text-yellow-800",
  "Masalah Keluarga": "bg-pink-100 text-pink-800"
}

export default function Individual() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = session.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || session.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Konseling Individu</h1>
            <p className="text-muted-foreground">
              Kelola sesi konseling individual dengan siswa
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Jadwalkan Sesi
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Jadwalkan Sesi Konseling</DialogTitle>
                <DialogDescription>
                  Buat jadwal sesi konseling individual baru
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="student">Siswa</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih siswa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmad">Ahmad Rizki - XI IPA 1</SelectItem>
                      <SelectItem value="siti">Siti Aminah - X IPS 2</SelectItem>
                      <SelectItem value="budi">Budi Santoso - XII IPA 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Tanggal</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Waktu</Label>
                  <Input type="time" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="topic">Topik</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih topik" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="akademik">Masalah Akademik</SelectItem>
                      <SelectItem value="sosial">Masalah Sosial</SelectItem>
                      <SelectItem value="stress">Stress & Kecemasan</SelectItem>
                      <SelectItem value="keluarga">Masalah Keluarga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Catatan Awal</Label>
                  <Textarea placeholder="Masukkan catatan atau keluhan siswa..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari siswa atau kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="scheduled">Terjadwal</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="cancelled">Dibatalkan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sessions Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{session.student}</CardTitle>
                    <CardDescription>{session.class}</CardDescription>
                  </div>
                  <Badge className={statusColors[session.status as keyof typeof statusColors]}>
                    {session.status === 'scheduled' ? 'Terjadwal' : 
                     session.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(session.date).toLocaleDateString('id-ID')}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {session.time}
                  </div>
                  <Badge className={topicColors[session.topic as keyof typeof topicColors]}>
                    {session.topic}
                  </Badge>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {session.notes}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageCircle className="mr-1 h-3 w-3" />
                      Detail
                    </Button>
                    {session.status === 'scheduled' && (
                      <Button size="sm" className="flex-1">
                        Mulai Sesi
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Tidak ada sesi konseling yang sesuai dengan filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}