import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Mail, 
  Save,
  Download,
  Upload,
  Trash2
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    weekly_report: true,
    emergency_alerts: true
  })

  const [systemSettings, setSystemSettings] = useState({
    auto_backup: true,
    session_timeout: "30",
    data_retention: "2",
    max_file_size: "10"
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pengaturan Sistem</h1>
          <p className="text-muted-foreground">
            Kelola pengaturan aplikasi dan preferensi sistem
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profil Pengguna
              </CardTitle>
              <CardDescription>
                Kelola informasi profil dan preferensi akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input id="fullName" defaultValue="Afrils" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="andikabgs@gmail.com" disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input id="phone" placeholder="+62 812-3456-7890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <div className="flex items-center h-10">
                    <Badge variant="secondary">Admin</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio/Deskripsi</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tulis deskripsi singkat tentang Anda..."
                  defaultValue="Administrator Sistem Bimbingan Konseling SMA Negeri 1 Lumbang"
                />
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifikasi
              </CardTitle>
              <CardDescription>
                Atur preferensi notifikasi dan pemberitahuan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notifikasi Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Terima notifikasi melalui email
                  </p>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, email: checked }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Notifikasi Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Terima notifikasi push di browser
                  </p>
                </div>
                <Switch 
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, push: checked }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-report">Laporan Mingguan</Label>
                  <p className="text-sm text-muted-foreground">
                    Terima ringkasan aktivitas mingguan
                  </p>
                </div>
                <Switch 
                  id="weekly-report"
                  checked={notifications.weekly_report}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, weekly_report: checked }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emergency-alerts">Alert Darurat</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifikasi untuk laporan darurat dan kasus penting
                  </p>
                </div>
                <Switch 
                  id="emergency-alerts"
                  checked={notifications.emergency_alerts}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, emergency_alerts: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Pengaturan Sistem
              </CardTitle>
              <CardDescription>
                Konfigurasi sistem dan preferensi aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (menit)</Label>
                  <Select 
                    value={systemSettings.session_timeout} 
                    onValueChange={(value) => 
                      setSystemSettings(prev => ({ ...prev, session_timeout: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 menit</SelectItem>
                      <SelectItem value="30">30 menit</SelectItem>
                      <SelectItem value="60">1 jam</SelectItem>
                      <SelectItem value="120">2 jam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Retensi Data (tahun)</Label>
                  <Select 
                    value={systemSettings.data_retention}
                    onValueChange={(value) => 
                      setSystemSettings(prev => ({ ...prev, data_retention: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 tahun</SelectItem>
                      <SelectItem value="2">2 tahun</SelectItem>
                      <SelectItem value="3">3 tahun</SelectItem>
                      <SelectItem value="5">5 tahun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-file-size">Maksimal Ukuran File Upload (MB)</Label>
                <Input 
                  id="max-file-size" 
                  type="number" 
                  value={systemSettings.max_file_size}
                  onChange={(e) => 
                    setSystemSettings(prev => ({ ...prev, max_file_size: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Backup Otomatis</Label>
                  <p className="text-sm text-muted-foreground">
                    Backup data sistem secara otomatis setiap hari
                  </p>
                </div>
                <Switch 
                  id="auto-backup"
                  checked={systemSettings.auto_backup}
                  onCheckedChange={(checked) => 
                    setSystemSettings(prev => ({ ...prev, auto_backup: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Manajemen Data
              </CardTitle>
              <CardDescription>
                Backup, restore, dan kelola data sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Backup Data
                </Button>
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Restore Data
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Export Laporan
                </Button>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Statistik Penyimpanan</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">1.2GB</div>
                    <div className="text-xs text-muted-foreground">Total Data</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">856</div>
                    <div className="text-xs text-muted-foreground">File Upload</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-xs text-muted-foreground">Record Siswa</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">89%</div>
                    <div className="text-xs text-muted-foreground">Penyimpanan</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Keamanan
              </CardTitle>
              <CardDescription>
                Pengaturan keamanan dan akses sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button>Ubah Password</Button>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Sesi Aktif</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Chrome - Windows</p>
                      <p className="text-xs text-muted-foreground">IP: 192.168.1.100 • Aktif sekarang</p>
                    </div>
                    <Badge variant="secondary">Saat ini</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Mobile App - Android</p>
                      <p className="text-xs text-muted-foreground">IP: 192.168.1.105 • 2 jam yang lalu</p>
                    </div>
                    <Button variant="outline" size="sm">Logout</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-5 w-5" />
                Zona Berbahaya
              </CardTitle>
              <CardDescription>
                Tindakan permanen yang tidak dapat dibatalkan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-red-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium">Reset Sistem</h4>
                    <p className="text-xs text-muted-foreground">
                      Mengembalikan sistem ke pengaturan default
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">Reset</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini akan mengembalikan semua pengaturan ke default. 
                          Data tidak akan hilang, tetapi semua konfigurasi akan direset.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                          Ya, Reset Sistem
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-red-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium">Hapus Semua Data</h4>
                    <p className="text-xs text-muted-foreground">
                      Menghapus semua data siswa, sesi, dan laporan secara permanen
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">Hapus</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>PERINGATAN: Tindakan Tidak Dapat Dibatalkan!</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini akan menghapus SEMUA data secara permanen termasuk:
                          <br />• Data siswa dan profil
                          <br />• Riwayat sesi konseling
                          <br />• Laporan dan dokumentasi
                          <br />• Pengaturan sistem
                          <br /><br />
                          Data yang sudah dihapus TIDAK DAPAT dipulihkan!
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                          Ya, Hapus Semua Data
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}