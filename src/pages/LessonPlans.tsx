
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Clock, Users, Eye, Edit, Trash2, Plus, Search, Filter, FileDown, Copy } from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"

const mockLessonPlans = [
  {
    id: 1,
    title: "Mengenal Diri dan Potensi",
    subject: "Bimbingan Pribadi",
    class: "X",
    duration: 45,
    objectives: ["Siswa dapat mengidentifikasi kekuatan dan kelemahan diri", "Siswa dapat menyusun rencana pengembangan diri"],
    activities: ["Ice breaking", "Self assessment", "Diskusi kelompok", "Refleksi"],
    materials: ["Lembar assessment", "Video motivasi", "Worksheet"],
    evaluation: "Observasi dan hasil worksheet",
    status: "published",
    created_date: "2025-01-10",
    last_used: "2025-01-15"
  },
  {
    id: 2,
    title: "Strategi Belajar Efektif",
    subject: "Bimbingan Belajar",
    class: "XI",
    duration: 45,
    objectives: ["Siswa memahami berbagai metode belajar", "Siswa dapat menerapkan strategi belajar yang sesuai"],
    activities: ["Presentasi metode belajar", "Praktek teknik mencatat", "Sharing pengalaman"],
    materials: ["Slide presentasi", "Contoh catatan", "Handout"],
    evaluation: "Quiz dan praktek langsung",
    status: "published",
    created_date: "2025-01-08",
    last_used: "2025-01-12"
  },
  {
    id: 3,
    title: "Perencanaan Karir Masa Depan",
    subject: "Bimbingan Karir",
    class: "XII",
    duration: 90,
    objectives: ["Siswa dapat mengidentifikasi minat karir", "Siswa dapat menyusun rencana karir jangka pendek dan panjang"],
    activities: ["Career assessment", "Penelusuran informasi karir", "Penyusunan action plan"],
    materials: ["Career interest inventory", "Brosur perguruan tinggi", "Template action plan"],
    evaluation: "Presentasi rencana karir individu",
    status: "draft",
    created_date: "2025-01-12",
    last_used: null
  }
]

const statusColors = {
  published: "bg-green-100 text-green-800",
  draft: "bg-yellow-100 text-yellow-800",
  archived: "bg-gray-100 text-gray-800"
}

const subjectColors = {
  "Bimbingan Pribadi": "bg-blue-100 text-blue-800",
  "Bimbingan Belajar": "bg-green-100 text-green-800",
  "Bimbingan Karir": "bg-purple-100 text-purple-800",
  "Bimbingan Sosial": "bg-orange-100 text-orange-800"
}

