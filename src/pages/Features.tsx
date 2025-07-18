
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { FeatureShowcase } from "@/components/features/feature-showcase"
import { HelpDialog } from "@/components/ui/help-dialog"
import { Button } from "@/components/ui/button"
import { HelpCircle, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Features() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fitur & Panduan</h1>
            <p className="text-muted-foreground">
              Jelajahi semua fitur sistem dan pelajari cara menggunakannya
            </p>
          </div>
          <div className="flex gap-2">
            <HelpDialog title="Panduan Lengkap">
              <Button variant="outline">
                <HelpCircle className="h-4 w-4 mr-2" />
                Panduan Lengkap
              </Button>
            </HelpDialog>
          </div>
        </div>

        {/* Quick Tips */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Lightbulb className="h-5 w-5" />
              Tips Cepat
            </CardTitle>
            <CardDescription className="text-blue-700">
              Beberapa tips untuk memaksimalkan penggunaan sistem BK
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-sm text-blue-800">
                  <strong>Dashboard:</strong> Pantau aktivitas harian dan statistik penting
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-sm text-blue-800">
                  <strong>Filter & Pencarian:</strong> Gunakan untuk menemukan data dengan cepat
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-sm text-blue-800">
                  <strong>Export Data:</strong> Simpan laporan dalam format Excel atau PDF
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-sm text-blue-800">
                  <strong>Notifikasi:</strong> Aktifkan untuk mendapat update penting
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Showcase */}
        <FeatureShowcase />
      </div>
    </DashboardLayout>
  )
}
