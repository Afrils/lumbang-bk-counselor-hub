import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, XCircle, Clock, Search, Filter, Download } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const mockAttendanceData = [
  {
    id: 1,
    student: "Ahmad Rizki",
    nis: "2023001",
    class: "XI IPA 1",
    date: "2025-01-15",
    status: "present",
    time_in: "07:15",
    time_out: "15:30",
    notes: ""
  },
  {
    id: 2,
    student: "Siti Aminah",
    nis: "2023002",
    class: "X IPS 2",
    date: "2025-01-15",
    status: "late",
    time_in: "08:15",
    time_out: "15:30",
    notes: "Terlambat karena macet"
  },
  {
    id: 3,
    student: "Budi Santoso",
    nis: "2023003",
    class: "XII IPA 3",
    date: "2025-01-15",
    status: "absent",
    time_in: "-",
    time_out: "-",
    notes: "Sakit demam"
  },
  {
    id: 4,
    student: "Dewi Sari",
    nis: "2023004",
    class: "XI IPS 1",
    date: "2025-01-15",
    status: "present",
    time_in: "07:10",
    time_out: "15:30",
    notes: ""
  },
  {
    id: 5,
    student: "Andi Pratama",
    nis: "2023005",
    class: "X IPA 1",
    date: "2025-01-15",
    status: "excused",
    time_in: "-",
    time_out: "-",
    notes: "Izin keperluan keluarga"
  }
]

const statusColors = {
  present: "bg-green-100 text-green-800",
  late: "bg-yellow-100 text-yellow-800",
  absent: "bg-red-100 text-red-800",
  excused: "bg-blue-100 text-blue-800"
}

const statusIcons = {
  present: CheckCircle,
  late: Clock,
  absent: XCircle,
  excused: Calendar
}

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("2025-01-15")

  const filteredData = mockAttendanceData.filter(record => {
    const matchesSearch = record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.nis.includes(searchTerm)
    const matchesClass = classFilter === "all" || record.class === classFilter
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    const matchesDate = record.date === dateFilter
    return matchesSearch && matchesClass && matchesStatus && matchesDate
  })

  const attendanceStats = {
    total: mockAttendanceData.length,
    present: mockAttendanceData.filter(r => r.status === 'present').length,
    late: mockAttendanceData.filter(r => r.status === 'late').length,
    absent: mockAttendanceData.filter(r => r.status === 'absent').length,
    excused: mockAttendanceData.filter(r => r.status === 'excused').length
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Absensi Siswa</h1>
            <p className="text-muted-foreground">
              Kelola dan pantau kehadiran siswa harian
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button>
              Input Absensi Manual
            </Button>
          </div>
        </div>

        {/* Attendance Stats */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceStats.total}</div>
              <p className="text-xs text-muted-foreground">hari ini</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hadir</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((attendanceStats.present / attendanceStats.total) * 100)}% dari total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</div>
              <p className="text-xs text-muted-foreground">siswa</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tidak Hadir</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
              <p className="text-xs text-muted-foreground">perlu tindak lanjut</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Izin</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{attendanceStats.excused}</div>
              <p className="text-xs text-muted-foreground">dengan keterangan</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari nama siswa atau NIS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-40"
            />
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Semua Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                <SelectItem value="X IPA 1">X IPA 1</SelectItem>
                <SelectItem value="X IPS 2">X IPS 2</SelectItem>
                <SelectItem value="XI IPA 1">XI IPA 1</SelectItem>
                <SelectItem value="XI IPS 1">XI IPS 1</SelectItem>
                <SelectItem value="XII IPA 3">XII IPA 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="present">Hadir</SelectItem>
                <SelectItem value="late">Terlambat</SelectItem>
                <SelectItem value="absent">Tidak Hadir</SelectItem>
                <SelectItem value="excused">Izin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Data Absensi</CardTitle>
            <CardDescription>
              Daftar kehadiran siswa untuk tanggal {new Date(dateFilter).toLocaleDateString('id-ID')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NIS</TableHead>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Jam Masuk</TableHead>
                  <TableHead>Jam Keluar</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => {
                  const StatusIcon = statusIcons[record.status as keyof typeof statusIcons]
                  return (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.nis}</TableCell>
                      <TableCell>{record.student}</TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[record.status as keyof typeof statusColors]}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {record.status === 'present' ? 'Hadir' : 
                           record.status === 'late' ? 'Terlambat' : 
                           record.status === 'absent' ? 'Tidak Hadir' : 'Izin'}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.time_in}</TableCell>
                      <TableCell>{record.time_out}</TableCell>
                      <TableCell className="max-w-xs">
                        <span className="text-sm text-muted-foreground">
                          {record.notes || '-'}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            
            {filteredData.length === 0 && (
              <div className="py-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Tidak ada data absensi yang sesuai dengan filter
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}