
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MessageCircle, Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const mockSessions = [
  {
    id: 1,
    student: "Ahmad Rizki",
    class: "XI IPA 1",
    date: "2025-01-15",
    time: "10:00",
    status: "scheduled",
    topic: "Masalah Akademik",
    notes: "Kesulitan memahami mata pelajaran Matematika",
    priority: "high"
  },
  {
    id: 2,
    student: "Siti Aminah",
    class: "X IPS 2", 
    date: "2025-01-14",
    time: "13:00",
    status: "completed",
    topic: "Masalah Sosial",
    notes: "Konflik dengan teman sebaya",
    priority: "medium"
  },
  {
    id: 3,
    student: "Budi Santoso",
    class: "XII IPA 3",
    date: "2025-01-16",
    time: "09:00", 
    status: "scheduled",
    topic: "Stress & Kecemasan",
    notes: "Kecemasan menghadapi ujian nasional",
    priority: "high"
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

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800"
}

export default function Individual() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [editingSession, setEditingSession] = useState<any>(null)
  const [sessions, setSessions] = useState(mockSessions)
  const [formData, setFormData] = useState({
    student: "",
    date: "",
    time: "",
    topic: "",
    notes: "",
    priority: "medium"
  })
  const { toast } = useToast()

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || session.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.student || !formData.date || !formData.time || !formData.topic) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      })
      return
    }

    if (editingSession) {
      setSessions(sessions.map(session => 
        session.id === editingSession.id 
          ? { ...session, ...formData, class: "XI IPA 1" }
          : session
      ))
      toast({
        title: "Berhasil",
        description: "Sesi konseling berhasil diperbarui"
      })
    } else {
      const newSession = {
        id: sessions.length + 1,
        ...formData,
        class: "XI IPA 1",
        status: "scheduled"
      }
      setSessions([...sessions, newSession])
      toast({
        title: "Berhasil",
        description: "Sesi konseling baru berhasil dijadwalkan"
      })
    }

    setIsDialogOpen(false)
    setEditingSession(null)
    resetForm()
  }

  const handleEditSession = (session: any) => {
    setEditingSession(session)
    setFormData({
      student: session.student,
      date: session.date,
      time: session.time,
      topic: session.topic,
      notes: session.notes,
      priority: session.priority
    })
    setIsDialogOpen(true)
  }

  const handleDeleteSession = () => {
    if (!selectedSession) return

    setSessions(sessions.filter(session => session.id !== selectedSession.id))
    toast({
      title: "Berhasil",
      description: "Sesi konseling berhasil dihapus"
    })
    setIsDeleteDialogOpen(false)
    setSelectedSession(null)
  }

  const handleStatusChange = (sessionId: number, newStatus: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: newStatus }
        : session
    ))

    const statusText = newStatus === 'completed' ? 'diselesaikan' : 
                      newStatus === 'cancelled' ? 'dibatalkan' : 'dijadwalkan'

    toast({
      title: "Status Diperbarui",
      description: `Sesi berhasil ${statusText}`
    })
  }

  const resetForm = () => {
    setFormData({
      student: "",
      date: "",
      time: "",
      topic: "",
      notes: "",
      priority: "medium"
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Konseling Individu</h1>
            <p className="text-muted-foreground">
              Kelola sesi konseling individual dengan siswa
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) {
              setEditingSession(null)
              resetForm()
            }
          }}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Jadwalkan Sesi
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSession ? "Edit Sesi Konseling" : "Jadwalkan Sesi Konseling"}
                </DialogTitle>
                <DialogDescription>
                  {editingSession ? "Perbarui" : "Buat"} jadwal sesi konseling individual baru
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSaveSession} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="student">Siswa</Label>
                  <Select value={formData.student} onValueChange={(value) => setFormData({...formData, student: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih siswa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ahmad Rizki">Ahmad Rizki - XI IPA 1</SelectItem>
                      <SelectItem value="Siti Aminah">Siti Aminah - X IPS 2</SelectItem>
                      <SelectItem value="Budi Santoso">Budi Santoso - XII IPA 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Tanggal</Label>
                    <Input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Waktu</Label>
                    <Input 
                      type="time" 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="topic">Topik</Label>
                  <Select value={formData.topic} onValueChange={(value) => setFormData({...formData, topic: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih topik" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masalah Akademik">Masalah Akademik</SelectItem>
                      <SelectItem value="Masalah Sosial">Masalah Sosial</SelectItem>
                      <SelectItem value="Stress & Kecemasan">Stress & Kecemasan</SelectItem>
                      <SelectItem value="Masalah Keluarga">Masalah Keluarga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Prioritas</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="low">Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Catatan Awal</Label>
                  <Textarea 
                    placeholder="Masukkan catatan atau keluhan siswa..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingSession ? "Perbarui" : "Simpan"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
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
            <SelectTrigger className="w-full sm:w-48">
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{session.student}</CardTitle>
                    <CardDescription className="truncate">{session.class}</CardDescription>
                  </div>
                  <div className="flex flex-col gap-1 ml-2">
                    <Badge className={statusColors[session.status as keyof typeof statusColors]}>
                      {session.status === 'scheduled' ? 'Terjadwal' : 
                       session.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                    </Badge>
                    <Badge className={priorityColors[session.priority as keyof typeof priorityColors]}>
                      {session.priority === 'high' ? 'Tinggi' : 
                       session.priority === 'medium' ? 'Sedang' : 'Rendah'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{new Date(session.date).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>{session.time}</span>
                  </div>
                  <Badge className={topicColors[session.topic as keyof typeof topicColors]}>
                    {session.topic}
                  </Badge>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {session.notes}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedSession(session)
                        setIsDetailDialogOpen(true)
                      }}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      Detail
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleEditSession(session)}
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    {session.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleStatusChange(session.id, 'completed')}
                      >
                        Selesai
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedSession(session)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Hapus
                    </Button>
                    {session.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => handleStatusChange(session.id, 'cancelled')}
                      >
                        Batal
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

        {/* Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detail Sesi Konseling</DialogTitle>
              <DialogDescription>
                Informasi lengkap sesi konseling individual
              </DialogDescription>
            </DialogHeader>
            {selectedSession && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Siswa</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedSession.student}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Kelas</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedSession.class}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Tanggal</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(selectedSession.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Waktu</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedSession.time}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Topik</Label>
                  <Badge className={`${topicColors[selectedSession.topic as keyof typeof topicColors]} mt-1`}>
                    {selectedSession.topic}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={`${statusColors[selectedSession.status as keyof typeof statusColors]} mt-1 ml-2`}>
                    {selectedSession.status === 'scheduled' ? 'Terjadwal' : 
                     selectedSession.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Catatan</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedSession.notes}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Sesi Konseling</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus sesi konseling dengan {selectedSession?.student}? 
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel className="w-full sm:w-auto">Batal</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteSession}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  )
}
