
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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

interface StudentFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: any) => void
  student?: any
}

export function StudentFormDialog({ open, onOpenChange, onSave, student }: StudentFormDialogProps) {
  const [formData, setFormData] = useState({
    nis: student?.nis || "",
    full_name: student?.full_name || "",
    class_name: student?.class_name || "",
    gender: student?.gender || "",
    birth_date: student?.birth_date || "",
    address: student?.address || "",
    parent_name: student?.parent_name || "",
    parent_phone: student?.parent_phone || ""
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nis || !formData.full_name || !formData.class_name) {
      toast({
        title: "Error",
        description: "Mohon lengkapi data wajib (NIS, Nama, Kelas)",
        variant: "destructive"
      })
      return
    }

    onSave(formData)
    toast({
      title: "Berhasil",
      description: student ? "Data siswa berhasil diperbarui" : "Siswa baru berhasil ditambahkan"
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{student ? "Edit Siswa" : "Tambah Siswa Baru"}</DialogTitle>
          <DialogDescription>
            {student ? "Perbarui informasi siswa" : "Tambahkan siswa baru ke dalam sistem"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="nis">NIS *</Label>
            <Input
              id="nis"
              value={formData.nis}
              onChange={(e) => setFormData({...formData, nis: e.target.value})}
              placeholder="Nomor Induk Siswa"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="full_name">Nama Lengkap *</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              placeholder="Nama lengkap siswa"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="class_name">Kelas *</Label>
            <Select value={formData.class_name} onValueChange={(value) => setFormData({...formData, class_name: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="X IPA 1">X IPA 1</SelectItem>
                <SelectItem value="X IPA 2">X IPA 2</SelectItem>
                <SelectItem value="X IPS 1">X IPS 1</SelectItem>
                <SelectItem value="X IPS 2">X IPS 2</SelectItem>
                <SelectItem value="XI IPA 1">XI IPA 1</SelectItem>
                <SelectItem value="XI IPA 2">XI IPA 2</SelectItem>
                <SelectItem value="XI IPS 1">XI IPS 1</SelectItem>
                <SelectItem value="XI IPS 2">XI IPS 2</SelectItem>
                <SelectItem value="XII IPA 1">XII IPA 1</SelectItem>
                <SelectItem value="XII IPA 2">XII IPA 2</SelectItem>
                <SelectItem value="XII IPS 1">XII IPS 1</SelectItem>
                <SelectItem value="XII IPS 2">XII IPS 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="gender">Jenis Kelamin</Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Laki-laki</SelectItem>
                <SelectItem value="P">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="birth_date">Tanggal Lahir</Label>
            <Input
              id="birth_date"
              type="date"
              value={formData.birth_date}
              onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="address">Alamat</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Alamat lengkap siswa"
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="parent_name">Nama Wali/Orang Tua</Label>
            <Input
              id="parent_name"
              value={formData.parent_name}
              onChange={(e) => setFormData({...formData, parent_name: e.target.value})}
              placeholder="Nama wali atau orang tua"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="parent_phone">No. Telepon Wali</Label>
            <Input
              id="parent_phone"
              value={formData.parent_phone}
              onChange={(e) => setFormData({...formData, parent_phone: e.target.value})}
              placeholder="Nomor telepon wali"
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">
              {student ? "Perbarui" : "Tambah"} Siswa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
