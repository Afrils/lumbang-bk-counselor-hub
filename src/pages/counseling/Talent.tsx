
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Music, Palette, Trophy, Plus, Search, Filter, Eye, UserPlus } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const mockTalentAssessments = [
  {
    id: 1,
    student: "Ahmad Rizki",
    class: "XI IPA 1",
    talents: ["Matematika", "Teknologi", "Logika"],
    interests: ["Programming", "Robotika", "Game Development"],
    assessment_date: "2025-01-10",
    status: "completed",
    recommendations: "Sangat cocok untuk jurusan Teknik Informatika"
  },
  {
    id: 2,
    student: "Siti Aminah",
    class: "X IPS 2",
    talents: ["Komunikasi", "Seni", "Kepemimpinan"],
    interests: ["Public Speaking", "Desain Grafis", "Organisasi"],
    assessment_date: "2025-01-12",
    status: "in_progress",
    recommendations: "Potensi di bidang komunikasi dan creative arts"
  },
  {
    id: 3,
    student: "Budi Santoso",
    class: "XII IPA 3",
    talents: ["Olahraga", "Analisis", "Kerja Tim"],
    interests: ["Sepak Bola", "Analisis Data", "Kepemimpinan Tim"],
    assessment_date: "2025-01-08",
    status: "completed",
    recommendations: "Cocok untuk sports management atau data analyst"
  }
]

const talentCategories = [
  { value: "academic", label: "Akademik", icon: Star },
  { value: "artistic", label: "Seni", icon: Palette },
  { value: "athletic", label: "Olahraga", icon: Trophy },
  { value: "musical", label: "Musik", icon: Music },
  { value: "leadership", label: "Kepemimpinan", icon: Heart },
  { value: "technical", label: "Teknologi", icon: Star }
]

const statusColors = {
  completed: "bg-green-100 text-green-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-blue-100 text-blue-800"
}

