import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface AddStudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AddStudentDialog({ open, onOpenChange, onSuccess }: AddStudentDialogProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    nis: '',
    class_name: '',
    gender: '',
    birth_date: '',
    address: '',
    parent_name: '',
    parent_phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        user_metadata: {
          full_name: formData.full_name,
          role: 'siswa'
        },
        email_confirm: true
      })

      if (authError) throw authError

      // Create student record
      const { error: studentError } = await supabase
        .from('students')
        .insert({
          user_id: authData.user.id,
          nis: formData.nis,
          full_name: formData.full_name,
          class_name: formData.class_name,
          gender: formData.gender,
          birth_date: formData.birth_date || null,
          address: formData.address,
          parent_name: formData.parent_name,
          parent_phone: formData.parent_phone,
        })

      if (studentError) throw studentError

      toast({
        title: "Berhasil",
        description: "Siswa dan akun berhasil dibuat",
      })

      setFormData({
        email: '',
        password: '',
        full_name: '',
        nis: '',
        class_name: '',
        gender: '',
        birth_date: '',
        address: '',
        parent_name: '',
        parent_phone: '',
      })
      
      onSuccess()
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal membuat siswa dan akun",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Siswa & Akun</DialogTitle>
          <DialogDescription>
            Buat akun siswa baru beserta data personalnya
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">Nama Lengkap *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nis">NIS *</Label>
              <Input
                id="nis"
                value={formData.nis}
                onChange={(e) => setFormData(prev => ({ ...prev, nis: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class_name">Kelas *</Label>
              <Input
                id="class_name"
                value={formData.class_name}
                onChange={(e) => setFormData(prev => ({ ...prev, class_name: e.target.value }))}
                placeholder="contoh: XII IPA 1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Jenis Kelamin</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Laki-laki</SelectItem>
                  <SelectItem value="P">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth_date">Tanggal Lahir</Label>
              <Input
                id="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={(e) => setFormData(prev => ({ ...prev, birth_date: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parent_name">Nama Orang Tua</Label>
              <Input
                id="parent_name"
                value={formData.parent_name}
                onChange={(e) => setFormData(prev => ({ ...prev, parent_name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parent_phone">No. HP Orang Tua</Label>
              <Input
                id="parent_phone"
                value={formData.parent_phone}
                onChange={(e) => setFormData(prev => ({ ...prev, parent_phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Membuat..." : "Buat Siswa & Akun"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}