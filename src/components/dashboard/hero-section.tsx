import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageCircle, FileText, TrendingUp } from "lucide-react"
import heroImage from "@/assets/hero-counseling.jpg"

export function HeroSection() {
  return (
    <Card className="relative overflow-hidden bg-gradient-hero text-white border-0 shadow-large">
      <CardContent className="p-0">
        <div className="relative grid lg:grid-cols-2 min-h-[400px]">
          {/* Content */}
          <div className="flex flex-col justify-center p-8 lg:p-12 space-y-6">
            <div className="space-y-4 animate-fade-in">
              <Badge className="bg-white/20 text-white border-white/20 w-fit">
                🎓 SMA Negeri 1 Lumbang
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                Dengan BK, Semua Jadi Lebih Baik
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Bimbingan Konseling SMA Negeri 1 Lumbang, tempat kamu bisa menceritakan masalahmu 
                dengan aman, tenang dan terjaga
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-medium"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Cerita Sekarang
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Jadwal Konseling
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <div className="text-center">
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-white/80">Siswa Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-white/80">Konseling Bulan Ini</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">97%</div>
                <div className="text-sm text-white/80">Tingkat Kepuasan</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative overflow-hidden lg:block hidden">
            <img
              src={heroImage}
              alt="Bimbingan Konseling"
              className="absolute inset-0 w-full h-full object-cover animate-scale-in"
              style={{ animationDelay: "600ms" }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/20" />
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="p-6 lg:p-8 bg-white/10 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
              <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Materi BK</h3>
                <p className="text-sm text-white/80">Akses materi pembelajaran</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
              <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Progress Tracking</h3>
                <p className="text-sm text-white/80">Pantau perkembangan siswa</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
              <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Jadwal Fleksibel</h3>
                <p className="text-sm text-white/80">Atur jadwal sesuai kebutuhan</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}