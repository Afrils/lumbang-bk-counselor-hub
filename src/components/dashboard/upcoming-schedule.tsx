import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, User, ExternalLink } from "lucide-react"

const schedules = [
  {
    id: 1,
    title: "Konseling Individu",
    student: "Andi Pratama",
    class: "XII IPA 1",
    time: "09:00",
    duration: "30 menit",
    type: "individual",
    status: "upcoming",
    avatar: "/placeholder-avatar.jpg"
  },
  {
    id: 2,
    title: "Konseling Kelompok",
    student: "Kelas XI IPS 2",
    class: "XI IPS 2",
    time: "10:30",
    duration: "45 menit",
    type: "group",
    status: "upcoming",
    avatar: null
  },
  {
    id: 3,
    title: "Bimbingan Karir",
    student: "Siti Nurhaliza",
    class: "XII IPS 1",
    time: "13:00",
    duration: "30 menit",
    type: "career",
    status: "upcoming",
    avatar: "/placeholder-avatar.jpg"
  },
  {
    id: 4,
    title: "Sesi Evaluasi",
    student: "Budi Santoso",
    class: "XI MIPA 3",
    time: "14:00",
    duration: "30 menit",
    type: "evaluation",
    status: "scheduled",
    avatar: "/placeholder-avatar.jpg"
  },
  {
    id: 5,
    title: "Konseling Masalah",
    student: "Rita Sari",
    class: "X IPA 2",
    time: "15:30",
    duration: "45 menit",
    type: "problem",
    status: "urgent",
    avatar: "/placeholder-avatar.jpg"
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "individual":
      return User
    case "group":
      return Users
    case "career":
      return Calendar
    default:
      return Clock
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "individual":
      return "bg-primary text-primary-foreground"
    case "group":
      return "bg-secondary text-secondary-foreground"
    case "career":
      return "bg-education-blue text-white"
    case "evaluation":
      return "bg-success text-success-foreground"
    case "problem":
      return "bg-destructive text-destructive-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-warning/10 text-warning border-warning/20"
    case "scheduled":
      return "bg-primary/10 text-primary border-primary/20"
    case "urgent":
      return "bg-destructive/10 text-destructive border-destructive/20"
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20"
  }
}

export function UpcomingSchedule() {
  return (
    <Card className="hover:shadow-medium transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Jadwal Hari Ini</CardTitle>
            <CardDescription>
              Jadwal konseling dan bimbingan untuk hari ini
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Lihat Kalender
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedules.map((schedule, index) => {
          const TypeIcon = getTypeIcon(schedule.type)
          
          return (
            <div
              key={schedule.id}
              className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                {schedule.avatar ? (
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={schedule.avatar} alt={schedule.student} />
                    <AvatarFallback>
                      {schedule.student.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-foreground">
                    {schedule.title}
                  </h4>
                  <Badge className={`text-xs ${getTypeColor(schedule.type)}`}>
                    <TypeIcon className="h-3 w-3 mr-1" />
                    {schedule.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {schedule.student} • {schedule.class}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {schedule.time}
                  </span>
                  <span>{schedule.duration}</span>
                </div>
              </div>
              
              <Badge className={`text-xs ${getStatusColor(schedule.status)}`}>
                {schedule.status}
              </Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}