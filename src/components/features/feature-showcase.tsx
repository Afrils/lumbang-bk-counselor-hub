
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, BookOpen, ClipboardList, Target, Users, Calendar, BarChart3, FileText } from "lucide-react"
import { useNavigate } from 'react-router-dom'

const features = [
  {
    title: "Konseling Individual",
    description: "Sesi konseling pribadi untuk mengatasi masalah personal siswa",
    icon: MessageCircle,
    route: "/counseling/individual",
    category: "Konseling",
    status: "active"
  },
  {
    title: "Konseling Kelompok",
    description: "Sesi konseling berkelompok untuk membangun keterampilan sosial",
    icon: Users,
    route: "/counseling/group",
    category: "Konseling",
    status: "active"
  },
  {
    title: "Bimbingan Akademik",
    description: "Bantuan untuk meningkatkan prestasi dan metode belajar",
    icon: BookOpen,
    route: "/counseling/academic",
    category: "Akademik",
    status: "active"
  },
  {
    title: "Minat & Bakat",
    description: "Assessment dan pengembangan potensi siswa",
    icon: Target,
    route: "/counseling/talent",
    category: "Pengembangan",
    status: "active"
  },
  {
    title: "Bimbingan Karir",
    description: "Panduan pemilihan karir dan perencanaan masa depan",
    icon: Target,
    route: "/counseling/career",
    category: "Karir",
    status: "active"
  },
  {
    title: "Materi BK",
    description: "Koleksi materi pembelajaran bimbingan konseling",
    icon: FileText,
    route: "/materials",
    category: "Materi",
    status: "active"
  },
  {
    title: "Angket & Survey",
    description: "Tools untuk mengumpulkan data dan feedback siswa",
    icon: ClipboardList,
    route: "/surveys",
    category: "Assessment",
    status: "active"
  },
  {
    title: "RPL BK",
    description: "Rencana Pelaksanaan Layanan Bimbingan Konseling",
    icon: Calendar,
    route: "/lesson-plans",
    category: "Perencanaan",
    status: "active"
  }
]

const categoryColors = {
  "Konseling": "bg-blue-100 text-blue-800",
  "Akademik": "bg-green-100 text-green-800",
  "Pengembangan": "bg-purple-100 text-purple-800",
  "Karir": "bg-orange-100 text-orange-800",
  "Materi": "bg-yellow-100 text-yellow-800",
  "Assessment": "bg-red-100 text-red-800",
  "Perencanaan": "bg-indigo-100 text-indigo-800"
}

export function FeatureShowcase() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Fitur Lengkap Sistem BK</h2>
        <p className="text-muted-foreground">
          Eksplorasi semua fitur yang tersedia untuk mendukung layanan bimbingan dan konseling
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge 
                    className={categoryColors[feature.category as keyof typeof categoryColors]}
                  >
                    {feature.category}
                  </Badge>
                </div>
                <CardDescription className="mt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant={feature.status === 'active' ? 'default' : 'secondary'}>
                    {feature.status === 'active' ? 'Tersedia' : 'Segera Hadir'}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(feature.route)}
                    disabled={feature.status !== 'active'}
                  >
                    Buka Fitur
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
