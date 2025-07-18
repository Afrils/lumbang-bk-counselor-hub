
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  Users,
  MessageCircle,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  BookOpen,
  UserCheck,
  ClipboardList,
  Heart,
  Target,
  Briefcase,
  AlertTriangle,
  X,
  HelpCircle,
  Lightbulb
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  {
    title: "Dashboard",
    items: [
      { name: "Beranda", href: "/dashboard", icon: Home, current: false },
      { name: "Analytics", href: "/analytics", icon: BarChart3, current: false },
    ]
  },
  {
    title: "Manajemen",
    items: [
      { name: "Data Siswa", href: "/students", icon: Users, current: false },
      { name: "Absensi", href: "/attendance", icon: UserCheck, current: false },
      { name: "Jadwal", href: "/schedule", icon: Calendar, current: false },
    ]
  },
  {
    title: "Konseling",
    items: [
      { name: "Konseling Individu", href: "/counseling/individual", icon: MessageCircle, current: false },
      { name: "Konseling Kelompok", href: "/counseling/group", icon: Users, current: false },
      { name: "Bimbingan Belajar", href: "/counseling/academic", icon: BookOpen, current: false },
      { name: "Minat & Bakat", href: "/counseling/talent", icon: Heart, current: false },
      { name: "Bimbingan Karir", href: "/counseling/career", icon: Briefcase, current: false },
      { name: "Pelaporan Masalah", href: "/counseling/reports", icon: AlertTriangle, current: false },
    ]
  },
  {
    title: "Dokumen",
    items: [
      { name: "Materi BK", href: "/materials", icon: FileText, current: false },
      { name: "Angket", href: "/surveys", icon: ClipboardList, current: false },
      { name: "RPL BK", href: "/lesson-plans", icon: Target, current: false },
    ]
  },
  {
    title: "Sistem",
    items: [
      { name: "Fitur & Panduan", href: "/features", icon: HelpCircle, current: false },
      { name: "Pengaturan", href: "/settings", icon: Settings, current: false },
    ]
  }
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-card border-r transition-transform duration-300 ease-in-out lg:static lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Close Button (Mobile) */}
        <div className="flex h-16 items-center justify-between px-4 border-b lg:hidden">
          <span className="text-lg font-semibold">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-full pb-4">
          <div className="space-y-6 py-6">
            {navigation.map((group) => (
              <div key={group.title} className="px-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.title}
                </h3>
                <nav className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-gradient-primary text-primary-foreground shadow-soft"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "mr-3 h-4 w-4 flex-shrink-0 transition-colors",
                            isActive
                              ? "text-primary-foreground"
                              : "text-muted-foreground group-hover:text-accent-foreground"
                          )}
                        />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