export default function LessonPlans() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredPlans = mockLessonPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || plan.status === statusFilter
    const matchesSubject = subjectFilter === "all" || plan.subject === subjectFilter
    return matchesSearch && matchesStatus && matchesSubject
  })

  const handleCreatePlan = () => {
    toast({
      title: "RPL Berhasil Dibuat",
      description: "Rencana Pelaksanaan Layanan BK baru telah berhasil dibuat.",
    })
    setIsCreateDialogOpen(false)
  }

  const handleViewPlan = (plan: any) => {
    setSelectedPlan(plan)
    setIsViewDialogOpen(true)
  }

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan)
    setIsEditDialogOpen(true)
  }

  const handleUpdatePlan = () => {
    toast({
      title: "RPL Berhasil Diperbarui",
      description: "Perubahan RPL telah berhasil disimpan.",
    })
    setIsEditDialogOpen(false)
  }

  const handleDeletePlan = (plan: any) => {
    if (confirm(`Apakah Anda yakin ingin menghapus RPL "${plan.title}"?`)) {
      toast({
        title: "RPL Berhasil Dihapus",
        description: `RPL "${plan.title}" telah dihapus.`,
      })
    }
  }

  const handleDuplicatePlan = (plan: any) => {
    toast({
      title: "RPL Berhasil Diduplikasi",
      description: `Salinan RPL "${plan.title}" telah dibuat.`,
    })
  }

  const handleDownloadPlan = (plan: any) => {
    toast({
      title: "Mengunduh RPL",
      description: `RPL "${plan.title}" sedang diunduh dalam format PDF.`,
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">RPL BK</h1>
            <p className="text-muted-foreground">
              Rencana Pelaksanaan Layanan Bimbingan dan Konseling
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Buat RPL Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Buat RPL BK Baru</DialogTitle>
                <DialogDescription>
                  Buat Rencana Pelaksanaan Layanan Bimbingan dan Konseling
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul Layanan</Label>
                  <Input placeholder="Contoh: Mengenal Diri dan Potensi" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Bidang Layanan</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih bidang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pribadi">Bimbingan Pribadi</SelectItem>
                        <SelectItem value="belajar">Bimbingan Belajar</SelectItem>
                        <SelectItem value="karir">Bimbingan Karir</SelectItem>
                        <SelectItem value="sosial">Bimbingan Sosial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="class">Kelas</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="X">Kelas X</SelectItem>
                        <SelectItem value="XI">Kelas XI</SelectItem>
                        <SelectItem value="XII">Kelas XII</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="duration">Alokasi Waktu (menit)</Label>
                  <Input type="number" placeholder="45" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="objectives">Tujuan Layanan</Label>
                  <Textarea 
                    placeholder="Masukkan tujuan layanan (pisahkan dengan enter untuk multiple tujuan)..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="activities">Kegiatan Layanan</Label>
                  <Textarea 
                    placeholder="Uraikan kegiatan yang akan dilakukan step by step..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="materials">Materi dan Media</Label>
                  <Textarea 
                    placeholder="Daftar materi, media, dan alat yang diperlukan..."
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="evaluation">Evaluasi</Label>
                  <Textarea 
                    placeholder="Metode dan instrumen evaluasi yang akan digunakan..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleCreatePlan}>
                  Buat RPL
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total RPL</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockLessonPlans.length}</div>
              <p className="text-xs text-muted-foreground">rencana layanan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dipublikasi</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockLessonPlans.filter(p => p.status === 'published').length}
              </div>
              <p className="text-xs text-muted-foreground">siap digunakan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Durasi</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mockLessonPlans.reduce((acc, p) => acc + p.duration, 0) / mockLessonPlans.length)}
              </div>
              <p className="text-xs text-muted-foreground">menit per layanan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Telah Digunakan</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockLessonPlans.filter(p => p.last_used).length}
              </div>
              <p className="text-xs text-muted-foreground">RPL aktif</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari judul RPL atau bidang layanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Bidang</SelectItem>
              <SelectItem value="Bimbingan Pribadi">Bimbingan Pribadi</SelectItem>
              <SelectItem value="Bimbingan Belajar">Bimbingan Belajar</SelectItem>
              <SelectItem value="Bimbingan Karir">Bimbingan Karir</SelectItem>
              <SelectItem value="Bimbingan Sosial">Bimbingan Sosial</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="published">Dipublikasi</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Diarsipkan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lesson Plans Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg line-clamp-2">{plan.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Kelas {plan.class} • {plan.duration} menit
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={subjectColors[plan.subject as keyof typeof subjectColors]}>
                      {plan.subject}
                    </Badge>
                    <Badge className={statusColors[plan.status as keyof typeof statusColors]}>
                      {plan.status === 'published' ? 'Dipublikasi' : 
                       plan.status === 'draft' ? 'Draft' : 'Diarsipkan'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Tujuan Utama:</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {plan.objectives[0]}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Kegiatan:</p>
                    <div className="flex flex-wrap gap-1">
                      {plan.activities.slice(0, 3).map((activity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                      {plan.activities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{plan.activities.length - 3} lainnya
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Dibuat: {new Date(plan.created_date).toLocaleDateString('id-ID')}</span>
                    {plan.last_used && (
                      <span>Terakhir: {new Date(plan.last_used).toLocaleDateString('id-ID')}</span>
                    )}
                  </div>

                  <div className="flex gap-1 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewPlan(plan)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      Lihat
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDownloadPlan(plan)}
                    >
                      <FileDown className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDuplicatePlan(plan)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleEditPlan(plan)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDeletePlan(plan)}
                    >
                      <Trash2 className="h-3 w-3" />
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
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Tidak ada RPL yang sesuai dengan filter
              </p>
            </CardContent>
          </Card>
        )}

        {/* View Plan Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>RPL: {selectedPlan?.title}</DialogTitle>
              <DialogDescription>
                {selectedPlan?.subject} - Kelas {selectedPlan?.class}
              </DialogDescription>
            </DialogHeader>
            {selectedPlan && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Bidang Layanan</Label>
                    <Badge className={subjectColors[selectedPlan.subject as keyof typeof subjectColors]}>
                      {selectedPlan.subject}
                    </Badge>
                  </div>
                  <div>
                    <Label className="font-semibold">Alokasi Waktu</Label>
                    <p>{selectedPlan.duration} menit</p>
                  </div>
                </div>

                <div>
                  <Label className="font-semibold">Tujuan Layanan</Label>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {selectedPlan.objectives.map((objective: string, index: number) => (
                      <li key={index} className="text-sm">{objective}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Label className="font-semibold">Kegiatan Layanan</Label>
                  <div className="space-y-2 mt-2">
                    {selectedPlan.activities.map((activity: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs min-w-6 h-6 flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <span className="text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="font-semibold">Materi dan Media</Label>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedPlan.materials.map((material: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="font-semibold">Evaluasi</Label>
                  <p className="text-sm bg-muted p-3 rounded-lg mt-2">{selectedPlan.evaluation}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Status</Label>
                    <Badge className={statusColors[selectedPlan.status as keyof typeof statusColors]}>
                      {selectedPlan.status === 'published' ? 'Dipublikasi' : 
                       selectedPlan.status === 'draft' ? 'Draft' : 'Diarsipkan'}
                    </Badge>
                  </div>
                  <div>
                    <Label className="font-semibold">Terakhir Digunakan</Label>
                    <p className="text-sm">
                      {selectedPlan.last_used 
                        ? new Date(selectedPlan.last_used).toLocaleDateString('id-ID')
                        : 'Belum pernah digunakan'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={() => handleDownloadPlan(selectedPlan)}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" onClick={() => handleDuplicatePlan(selectedPlan)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplikasi
                  </Button>
                  <Button variant="outline" onClick={() => handleEditPlan(selectedPlan)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Plan Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit RPL</DialogTitle>
              <DialogDescription>
                Perbarui Rencana Pelaksanaan Layanan "{selectedPlan?.title}"
              </DialogDescription>
            </DialogHeader>
            {selectedPlan && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul Layanan</Label>
                  <Input defaultValue={selectedPlan.title} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Bidang Layanan</Label>
                    <Select defaultValue={selectedPlan.subject}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bimbingan Pribadi">Bimbingan Pribadi</SelectItem>
                        <SelectItem value="Bimbingan Belajar">Bimbingan Belajar</SelectItem>
                        <SelectItem value="Bimbingan Karir">Bimbingan Karir</SelectItem>
                        <SelectItem value="Bimbingan Sosial">Bimbingan Sosial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Alokasi Waktu (menit)</Label>
                    <Input type="number" defaultValue={selectedPlan.duration} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="objectives">Tujuan Layanan</Label>
                  <Textarea 
                    defaultValue={selectedPlan.objectives.join('\n')}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="activities">Kegiatan Layanan</Label>
                  <Textarea 
                    defaultValue={selectedPlan.activities.join('\n')}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="evaluation">Evaluasi</Label>
                  <Textarea defaultValue={selectedPlan.evaluation} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={selectedPlan.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Dipublikasi</SelectItem>
                      <SelectItem value="archived">Diarsipkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleUpdatePlan}>
                Simpan Perubahan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
