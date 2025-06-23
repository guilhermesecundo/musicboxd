import { HomeHeader } from "@/components/home-header"
import { SettingsContent } from "@/components/settings-content"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account preferences and customize your MusicBox experience
            </p>
          </div>
          <SettingsContent />
        </div>
      </main>
    </div>
  )
}
