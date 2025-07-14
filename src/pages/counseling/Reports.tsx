import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Eye, Clock, CheckCircle, Plus, Search, Filter, MoreHorizontal } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockReports = [
  {
    id: 1,
    title: "Bullying di Kelas XI IPA 1",
    reporter: "Anonim",
    reported_student: "Siswa A",
    category: "bullying",
    priority: "high",
    status: "investigating",
    report_date: "2025-01-14",
    description: "Adanya intimidasi verbal yang terjadi secara berulang di kelas",
    assigned_to: "Guru BK A"
  },
  {
    id: 2,
    title: "Masalah Keluarga - Perceraian Orang Tua",
    reporter: "Siti Aminah",
    reported_student: "Siti Aminah",
    category: "family_issues",
    priority: "medium",
    status: "follow_up",
    report_date: "2025-01-12",
    description: "Siswa mengalami stres karena proses perceraian orang tua",
    assigned_to: "Guru BK B"
  },
  {
    id: 3,
    title: "Kecurigaan Penyalahgunaan Obat",
    reporter: "Guru Mata Pelajaran",
    reported_student: "Siswa B",
    category: "substance_abuse",
    priority: "urgent",
    status: "resolved",
    report_date: "2025-01-10",
    description: "Perilaku mencurigakan dan perubahan drastis dalam akademik",
    assigned_to: "Guru BK A"
  }
]

const categoryColors = {
  bullying: "bg-red-100 text-red-800",
  family_issues: "bg-yellow-100 text-yellow-800",
  substance_abuse: "bg-purple-100 text-purple-800",
  academic_issues: "bg-blue-100 text-blue-800",
  mental_health: "bg-green-100 text-green-800"
}

const priorityColors = {
  urgent: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800"
}

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  investigating: "bg-yellow-100 text-yellow-800",
  follow_up: "bg-orange-100 text-orange-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800"
}

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporter.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pelaporan Masalah</h1>
            <p className="text-muted-foreground">
              Kelola laporan masalah dan insiden dari siswa, guru, dan orang tua
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Buat Laporan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Buat Laporan Masalah</DialogTitle>
                <DialogDescription>
                  Buat laporan baru untuk masalah atau insiden yang perlu ditangani
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul Laporan</Label>
                  <Input placeholder="Masukkan judul singkat masalah..." />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori masalah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bullying">Bullying/Intimidasi</SelectItem>
                      <SelectItem value="family_issues">Masalah Keluarga</SelectItem>
                      <SelectItem value="substance_abuse">Penyalahgunaan Obat</SelectItem>
                      <SelectItem value="academic_issues">Masalah Akademik</SelectItem>
                      <SelectItem value="mental_health">Kesehatan Mental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="priority">Tingkat Prioritas</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="low">Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="reporter">Pelapor</Label>
                  <Input placeholder="Nama pelapor (bisa anonim)" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="student">Siswa Terkait</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih siswa (opsional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmad">Ahmad Rizki - XI IPA 1</SelectItem>
                      <SelectItem value="siti">Siti Aminah - X IPS 2</SelectItem>
                      <SelectItem value="budi">Budi Santoso - XII IPA 3</SelectItem>
                      <SelectItem value="anonymous">Tidak disebutkan/Anonim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Deskripsi Masalah</Label>
                  <Textarea 
                    placeholder="Jelaskan masalah secara detail, termasuk waktu, tempat, dan pihak yang terlibat..." 
                    className="min-h-24"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="assigned">Ditugaskan kepada</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih guru BK" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bk-a">Guru BK A</SelectItem>
                      <SelectItem value="bk-b">Guru BK B</SelectItem>
                      <SelectItem value="bk-c">Guru BK C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Buat Laporan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Laporan</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">bulan ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sedang Ditangani</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">memerlukan tindak lanjut</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terselesaikan</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">tingkat resolusi 89%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Waktu</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2</div>
              <p className="text-xs text-muted-foreground">hari penyelesaian</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari judul laporan atau pelapor..."
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
              <SelectItem value="new">Baru</SelectItem>
              <SelectItem value="investigating">Sedang Diselidiki</SelectItem>
              <SelectItem value="follow_up">Tindak Lanjut</SelectItem>
              <SelectItem value="resolved">Terselesaikan</SelectItem>
              <SelectItem value="closed">Ditutup</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <Badge className={priorityColors[report.priority as keyof typeof priorityColors]}>
                        {report.priority === 'urgent' ? 'Urgent' : 
                         report.priority === 'high' ? 'Tinggi' : 
                         report.priority === 'medium' ? 'Sedang' : 'Rendah'}
                      </Badge>
                    </div>
                    <CardDescription>
                      Dilaporkan oleh: {report.reporter} • {new Date(report.report_date).toLocaleDateString('id-ID')}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[report.status as keyof typeof statusColors]}>
                      {report.status === 'new' ? 'Baru' : 
                       report.status === 'investigating' ? 'Sedang Diselidiki' : 
                       report.status === 'follow_up' ? 'Tindak Lanjut' : 
                       report.status === 'resolved' ? 'Terselesaikan' : 'Ditutup'}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Edit Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Assign ke Guru BK Lain
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <Badge className={categoryColors[report.category as keyof typeof categoryColors]}>
                      {report.category === 'bullying' ? 'Bullying/Intimidasi' : 
                       report.category === 'family_issues' ? 'Masalah Keluarga' : 
                       report.category === 'substance_abuse' ? 'Penyalahgunaan Obat' : 
                       report.category === 'academic_issues' ? 'Masalah Akademik' : 'Kesehatan Mental'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Siswa: {report.reported_student}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {report.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Ditangani oleh: {report.assigned_to}
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-1 h-3 w-3" />
                        Detail
                      </Button>
                      {report.status !== 'resolved' && report.status !== 'closed' && (
                        <Button size="sm">
                          Update Status
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Tidak ada laporan yang sesuai dengan filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}