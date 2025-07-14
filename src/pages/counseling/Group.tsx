import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MessageCircle, Plus, Search, Filter } from "lucide-react"
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

const mockGroupSessions = [
  {
    id: 1,
    title: "Manajemen Stres Ujian",
    class: "XII IPA",
    participants: 15,
    maxParticipants: 20,
    date: "2025-01-20",
    time: "13:30",
    status: "scheduled",
    topic: "Stress Management",
    description: "Sesi kelompok untuk membantu siswa mengelola stres menghadapi ujian"
  },
  {
    id: 2,
    title: "Keterampilan Sosial",
    class: "X IPS 1",
    participants: 12,
    maxParticipants: 15,
    date: "2025-01-18",
    time: "10:00",
    status: "completed",
    topic: "Social Skills",
    description: "Meningkatkan kemampuan berinteraksi dan berkomunikasi"
  },
  {
    id: 3,
    title: "Orientasi Karir",
    class: "XI IPA 2",
    participants: 8,
    maxParticipants: 12,
    date: "2025-01-22",
    time: "14:00",
    status: "scheduled",
    topic: "Career Guidance",
    description: "Eksplorasi minat dan bakat untuk perencanaan karir"
  }
]

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
}

const topicColors = {
  "Stress Management": "bg-yellow-100 text-yellow-800",
  "Social Skills": "bg-green-100 text-green-800",
  "Career Guidance": "bg-purple-100 text-purple-800",
  "Peer Support": "bg-blue-100 text-blue-800"
}

export default function Group() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredSessions = mockGroupSessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || session.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Konseling Kelompok</h1>
            <p className="text-muted-foreground">
              Kelola sesi konseling kelompok dan aktivitas group
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Buat Sesi Kelompok
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Buat Sesi Konseling Kelompok</DialogTitle>
                <DialogDescription>
                  Buat sesi konseling kelompok baru untuk beberapa siswa
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul Sesi</Label>
                  <Input placeholder="Masukkan judul sesi..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class">Kelas Target</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="x-ipa">X IPA</SelectItem>
                      <SelectItem value="x-ips">X IPS</SelectItem>
                      <SelectItem value="xi-ipa">XI IPA</SelectItem>
                      <SelectItem value="xi-ips">XI IPS</SelectItem>
                      <SelectItem value="xii-ipa">XII IPA</SelectItem>
                      <SelectItem value="xii-ips">XII IPS</SelectItem>
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
                    <Input type="time" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxParticipants">Maksimal Peserta</Label>
                  <Input type="number" placeholder="15" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="topic">Topik</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih topik" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stress">Stress Management</SelectItem>
                      <SelectItem value="social">Social Skills</SelectItem>
                      <SelectItem value="career">Career Guidance</SelectItem>
                      <SelectItem value="peer">Peer Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea placeholder="Jelaskan tujuan dan aktivitas sesi..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Buat Sesi
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
              placeholder="Cari judul sesi atau kelas..."
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
                    <CardTitle className="text-lg">{session.title}</CardTitle>
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
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-primary font-medium">
                      {session.participants}/{session.maxParticipants}
                    </span>
                    <span className="text-muted-foreground ml-1">peserta</span>
                  </div>
                  <Badge className={topicColors[session.topic as keyof typeof topicColors]}>
                    {session.topic}
                  </Badge>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {session.description}
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
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Tidak ada sesi kelompok yang sesuai dengan filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}