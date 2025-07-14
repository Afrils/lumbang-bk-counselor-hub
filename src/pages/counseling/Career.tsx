import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, TrendingUp, Target, Plus, Search, Filter } from "lucide-react"
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

const mockCareerPrograms = [
  {
    id: 1,
    student: "Ahmad Rizki",
    class: "XI IPA 1",
    careerGoal: "Software Engineer",
    currentProgress: 75,
    interests: ["Programming", "Technology", "Problem Solving"],
    skills: ["Python", "Web Development", "Logical Thinking"],
    recommendations: ["Teknik Informatika", "Sistem Informasi", "Teknik Komputer"],
    mentoring_sessions: 6,
    status: "active"
  },
  {
    id: 2,
    student: "Siti Aminah",
    class: "X IPS 2",
    careerGoal: "Marketing Manager",
    currentProgress: 60,
    interests: ["Communication", "Creative Thinking", "Business"],
    skills: ["Public Speaking", "Social Media", "Leadership"],
    recommendations: ["Manajemen", "Komunikasi", "Psikologi"],
    mentoring_sessions: 4,
    status: "active"
  },
  {
    id: 3,
    student: "Budi Santoso",
    class: "XII IPA 3",
    careerGoal: "Doctor",
    currentProgress: 85,
    interests: ["Healthcare", "Science", "Helping Others"],
    skills: ["Biology", "Chemistry", "Empathy"],
    recommendations: ["Kedokteran", "Farmasi", "Kesehatan Masyarakat"],
    mentoring_sessions: 8,
    status: "completed"
  }
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  on_hold: "bg-yellow-100 text-yellow-800"
}

export default function Career() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredPrograms = mockCareerPrograms.filter(program => {
    const matchesSearch = program.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.careerGoal.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || program.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bimbingan Karir</h1>
            <p className="text-muted-foreground">
              Membantu siswa merencanakan dan mempersiapkan karir masa depan
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Program Karir Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Buat Program Bimbingan Karir</DialogTitle>
                <DialogDescription>
                  Buat program bimbingan karir baru untuk membantu siswa merencanakan masa depan
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
                  <Label htmlFor="careerGoal">Tujuan Karir</Label>
                  <Input placeholder="Contoh: Software Engineer, Doctor, Teacher..." />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="interests">Minat (pisahkan dengan koma)</Label>
                  <Input placeholder="Contoh: Programming, Technology, Problem Solving..." />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="skills">Keterampilan Saat Ini (pisahkan dengan koma)</Label>
                  <Input placeholder="Contoh: Python, Leadership, Public Speaking..." />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="assessment">Assessment Awal</Label>
                  <Textarea placeholder="Jelaskan motivasi, kekuatan, dan area yang perlu dikembangkan..." />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="plan">Rencana Pengembangan</Label>
                  <Textarea placeholder="Jelaskan langkah-langkah yang akan dilakukan untuk mencapai tujuan karir..." />
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
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">siswa dalam bimbingan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sesi Mentoring</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84</div>
              <p className="text-xs text-muted-foreground">total sesi bulan ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Kepuasan</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">feedback positif</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Target Tercapai</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76%</div>
              <p className="text-xs text-muted-foreground">siswa mencapai goals</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari siswa atau tujuan karir..."
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
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="on_hold">Ditangguhkan</SelectItem>
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
                    <CardDescription>{program.class}</CardDescription>
                  </div>
                  <Badge className={statusColors[program.status as keyof typeof statusColors]}>
                    {program.status === 'active' ? 'Aktif' : 
                     program.status === 'completed' ? 'Selesai' : 'Ditangguhkan'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-primary">Tujuan Karir:</p>
                    <p className="text-lg font-semibold">{program.careerGoal}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{program.currentProgress}%</span>
                    </div>
                    <Progress value={program.currentProgress} className="h-2" />
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Minat:</p>
                    <div className="flex flex-wrap gap-1">
                      {program.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Keterampilan:</p>
                    <div className="flex flex-wrap gap-1">
                      {program.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Rekomendasi Jurusan:</p>
                    <div className="text-sm text-muted-foreground">
                      {program.recommendations.join(", ")}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{program.mentoring_sessions} sesi mentoring</span>
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
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Tidak ada program karir yang sesuai dengan filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}