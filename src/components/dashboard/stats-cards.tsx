import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MessageCircle, Calendar, TrendingUp, UserCheck, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Total Siswa",
    value: "1,247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    color: "bg-gradient-primary",
  },
  {
    title: "Konseling Aktif",
    value: "89",
    change: "+8%",
    changeType: "positive" as const,
    icon: MessageCircle,
    color: "bg-gradient-warm",
  },
  {
    title: "Jadwal Hari Ini",
    value: "24",
    change: "+3",
    changeType: "positive" as const,
    icon: Calendar,
    color: "bg-education-blue",
  },
  {
    title: "Kehadiran Siswa",
    value: "94.5%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: UserCheck,
    color: "bg-success",
  },
  {
    title: "Pelaporan Masalah",
    value: "7",
    change: "-3",
    changeType: "negative" as const,
    icon: AlertTriangle,
    color: "bg-warning",
  },
  {
    title: "Target Pencapaian",
    value: "87%",
    change: "+5%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "bg-primary",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="group hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.color} text-white shadow-soft group-hover:shadow-glow transition-all duration-300`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge
                variant={stat.changeType === "positive" ? "default" : "destructive"}
                className="text-xs"
              >
                {stat.change}
              </Badge>
              <p className="text-xs text-muted-foreground">dari bulan lalu</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}