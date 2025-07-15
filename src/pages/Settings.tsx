
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
  Trash2,
  Eye,
  EyeOff,
  Camera
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

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

  const [profileData, setProfileData] = useState({
    fullName: "Afrils",
    email: "andikabgs@gmail.com",
    phone: "",
    bio: "Administrator Sistem Bimbingan Konseling SMA Negeri 1 Lumbang"
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false)
  const [activeSessions] = useState([
    {
      id: 1,
      device: "Chrome - Windows",
      ip: "192.168.1.100",
      lastActive: "Aktif sekarang",
      isCurrent: true
    },
    {
      id: 2,
      device: "Mobile App - Android",
      ip: "192.168.1.105",
      lastActive: "2 jam yang lalu",
      isCurrent: false
    }
  ])

  const { toast } = useToast()

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Berhasil",
      description: "Profil berhasil diperbarui"
    })
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field password",
        variant: "destructive"
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Password baru dan konfirmasi password tidak cocok",
        variant: "destructive"
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password baru minimal 6 karakter",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Berhasil",
      description: "Password berhasil diubah"
    })
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
    setIsChangePasswordDialogOpen(false)
  }

  const handleLogoutSession = (sessionId: number) => {
    toast({
      title: "Berhasil",
      description: "Sesi berhasil dilogout"
    })
  }

  const handleBackupData = () => {
    toast({
      title: "Backup Dimulai",
      description: "Proses backup data sedang berlangsung..."
    })
  }

  const handleRestoreData = () => {
    toast({
      title: "Restore Dimulai",
      description: "Proses restore data sedang berlangsung..."
    })
  }

  const handleExportReport = () => {
    const reportData = {
      exported_at: new Date().toISOString(),
      user_count: 1247,
      session_count: 856,
      storage_used: "1.2GB"
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `system-report-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    toast({
      title: "Berhasil",
      description: "Laporan berhasil diexport"
    })
  }

  const handleResetSystem = () => {
    toast({
      title: "Sistem Direset",
      description: "Pengaturan sistem telah dikembalikan ke default"
    })
  }

  const handleDeleteAllData = () => {
    toast({
      title: "Data Dihapus",
      description: "Semua data telah dihapus secara permanen",
      variant: "destructive"
    })
  }

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
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button 
                      type="button"
                      size="sm" 
                      className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="font-medium">{profileData.fullName}</p>
                    <p className="text-sm text-muted-foreground">{profileData.email}</p>
                    <Button type="button" variant="outline" size="sm" className="mt-2">
                      Ubah Foto
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nama Lengkap</Label>
                    <Input 
                      id="fullName" 
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input 
                      id="phone" 
                      placeholder="+62 812-3456-7890"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
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
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  />
                </div>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Simpan Perubahan
                </Button>
              </form>
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
              <Button onClick={() => toast({ title: "Berhasil", description: "Pengaturan notifikasi disimpan" })}>
                <Save className="mr-2 h-4 w-4" />
                Simpan Pengaturan
              </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Button onClick={() => toast({ title: "Berhasil", description: "Pengaturan sistem disimpan" })}>
                <Save className="mr-2 h-4 w-4" />
                Simpan Pengaturan
              </Button>
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
                <Button variant="outline" className="w-full" onClick={handleBackupData}>
                  <Download className="mr-2 h-4 w-4" />
                  Backup Data
                </Button>
                <Button variant="outline" className="w-full" onClick={handleRestoreData}>
                  <Upload className="mr-2 h-4 w-4" />
                  Restore Data
                </Button>
                <Button variant="outline" className="w-full" onClick={handleExportReport}>
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
              <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Ubah Password</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Ubah Password</DialogTitle>
                    <DialogDescription>
                      Masukkan password lama dan password baru Anda
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Password Saat Ini</Label>
                      <div className="relative">
                        <Input 
                          id="current-password" 
                          type={showPassword.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword({...showPassword, current: !showPassword.current})}
                        >
                          {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Password Baru</Label>
                      <div className="relative">
                        <Input 
                          id="new-password" 
                          type={showPassword.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                        >
                          {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                      <div className="relative">
                        <Input 
                          id="confirm-password" 
                          type={showPassword.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                        >
                          {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsChangePasswordDialogOpen(false)}>
                        Batal
                      </Button>
                      <Button type="submit">Ubah Password</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Sesi Aktif</h4>
                <div className="space-y-2">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-lg gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{session.device}</p>
                        <p className="text-xs text-muted-foreground">IP: {session.ip} • {session.lastActive}</p>
                      </div>
                      {session.isCurrent ? (
                        <Badge variant="secondary">Saat ini</Badge>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLogoutSession(session.id)}
                        >
                          Logout
                        </Button>
                      )}
                    </div>
                  ))}
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-red-200 rounded-lg gap-4">
                  <div className="flex-1">
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
                      <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="w-full sm:w-auto">Batal</AlertDialogCancel>
                        <AlertDialogAction 
                          className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                          onClick={handleResetSystem}
                        >
                          Ya, Reset Sistem
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-red-200 rounded-lg gap-4">
                  <div className="flex-1">
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
                      <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="w-full sm:w-auto">Batal</AlertDialogCancel>
                        <AlertDialogAction 
                          className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                          onClick={handleDeleteAllData}
                        >
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
