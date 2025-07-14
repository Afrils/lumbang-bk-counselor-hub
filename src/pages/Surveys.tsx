import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Eye, Users, BarChart3, Plus, Search, Filter } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"

const mockSurveys = [
  {
    id: 1,
    title: "Evaluasi Kepuasan Layanan BK",
    description: "Survey untuk mengevaluasi tingkat kepuasan siswa terhadap layanan bimbingan konseling",
    type: "satisfaction",
    target_class: ["X", "XI", "XII"],
    status: "active",
    created_date: "2025-01-10",
    end_date: "2025-01-25",
    responses: 156,
    total_target: 200,
    questions_count: 15
  },
  {
    id: 2,
    title: "Assessment Minat dan Bakat Siswa",
    description: "Angket untuk mengidentifikasi minat dan bakat siswa dalam bidang akademik dan non-akademik",
    type: "assessment",
    target_class: ["XI"],
    status: "active",
    created_date: "2025-01-08",
    end_date: "2025-01-20",
    responses: 89,
    total_target: 120,
    questions_count: 25
  },
  {
    id: 3,
    title: "Survey Masalah Akademik",
    description: "Identifikasi masalah-masalah akademik yang dihadapi siswa",
    type: "problem_identification",
    target_class: ["X"],
    status: "completed",
    created_date: "2024-12-15",
    end_date: "2024-12-30",
    responses: 180,
    total_target: 180,
    questions_count: 20
  },
  {
    id: 4,
    title: "Angket Pilihan Karir",
    description: "Survey untuk membantu siswa dalam perencanaan karir dan pemilihan jurusan",
    type: "career_guidance",
    target_class: ["XII"],
    status: "draft",
    created_date: "2025-01-12",
    end_date: "2025-02-01",
    responses: 0,
    total_target: 150,
    questions_count: 18
  }
]

const typeColors = {
  satisfaction: "bg-green-100 text-green-800",
  assessment: "bg-blue-100 text-blue-800",
  problem_identification: "bg-yellow-100 text-yellow-800",
  career_guidance: "bg-purple-100 text-purple-800"
}

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  closed: "bg-red-100 text-red-800"
}

export default function Surveys() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredSurveys = mockSurveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || survey.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Angket & Survey</h1>
            <p className="text-muted-foreground">
              Kelola angket dan survey untuk mengumpulkan data dari siswa
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Buat Angket Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Buat Angket/Survey Baru</DialogTitle>
                <DialogDescription>
                  Buat angket atau survey baru untuk mengumpulkan data dari siswa
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul Angket</Label>
                  <Input placeholder="Masukkan judul angket..." />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea placeholder="Jelaskan tujuan dan ruang lingkup angket..." />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="type">Jenis Angket</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis angket" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="satisfaction">Evaluasi Kepuasan</SelectItem>
                      <SelectItem value="assessment">Assessment/Penilaian</SelectItem>
                      <SelectItem value="problem_identification">Identifikasi Masalah</SelectItem>
                      <SelectItem value="career_guidance">Bimbingan Karir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="target">Target Kelas</Label>
                  <div className="flex gap-2 flex-wrap">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Kelas X</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Kelas XI</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Kelas XII</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start_date">Tanggal Mulai</Label>
                    <Input type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end_date">Tanggal Berakhir</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="questions">Perkiraan Jumlah Pertanyaan</Label>
                  <Input type="number" placeholder="15" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="instructions">Instruksi untuk Siswa</Label>
                  <Textarea placeholder="Berikan instruksi yang jelas tentang cara mengisi angket..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Buat Angket
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Angket</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSurveys.length}</div>
              <p className="text-xs text-muted-foreground">semester ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sedang Aktif</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockSurveys.filter(s => s.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">membutuhkan respons</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Respons</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockSurveys.reduce((sum, s) => sum + s.responses, 0)}
              </div>
              <p className="text-xs text-muted-foreground">dari semua angket</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Respons</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">rata-rata partisipasi</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari judul angket..."
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
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="closed">Ditutup</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Surveys Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSurveys.map((survey) => (
            <Card key={survey.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg line-clamp-2">{survey.title}</CardTitle>
                    <CardDescription className="mt-2">
                      Target: {survey.target_class.join(", ")}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={typeColors[survey.type as keyof typeof typeColors]}>
                      {survey.type === 'satisfaction' ? 'Kepuasan' : 
                       survey.type === 'assessment' ? 'Assessment' : 
                       survey.type === 'problem_identification' ? 'Identifikasi' : 'Karir'}
                    </Badge>
                    <Badge className={statusColors[survey.status as keyof typeof statusColors]}>
                      {survey.status === 'draft' ? 'Draft' : 
                       survey.status === 'active' ? 'Aktif' : 
                       survey.status === 'completed' ? 'Selesai' : 'Ditutup'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {survey.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Respons</span>
                      <span>{survey.responses}/{survey.total_target}</span>
                    </div>
                    <Progress 
                      value={(survey.responses / survey.total_target) * 100} 
                      className="h-2" 
                    />
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{survey.questions_count} pertanyaan</span>
                    <span>Berakhir: {new Date(survey.end_date).toLocaleDateString('id-ID')}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="mr-1 h-3 w-3" />
                      Lihat
                    </Button>
                    {survey.status === 'active' && (
                      <Button size="sm" className="flex-1">
                        <BarChart3 className="mr-1 h-3 w-3" />
                        Hasil
                      </Button>
                    )}
                    {survey.status === 'draft' && (
                      <Button size="sm" className="flex-1">
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSurveys.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Tidak ada angket yang sesuai dengan filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}