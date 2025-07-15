
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

interface AttendanceFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: any) => void
}

export function AttendanceFormDialog({ open, onOpenChange, onSave }: AttendanceFormDialogProps) {
  const [formData, setFormData] = useState({
    student: "",
    nis: "",
    class: "",
    date: new Date().toISOString().split('T')[0],
    status: "present",
    time_in: "",
    time_out: "",
    notes: ""
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.student || !formData.nis || !formData.class) {
      toast({
        title: "Error",
        description: "Mohon lengkapi data siswa yang diperlukan",
        variant: "destructive"
      })
      return
    }

    onSave(formData)
    toast({
      title: "Berhasil",
      description: "Data absensi berhasil disimpan"
    })
    onOpenChange(false)
    
    // Reset form
    setFormData({
      student: "",
      nis: "",
      class: "",
      date: new Date().toISOString().split('T')[0],
      status: "present",
      time_in: "",
      time_out: "",
      notes: ""
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Input Absensi Manual</DialogTitle>
          <DialogDescription>
            Tambahkan data absensi siswa secara manual
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="student">Nama Siswa</Label>
            <Input
              id="student"
              value={formData.student}
              onChange={(e) => setFormData({...formData, student: e.target.value})}
              placeholder="Masukkan nama siswa"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="nis">NIS</Label>
            <Input
              id="nis"
              value={formData.nis}
              onChange={(e) => setFormData({...formData, nis: e.target.value})}
              placeholder="Masukkan NIS"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="class">Kelas</Label>
            <Select value={formData.class} onValueChange={(value) => setFormData({...formData, class: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="X IPA 1">X IPA 1</SelectItem>
                <SelectItem value="X IPS 2">X IPS 2</SelectItem>
                <SelectItem value="XI IPA 1">XI IPA 1</SelectItem>
                <SelectItem value="XI IPS 1">XI IPS 1</SelectItem>
                <SelectItem value="XII IPA 3">XII IPA 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="date">Tanggal</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="status">Status Kehadiran</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">Hadir</SelectItem>
                <SelectItem value="late">Terlambat</SelectItem>
                <SelectItem value="absent">Tidak Hadir</SelectItem>
                <SelectItem value="excused">Izin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="time_in">Jam Masuk</Label>
              <Input
                id="time_in"
                type="time"
                value={formData.time_in}
                onChange={(e) => setFormData({...formData, time_in: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time_out">Jam Keluar</Label>
              <Input
                id="time_out"
                type="time"
                value={formData.time_out}
                onChange={(e) => setFormData({...formData, time_out: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="notes">Keterangan</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Tambahkan keterangan jika diperlukan"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">
              Simpan Absensi
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
