import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp, TrendingDown, AlertCircle, Plus, Search, Filter } from "lucide-react"
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

const mockStudentPrograms = [
  {
    id: 1,
    student: "Ahmad Rizki",
    class: "XI IPA 1",
    subject: "Matematika",
    currentGrade: 65,
    targetGrade: 80,
    progress: 75,
    status: "active",
    sessions: 8,
    improvement: "+15"
  },
  {
    id: 2,
    student: "Siti Aminah",
    class: "X IPS 2",
    subject: "Bahasa Inggris",
    currentGrade: 72,
    targetGrade: 85,
    progress: 60,
    status: "active",
    sessions: 6,
    improvement: "+12"
  },
  {
    id: 3,
    student: "Budi Santoso",
    class: "XII IPA 3",
    subject: "Fisika",
    currentGrade: 58,
    targetGrade: 75,
    progress: 40,
    status: "needs_attention",
    sessions: 4,
    improvement: "+8"
  }
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  needs_attention: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800"
}

export default function Academic() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredPrograms = mockStudentPrograms.filter(program => {
    const matchesSearch = program.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || program.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bimbingan Belajar</h1>
            <p className="text-muted-foreground">
              Program bimbingan akademik untuk meningkatkan prestasi siswa
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Program Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Buat Program Bimbingan</DialogTitle>
                <DialogDescription>
                  Buat program bimbingan belajar baru untuk siswa
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
                  <Label htmlFor="subject">Mata Pelajaran</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mata pelajaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matematika">Matematika</SelectItem>
                      <SelectItem value="fisika">Fisika</SelectItem>
                      <SelectItem value="kimia">Kimia</SelectItem>
                      <SelectItem value="biologi">Biologi</SelectItem>
                      <SelectItem value="bahasa-inggris">Bahasa Inggris</SelectItem>
                      <SelectItem value="bahasa-indonesia">Bahasa Indonesia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentGrade">Nilai Saat Ini</Label>
                    <Input type="number" placeholder="75" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="targetGrade">Target Nilai</Label>
                    <Input type="number" placeholder="85" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="issues">Masalah yang Dihadapi</Label>
                  <Textarea placeholder="Jelaskan kesulitan atau masalah dalam mata pelajaran..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="plan">Rencana Bimbingan</Label>
                  <Textarea placeholder="Jelaskan strategi dan metode bimbingan..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Buat Program
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Program Aktif</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 dari bulan lalu</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Peningkatan</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5</div>
              <p className="text-xs text-muted-foreground">poin nilai</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perlu Perhatian</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">siswa</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Keberhasilan</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">mencapai target</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari siswa atau mata pelajaran..."
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
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="needs_attention">Perlu Perhatian</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{program.student}</CardTitle>
                    <CardDescription>{program.class} • {program.subject}</CardDescription>
                  </div>
                  <Badge className={statusColors[program.status as keyof typeof statusColors]}>
                    {program.status === 'active' ? 'Aktif' : 
                     program.status === 'needs_attention' ? 'Perlu Perhatian' : 'Selesai'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Nilai: {program.currentGrade}</span>
                    <span>Target: {program.targetGrade}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{program.progress}%</span>
                    </div>
                    <Progress value={program.progress} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span>{program.sessions} sesi</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {program.improvement}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Detail
                    </Button>
                    <Button size="sm" className="flex-1">
                      Sesi Baru
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Tidak ada program bimbingan yang sesuai dengan filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}