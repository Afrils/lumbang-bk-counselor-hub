import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar, FileText, UserPlus, AlertTriangle, ExternalLink } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "konseling",
    title: "Konseling Individu Selesai",
    description: "Sesi konseling dengan Andi Pratama (XII IPA 1) telah selesai",
    user: "Andi Pratama",
    time: "5 menit yang lalu",
    icon: MessageCircle,
    status: "completed",
    avatar: "/placeholder-avatar.jpg"
  },
  {
    id: 2,
    type: "jadwal",
    title: "Jadwal Konseling Baru",
    description: "Konseling kelompok dijadwalkan untuk kelas XI IPS 2",
    user: "Sistem",
    time: "15 menit yang lalu",
    icon: Calendar,
    status: "scheduled",
    avatar: null
  },
  {
    id: 3,
    type: "laporan",
    title: "Laporan Masalah Baru",
    description: "Siswa melaporkan masalah bullying di kelas X MIPA 3",
    user: "Siti Nurhaliza",
    time: "1 jam yang lalu",
    icon: AlertTriangle,
    status: "urgent",
    avatar: "/placeholder-avatar.jpg"
  },
  {
    id: 4,
    type: "materi",
    title: "Materi BK Diperbarui",
    description: "Materi 'Manajemen Stress' telah diperbarui dengan konten terbaru",
    user: "Admin",
    time: "2 jam yang lalu",
    icon: FileText,
    status: "updated",
    avatar: null
  },
  {
    id: 5,
    type: "siswa",
    title: "Siswa Baru Terdaftar",
    description: "3 siswa baru telah terdaftar dan memerlukan orientasi BK",
    user: "Sistem",
    time: "3 jam yang lalu",
    icon: UserPlus,
    status: "info",
    avatar: null
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-success text-success-foreground"
    case "scheduled":
      return "bg-primary text-primary-foreground"
    case "urgent":
      return "bg-destructive text-destructive-foreground"
    case "updated":
      return "bg-warning text-warning-foreground"
    case "info":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function RecentActivities() {
  return (
    <Card className="hover:shadow-medium transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Aktivitas Terbaru</CardTitle>
            <CardDescription>
              Pantau aktivitas terbaru dalam sistem BK
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Lihat Semua
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0">
              {activity.avatar ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.avatar} alt={activity.user} />
                  <AvatarFallback>
                    {activity.user.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <activity.icon className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-foreground">
                  {activity.title}
                </h4>
                <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}