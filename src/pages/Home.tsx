import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Heart,
  Briefcase,
  FileText,
  Calendar,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import heroImage from '@/assets/hero-counseling.jpg'

export default function Home() {
  const { user } = useAuth()

  const services = [
    {
      icon: MessageCircle,
      title: "Konseling Individual",
      description: "Bimbingan personal untuk mengatasi masalah pribadi dan akademik",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Konseling Kelompok",
      description: "Sesi bimbingan dalam kelompok kecil untuk topik tertentu",
      color: "bg-green-500"
    },
    {
      icon: BookOpen,
      title: "Bimbingan Belajar",
      description: "Bantuan dalam meningkatkan metode dan motivasi belajar",
      color: "bg-purple-500"
    },
    {
      icon: Heart,
      title: "Minat & Bakat",
      description: "Eksplorasi dan pengembangan minat serta bakat siswa",
      color: "bg-pink-500"
    },
    {
      icon: Briefcase,
      title: "Bimbingan Karir",
      description: "Panduan dalam memilih jurusan dan perencanaan karir",
      color: "bg-orange-500"
    },
    {
      icon: FileText,
      title: "Materi BK",
      description: "Akses ke berbagai materi dan modul bimbingan konseling",
      color: "bg-teal-500"
    }
  ]

  const news = [
    {
      title: "Workshop Perencanaan Karir untuk Kelas XII",
      date: "15 Januari 2024",
      description: "Workshop khusus untuk siswa kelas XII dalam mempersiapkan masa depan"
    },
    {
      title: "Program Peer Counseling Dimulai",
      date: "10 Januari 2024", 
      description: "Program bimbingan sebaya untuk membantu sesama siswa"
    },
    {
      title: "Konseling Online Tersedia",
      date: "5 Januari 2024",
      description: "Layanan konseling kini dapat diakses secara online melalui platform ini"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">BK SMAN 1 Lumbang</h1>
                <p className="text-sm text-muted-foreground">Bimbingan Konseling</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <Button asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/auth">Masuk</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/auth">Daftar</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                🎓 Bimbingan Konseling Terpercaya
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Bimbingan Konseling
                <span className="text-transparent bg-clip-text bg-gradient-primary block">
                  SMAN 1 Lumbang
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Kami menyediakan layanan bimbingan dan konseling yang komprehensif untuk membantu 
                siswa mencapai potensi maksimal dalam akademik, personal, dan perencanaan karir.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/auth">
                    Mulai Konseling
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src={heroImage} 
                  alt="Bimbingan Konseling"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-primary rounded-2xl opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-accent rounded-2xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Layanan Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Berbagai layanan bimbingan dan konseling yang dirancang khusus untuk kebutuhan siswa
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Berita & Pengumuman
            </h2>
            <p className="text-lg text-muted-foreground">
              Informasi terkini seputar program bimbingan konseling
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Hubungi Kami
            </h2>
            <p className="text-lg text-muted-foreground">
              Tim BK kami siap membantu Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-4 text-primary" />
                <CardTitle>Telepon</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">(0354) 123456</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <Mail className="h-8 w-8 mx-auto mb-4 text-primary" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">bk@sman1lumbang.sch.id</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-4 text-primary" />
                <CardTitle>Alamat</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">Jl. Raya Lumbang, Pasuruan</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">BK SMAN 1 Lumbang</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 BK SMAN 1 Lumbang. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}