export default function Talent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredAssessments = mockTalentAssessments.filter(assessment => {
    const matchesSearch = assessment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || assessment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateAssessment = () => {
    toast({
      title: "Assessment Berhasil Dibuat",
      description: "Assessment minat & bakat baru telah berhasil dijadwalkan.",
    })
    setIsDialogOpen(false)
  }

  const handleViewDetail = (assessment: any) => {
    setSelectedAssessment(assessment)
    setIsDetailDialogOpen(true)
  }

  const handleCreateProgram = (assessment: any) => {
    setSelectedAssessment(assessment)
    setIsProgramDialogOpen(true)
  }

  const handleCreateDevelopmentProgram = () => {
    toast({
      title: "Program Pengembangan Dibuat",
      description: `Program pengembangan bakat untuk ${selectedAssessment?.student} telah berhasil dibuat.`,
    })
    setIsProgramDialogOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Minat & Bakat</h1>
            <p className="text-muted-foreground">
              Identifikasi dan kembangkan minat serta bakat siswa
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Assessment Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Assessment Minat & Bakat</DialogTitle>
                <DialogDescription>
                  Buat assessment baru untuk mengidentifikasi minat dan bakat siswa
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
                  <Label>Kategori Bakat yang Akan Dinilai</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {talentCategories.map((category) => (
                      <div key={category.value} className="flex items-center space-x-2">
                        <Checkbox id={category.value} />
                        <Label htmlFor={category.value} className="text-sm">
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="method">Metode Assessment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih metode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interview">Wawancara</SelectItem>
                      <SelectItem value="test">Tes Psikologi</SelectItem>
                      <SelectItem value="observation">Observasi</SelectItem>
                      <SelectItem value="portfolio">Review Portfolio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="date">Tanggal Assessment</Label>
                  <Input type="date" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Catatan Awal</Label>
                  <Textarea placeholder="Catatan observasi awal atau rencana assessment..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleCreateAssessment}>
                  Buat Assessment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessment</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+5 bulan ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bakat Teridentifikasi</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">berbagai kategori</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Siswa Aktif Program</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">mengikuti pengembangan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Kepuasan</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">feedback positif</p>
            </CardContent>
          </Card>
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
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="in_progress">Berlangsung</SelectItem>
              <SelectItem value="scheduled">Terjadwal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Assessments Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{assessment.student}</CardTitle>
                    <CardDescription>{assessment.class}</CardDescription>
                  </div>
                  <Badge className={statusColors[assessment.status as keyof typeof statusColors]}>
                    {assessment.status === 'completed' ? 'Selesai' : 
                     assessment.status === 'in_progress' ? 'Berlangsung' : 'Terjadwal'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Bakat Teridentifikasi:</p>
                    <div className="flex flex-wrap gap-1">
                      {assessment.talents.map((talent, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {talent}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Minat:</p>
                    <div className="flex flex-wrap gap-1">
                      {assessment.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Assessment: {new Date(assessment.assessment_date).toLocaleDateString('id-ID')}
                    </p>
                  </div>

                  {assessment.status === 'completed' && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        <strong>Rekomendasi:</strong> {assessment.recommendations}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewDetail(assessment)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      Detail
                    </Button>
                    {assessment.status === 'completed' && (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleCreateProgram(assessment)}
                      >
                        <UserPlus className="mr-1 h-3 w-3" />
                        Program Lanjutan
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Tidak ada assessment yang sesuai dengan filter
              </p>
            </CardContent>
          </Card>
        )}

        {/* Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detail Assessment Minat & Bakat</DialogTitle>
              <DialogDescription>
                Hasil assessment untuk {selectedAssessment?.student}
              </DialogDescription>
            </DialogHeader>
            {selectedAssessment && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Siswa</Label>
                    <p>{selectedAssessment.student}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Kelas</Label>
                    <p>{selectedAssessment.class}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Tanggal Assessment</Label>
                  <p>{new Date(selectedAssessment.assessment_date).toLocaleDateString('id-ID')}</p>
                </div>
                <div>
                  <Label className="font-semibold">Bakat yang Teridentifikasi</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedAssessment.talents.map((talent: string, index: number) => (
                      <Badge key={index} variant="secondary">{talent}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Area Minat</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedAssessment.interests.map((interest: string, index: number) => (
                      <Badge key={index} variant="outline">{interest}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Status Assessment</Label>
                  <Badge className={statusColors[selectedAssessment.status as keyof typeof statusColors]}>
                    {selectedAssessment.status === 'completed' ? 'Selesai' : 
                     selectedAssessment.status === 'in_progress' ? 'Berlangsung' : 'Terjadwal'}
                  </Badge>
                </div>
                {selectedAssessment.status === 'completed' && (
                  <div>
                    <Label className="font-semibold">Rekomendasi Pengembangan</Label>
                    <p className="text-sm bg-muted p-3 rounded-lg mt-1">{selectedAssessment.recommendations}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Program Development Dialog */}
        <Dialog open={isProgramDialogOpen} onOpenChange={setIsProgramDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Program Pengembangan Bakat</DialogTitle>
              <DialogDescription>
                Buat program pengembangan khusus untuk {selectedAssessment?.student}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="focus">Fokus Pengembangan</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih fokus utama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Pengembangan Akademik</SelectItem>
                    <SelectItem value="artistic">Pengembangan Seni</SelectItem>
                    <SelectItem value="athletic">Pengembangan Olahraga</SelectItem>
                    <SelectItem value="leadership">Pengembangan Kepemimpinan</SelectItem>
                    <SelectItem value="technical">Pengembangan Teknologi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Durasi Program</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih durasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Bulan</SelectItem>
                    <SelectItem value="3months">3 Bulan</SelectItem>
                    <SelectItem value="6months">6 Bulan</SelectItem>
                    <SelectItem value="1year">1 Tahun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="activities">Aktivitas yang Direncanakan</Label>
                <Textarea placeholder="Jelaskan aktivitas dan kegiatan yang akan dilakukan..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goals">Target & Tujuan</Label>
                <Textarea placeholder="Jelaskan target yang ingin dicapai dalam program ini..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resources">Sumber Daya yang Diperlukan</Label>
                <Textarea placeholder="Fasilitas, alat, mentor, atau dukungan lain yang diperlukan..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsProgramDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleCreateDevelopmentProgram}>
                Buat Program
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
