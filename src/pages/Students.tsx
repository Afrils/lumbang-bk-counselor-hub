import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Download, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

function StudentsContent() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { user, profile } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setStudents(data || [])
    } catch (error) {
      console.error('Error fetching students:', error)
      toast({
        title: 'Error',
        description: 'Gagal mengambil data siswa',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = students.filter(student => 
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nis.includes(searchTerm) ||
    student.class_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    {
      title: 'Total Siswa',
      value: students.length,
      description: 'Siswa terdaftar',
      color: 'bg-blue-500'
    },
    {
      title: 'Kelas X',
      value: students.filter(s => s.class_name.startsWith('X')).length,
      description: 'Siswa kelas 10',
      color: 'bg-green-500'
    },
    {
      title: 'Kelas XI',
      value: students.filter(s => s.class_name.startsWith('XI')).length,
      description: 'Siswa kelas 11',
      color: 'bg-orange-500'
    },
    {
      title: 'Kelas XII',
      value: students.filter(s => s.class_name.startsWith('XII')).length,
      description: 'Siswa kelas 12',
      color: 'bg-purple-500'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Memuat data siswa...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Siswa</h1>
          <p className="text-muted-foreground">
            Kelola data siswa dan informasi akademik
          </p>
        </div>
        
        {(profile?.role === 'admin' || profile?.role === 'guru_bk') && (
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Siswa
            </Button>
          </div>
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
          <CardTitle>Pencarian Siswa</CardTitle>
          <CardDescription>
            Cari siswa berdasarkan nama, NIS, atau kelas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama, NIS, atau kelas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Siswa</CardTitle>
          <CardDescription>
            {filteredStudents.length} dari {students.length} siswa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NIS</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Jenis Kelamin</TableHead>
                  <TableHead>Wali</TableHead>
                  <TableHead>Telepon</TableHead>
                  {(profile?.role === 'admin' || profile?.role === 'guru_bk') && (
                    <TableHead>Aksi</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-muted-foreground">
                        {searchTerm ? 'Tidak ada siswa yang ditemukan' : 'Belum ada data siswa'}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-mono">{student.nis}</TableCell>
                      <TableCell className="font-medium">{student.full_name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.class_name}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.gender === 'L' ? 'default' : 'secondary'}>
                          {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.parent_name || '-'}</TableCell>
                      <TableCell>{student.parent_phone || '-'}</TableCell>
                      {(profile?.role === 'admin' || profile?.role === 'guru_bk') && (
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Students() {
  return (
    <DashboardLayout>
      <StudentsContent />
    </DashboardLayout>
  )
}