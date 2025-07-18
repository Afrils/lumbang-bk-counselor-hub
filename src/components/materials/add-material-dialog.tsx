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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Upload } from "lucide-react"

interface AddMaterialDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AddMaterialDialog({ open, onOpenChange, onSuccess }: AddMaterialDialogProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    target_class: [] as string[],
    is_published: false,
    file_url: '',
  })

  const handleTargetClassChange = (className: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        target_class: [...prev.target_class, className]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        target_class: prev.target_class.filter(c => c !== className)
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    
    setLoading(true)

    try {
      const { error } = await supabase
        .from('materials')
        .insert({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          category: formData.category,
          target_class: formData.target_class,
          is_published: formData.is_published,
          file_url: formData.file_url || null,
          created_by: user.id,
        })

      if (error) throw error

      toast({
        title: "Berhasil",
        description: "Materi berhasil ditambahkan",
      })

      setFormData({
        title: '',
        description: '',
        content: '',
        category: '',
        target_class: [],
        is_published: false,
        file_url: '',
      })
      
      onSuccess()
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal menambahkan materi",
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
          <DialogTitle>Tambah Materi BK</DialogTitle>
          <DialogDescription>
            Buat materi bimbingan dan konseling baru
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Judul Materi *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Masukkan judul materi..."
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Jelaskan isi dan tujuan materi..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Akademik</SelectItem>
                  <SelectItem value="career">Karir</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="social">Sosial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Target Kelas</Label>
              <div className="flex gap-4">
                {['X', 'XI', 'XII'].map((className) => (
                  <div key={className} className="flex items-center space-x-2">
                    <Checkbox
                      id={`class-${className}`}
                      checked={formData.target_class.includes(`Kelas ${className}`)}
                      onCheckedChange={(checked) => 
                        handleTargetClassChange(`Kelas ${className}`, checked as boolean)
                      }
                    />
                    <Label htmlFor={`class-${className}`}>Kelas {className}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="content">Konten Materi *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Masukkan konten lengkap materi..."
                rows={6}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="file_url">URL File (Opsional)</Label>
              <Input
                id="file_url"
                value={formData.file_url}
                onChange={(e) => setFormData(prev => ({ ...prev, file_url: e.target.value }))}
                placeholder="https://drive.google.com/..."
              />
            </div>

            <div className="flex items-center space-x-2 md:col-span-2">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
              />
              <Label htmlFor="is_published">Publikasikan materi</Label>
            </div>
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
              {loading ? "Menyimpan..." : "Tambah Materi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}