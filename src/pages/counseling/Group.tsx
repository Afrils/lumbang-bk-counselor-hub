
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MessageCircle, Plus, Search, Filter, Edit, Trash2, Eye, UserPlus } from "lucide-react"
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
    description: "Sesi kelompok untuk membantu siswa mengelola stres menghadapi ujian",
    facilitator: "Guru BK A"
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
    description: "Meningkatkan kemampuan berinteraksi dan berkomunikasi",
    facilitator: "Guru BK B"
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
    description: "Eksplorasi minat dan bakat untuk perencanaan karir",
    facilitator: "Guru BK C"
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
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [editingSession, setEditingSession] = useState<any>(null)
  const [sessions, setSessions] = useState(mockGroupSessions)
  const [formData, setFormData] = useState({
    title: "",
    class: "",
    date: "",
    time: "",
    maxParticipants: "",
    topic: "",
    description: "",
    facilitator: ""
  })
  const { toast } = useToast()

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || session.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.class || !formData.date || !formData.time || !formData.topic) {
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
          ? { ...session, ...formData, maxParticipants: parseInt(formData.maxParticipants) || 20 }
          : session
      ))
      toast({
        title: "Berhasil",
        description: "Sesi kelompok berhasil diperbarui"
      })
    } else {
      const newSession = {
        id: sessions.length + 1,
        ...formData,
        maxParticipants: parseInt(formData.maxParticipants) || 20,
        participants: 0,
        status: "scheduled"
      }
      setSessions([...sessions, newSession])
      toast({
        title: "Berhasil",
        description: "Sesi kelompok baru berhasil dibuat"
      })
    }

    setIsDialogOpen(false)
    setEditingSession(null)
    resetForm()
  }

  const handleEditSession = (session: any) => {
    setEditingSession(session)
    setFormData({
      title: session.title,
      class: session.class,
      date: session.date,
      time: session.time,
      maxParticipants: session.maxParticipants.toString(),
      topic: session.topic,
      description: session.description,
      facilitator: session.facilitator
    })
    setIsDialogOpen(true)
  }

  const handleDeleteSession = () => {
    if (!selectedSession) return

    setSessions(sessions.filter(session => session.id !== selectedSession.id))
    toast({
      title: "Berhasil",
      description: "Sesi kelompok berhasil dihapus"
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

  const handleAddParticipant = (sessionId: number) => {
    setSessions(sessions.map(session => 
      session.id === sessionId && session.participants < session.maxParticipants
        ? { ...session, participants: session.participants + 1 }
        : session
    ))
    toast({
      title: "Berhasil",
      description: "Peserta berhasil ditambahkan"
    })
  }

  const resetForm = () => {
    setFormData({
      title: "",
      class: "",
      date: "",
      time: "",
      maxParticipants: "",
      topic: "",
      description: "",
      facilitator: ""
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Konseling Kelompok</h1>
            <p className="text-muted-foreground">
              Kelola sesi konseling kelompok dan aktivitas group
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
                Buat Sesi Kelompok
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSession ? "Edit Sesi Kelompok" : "Buat Sesi Konseling Kelompok"}
                </DialogTitle>
                <DialogDescription>
                  {editingSession ? "Perbarui" : "Buat"} sesi konseling kelompok baru untuk beberapa siswa
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSaveSession} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul Sesi</Label>
                  <Input 
                    placeholder="Masukkan judul sesi..."
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class">Kelas Target</Label>
                  <Select value={formData.class} onValueChange={(value) => setFormData({...formData, class: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="X IPA">X IPA</SelectItem>
                      <SelectItem value="X IPS">X IPS</SelectItem>
                      <SelectItem value="XI IPA">XI IPA</SelectItem>
                      <SelectItem value="XI IPS">XI IPS</SelectItem>
                      <SelectItem value="XII IPA">XII IPA</SelectItem>
                      <SelectItem value="XII IPS">XII IPS</SelectItem>
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
                  <Label htmlFor="maxParticipants">Maksimal Peserta</Label>
                  <Input 
                    type="number" 
                    placeholder="15" 
                    min="1"
                    max="50"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="facilitator">Fasilitator</Label>
                  <Select value={formData.facilitator} onValueChange={(value) => setFormData({...formData, facilitator: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih fasilitator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Guru BK A">Guru BK A</SelectItem>
                      <SelectItem value="Guru BK B">Guru BK B</SelectItem>
                      <SelectItem value="Guru BK C">Guru BK C</SelectItem>
                      <SelectItem value="Tim BK">Tim BK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="topic">Topik</Label>
                  <Select value={formData.topic} onValueChange={(value) => setFormData({...formData, topic: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih topik" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Stress Management">Stress Management</SelectItem>
                      <SelectItem value="Social Skills">Social Skills</SelectItem>
                      <SelectItem value="Career Guidance">Career Guidance</SelectItem>
                      <SelectItem value="Peer Support">Peer Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea 
                    placeholder="Jelaskan tujuan dan aktivitas sesi..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingSession ? "Perbarui" : "Buat Sesi"}
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
              placeholder="Cari judul sesi atau kelas..."
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
                    <CardTitle className="text-lg truncate">{session.title}</CardTitle>
                    <CardDescription className="truncate">{session.class}</CardDescription>
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
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{new Date(session.date).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
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
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex flex-col sm:flex-row gap-2">
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
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {session.status === 'scheduled' && session.participants < session.maxParticipants && (
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="flex-1"
                          onClick={() => handleAddParticipant(session.id)}
                        >
                          <UserPlus className="mr-1 h-3 w-3" />
                          Tambah Peserta
                        </Button>
                      )}
                      {session.status === 'scheduled' && (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleStatusChange(session.id, 'completed')}
                        >
                          Mulai Sesi
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

        {/* Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detail Sesi Kelompok</DialogTitle>
              <DialogDescription>
                Informasi lengkap sesi konseling kelompok
              </DialogDescription>
            </DialogHeader>
            {selectedSession && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Judul Sesi</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedSession.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Kelas Target</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedSession.class}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Fasilitator</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedSession.facilitator}</p>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Peserta</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedSession.participants}/{selectedSession.maxParticipants} orang
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Badge className={`${statusColors[selectedSession.status as keyof typeof statusColors]} mt-1`}>
                      {selectedSession.status === 'scheduled' ? 'Terjadwal' : 
                       selectedSession.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Topik</Label>
                  <Badge className={`${topicColors[selectedSession.topic as keyof typeof topicColors]} mt-1`}>
                    {selectedSession.topic}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Deskripsi</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedSession.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Sesi Kelompok</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus sesi kelompok "{selectedSession?.title}"? 
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
