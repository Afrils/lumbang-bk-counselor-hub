import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Eye, Edit, Trash2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

function MaterialsContent() {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { user, profile } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMaterials(data || [])
    } catch (error) {
      console.error('Error fetching materials:', error)
      toast({
        title: 'Error',
        description: 'Gagal mengambil data materi',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'academic', label: 'Akademik' },
    { value: 'career', label: 'Karir' },
    { value: 'personal', label: 'Personal' },
    { value: 'social', label: 'Sosial' }
  ]

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = [
    {
      title: 'Total Materi',
      value: materials.length,
      description: 'Materi tersedia',
      color: 'bg-blue-500'
    },
    {
      title: 'Materi Akademik',
      value: materials.filter(m => m.category === 'academic').length,
      description: 'Bimbingan belajar',
      color: 'bg-green-500'
    },
    {
      title: 'Materi Karir',
      value: materials.filter(m => m.category === 'career').length,
      description: 'Bimbingan karir',
      color: 'bg-orange-500'
    },
    {
      title: 'Materi Personal',
      value: materials.filter(m => m.category === 'personal').length,
      description: 'Pengembangan diri',
      color: 'bg-purple-500'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-green-500'
      case 'career': return 'bg-orange-500'
      case 'personal': return 'bg-purple-500'
      case 'social': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'academic': return 'Akademik'
      case 'career': return 'Karir'
      case 'personal': return 'Personal'
      case 'social': return 'Sosial'
      default: return category
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Memuat materi...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Materi BK</h1>
          <p className="text-muted-foreground">
            Koleksi materi bimbingan dan konseling
          </p>
        </div>
        
        {(profile?.role === 'admin' || profile?.role === 'guru_bk') && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Materi
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`h-4 w-4 rounded ${stat.color}`}></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Pencarian Materi</CardTitle>
          <CardDescription>
            Cari materi berdasarkan judul atau kategori
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari materi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Materials Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMaterials.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <div className="text-muted-foreground">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Tidak ada materi yang ditemukan' 
                  : 'Belum ada materi tersedia'}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">
                      {material.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {material.description}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${getCategoryColor(material.category)} text-white`}
                  >
                    {getCategoryLabel(material.category)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {material.target_class && material.target_class.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Target Kelas:</p>
                      <div className="flex flex-wrap gap-1">
                        {material.target_class.map((cls, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cls}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Badge variant={material.is_published ? 'default' : 'secondary'}>
                        {material.is_published ? 'Dipublikasi' : 'Draft'}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {(profile?.role === 'admin' || profile?.role === 'guru_bk') && (
                        <>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default function Materials() {
  return (
    <DashboardLayout>
      <MaterialsContent />
    </DashboardLayout>
  )
}