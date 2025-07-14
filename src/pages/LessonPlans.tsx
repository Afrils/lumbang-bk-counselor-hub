import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Target, Calendar, Clock, FileText, Plus, Search, Filter, Download } from "lucide-react"
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

const mockLessonPlans = [
  {
    id: 1,
    title: "RPL BK - Manajemen Stres untuk Siswa Kelas XII",
    topic: "Stress Management",
    target_class: "XII",
    duration: "2 x 45 menit",
    objectives: [
      "Siswa mampu mengidentifikasi sumber stres",
      "Siswa dapat menerapkan teknik relaksasi dasar",
      "Siswa memahami pentingnya manajemen waktu"
    ],
    methods: ["Diskusi Kelompok", "Role Playing", "Praktik Relaksasi"],
    materials: ["Slide Presentasi", "Video Motivasi", "Lembar Kerja"],
    assessment: "Observasi partisipasi dan refleksi tertulis",
    created_date: "2025-01-10",
    status: "completed",
    implementation_date: "2025-01-15"
  },
  {
    id: 2,
    title: "RPL BK - Bimbingan Karir dan Pemilihan Jurusan",
    topic: "Career Guidance",
    target_class: "XI",
    duration: "3 x 45 menit",
    objectives: [
      "Siswa dapat mengeksplorasi minat dan bakat",
      "Siswa memahami berbagai pilihan karir",
      "Siswa mampu merencanakan langkah pendidikan lanjutan"
    ],
    methods: ["Assessment", "Presentasi", "Konsultasi Individual"],
    materials: ["Tes Minat Bakat", "Brosur Universitas", "Form Perencanaan"],
    assessment: "Portfolio perencanaan karir siswa",
    created_date: "2025-01-08",
    status: "in_progress",
    implementation_date: "2025-01-20"
  },
  {
    id: 3,
    title: "RPL BK - Keterampilan Sosial dan Komunikasi",
    topic: "Social Skills",
    target_class: "X",
    duration: "2 x 45 menit",
    objectives: [
      "Siswa dapat berkomunikasi efektif",
      "Siswa memahami pentingnya empati",
      "Siswa mampu menyelesaikan konflik secara konstruktif"
    ],
    methods: ["Simulasi", "Bermain Peran", "Diskusi Kelompok"],
    materials: ["Skenario Komunikasi", "Kartu Situasi", "Panduan Empati"],
    assessment: "Praktik komunikasi dan peer assessment",
    created_date: "2025-01-05",
    status: "draft",
    implementation_date: "2025-01-25"
  },
  {
    id: 4,
    title: "RPL BK - Pencegahan Bullying dan Cyber Bullying",
    topic: "Anti-Bullying",
    target_class: "VII, VIII, IX",
    duration: "1 x 45 menit",
    objectives: [
      "Siswa memahami definisi dan dampak bullying",
      "Siswa dapat mengidentifikasi tanda-tanda bullying",
      "Siswa mengetahui cara melaporkan bullying"
    ],
    methods: ["Video Edukasi", "Diskusi", "Pledge Taking"],
    materials: ["Video Anti-Bullying", "Poster Kampanye", "Form Pelaporan"],
    assessment: "Komitmen anti-bullying tertulis",
    created_date: "2024-12-28",
    status: "completed",
    implementation_date: "2025-01-12"
  }
]

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  reviewed: "bg-blue-100 text-blue-800"
}

const topicColors = {
  "Stress Management": "bg-yellow-100 text-yellow-800",
  "Career Guidance": "bg-purple-100 text-purple-800",
  "Social Skills": "bg-green-100 text-green-800",
  "Anti-Bullying": "bg-red-100 text-red-800",
  "Academic Support": "bg-blue-100 text-blue-800"
}

