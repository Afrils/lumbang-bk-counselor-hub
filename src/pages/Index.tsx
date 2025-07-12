import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { HeroSection } from "@/components/dashboard/hero-section"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { UpcomingSchedule } from "@/components/dashboard/upcoming-schedule"

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 lg:ml-0">
          <div className="p-6 space-y-8 max-w-7xl mx-auto">
            {/* Hero Section */}
            <HeroSection />
            
            {/* Stats Cards */}
            <StatsCards />
            
            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              <RecentActivities />
              <UpcomingSchedule />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
};

export default Index;