export default function LessonPlans() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredPlans = mockLessonPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || plan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">RPL BK (Rencana Pelaksanaan Layanan)</h1>
            <p className="text-muted-foreground">
              Kelola rencana pelaksanaan layanan bimbingan dan konseling
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Template RPL
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Buat RPL Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Buat RPL BK Baru</DialogTitle>
                  <DialogDescription>
                    Buat rencana pelaksanaan layanan bimbingan dan konseling baru
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Judul RPL</Label>
                    <Input placeholder="Masukkan judul RPL..." />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="topic">Topik/Bidang Layanan</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih topik" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stress-management">Manajemen Stres</SelectItem>
                        <SelectItem value="career-guidance">Bimbingan Karir</SelectItem>
                        <SelectItem value="social-skills">Keterampilan Sosial</SelectItem>
                        <SelectItem value="anti-bullying">Anti-Bullying</SelectItem>
                        <SelectItem value="academic-support">Dukungan Akademik</SelectItem>
                        <SelectItem value="personal-development">Pengembangan Diri</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="target_class">Kelas Target</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="X">Kelas X</SelectItem>
                          <SelectItem value="XI">Kelas XI</SelectItem>
                          <SelectItem value="XII">Kelas XII</SelectItem>
                          <SelectItem value="X,XI">Kelas X & XI</SelectItem>
                          <SelectItem value="XI,XII">Kelas XI & XII</SelectItem>
                          <SelectItem value="X,XI,XII">Semua Kelas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Durasi</Label>
                      <Input placeholder="2 x 45 menit" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="objectives">Tujuan Pembelajaran (pisahkan dengan enter)</Label>
                    <Textarea 
                      placeholder="Siswa mampu..."
                      className="min-h-20"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="methods">Metode/Strategi (pisahkan dengan koma)</Label>
                    <Input placeholder="Diskusi Kelompok, Role Playing, Presentasi..." />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="materials">Media/Alat (pisahkan dengan koma)</Label>
                    <Input placeholder="Slide Presentasi, Video, Lembar Kerja..." />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="activities">Kegiatan Pembelajaran</Label>
                    <Textarea 
                      placeholder="Jelaskan langkah-langkah kegiatan pembelajaran..."
                      className="min-h-24"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="assessment">Penilaian/Evaluasi</Label>
                    <Textarea placeholder="Jelaskan cara menilai ketercapaian tujuan..." />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="implementation_date">Tanggal Pelaksanaan</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    Simpan RPL
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total RPL</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockLessonPlans.length}</div>
              <p className="text-xs text-muted-foreground">semester ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sedang Berjalan</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockLessonPlans.filter(p => p.status === 'in_progress').length}
              </div>
              <p className="text-xs text-muted-foreground">RPL aktif</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Selesai</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockLessonPlans.filter(p => p.status === 'completed').length}
              </div>
              <p className="text-xs text-muted-foreground">RPL terlaksana</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Keberhasilan</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">rata-rata pencapaian</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari judul atau topik RPL..."
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
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="in_progress">Sedang Berjalan</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="reviewed">Direview</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lesson Plans Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPlans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{plan.title}</CardTitle>
                    <CardDescription className="mt-2">
                      Kelas {plan.target_class} • {plan.duration}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={topicColors[plan.topic as keyof typeof topicColors]}>
                      {plan.topic}
                    </Badge>
                    <Badge className={statusColors[plan.status as keyof typeof statusColors]}>
                      {plan.status === 'draft' ? 'Draft' : 
                       plan.status === 'in_progress' ? 'Berjalan' : 
                       plan.status === 'completed' ? 'Selesai' : 'Direview'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Tujuan Pembelajaran:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {plan.objectives.slice(0, 2).map((objective, index) => (
                        <li key={index} className="line-clamp-1">• {objective}</li>
                      ))}
                      {plan.objectives.length > 2 && (
                        <li className="text-xs">+{plan.objectives.length - 2} tujuan lainnya</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Metode:</p>
                    <div className="flex flex-wrap gap-1">
                      {plan.methods.slice(0, 3).map((method, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {method}
                        </Badge>
                      ))}
                      {plan.methods.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{plan.methods.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Dibuat: {new Date(plan.created_date).toLocaleDateString('id-ID')}</span>
                    <span>Pelaksanaan: {new Date(plan.implementation_date).toLocaleDateString('id-ID')}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="mr-1 h-3 w-3" />
                      Lihat Detail
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Tidak ada RPL yang sesuai dengan filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}