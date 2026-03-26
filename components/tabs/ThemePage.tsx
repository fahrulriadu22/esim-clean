"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Check,
  Palette,
  Sun,
  Moon,
  Monitor,
} from "lucide-react"

interface ThemePageProps {
  onBack: () => void
}

interface Theme {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  preview: string
}

export function ThemePage({ onBack }: ThemePageProps) {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const themes: Theme[] = [
    {
      id: "system",
      name: "System",
      description: "Follow system preference",
      icon: <Monitor className="w-5 h-5" />,
      preview: "bg-gradient-to-br from-slate-100 to-slate-300"
    },
    {
      id: "light",
      name: "Light",
      description: "Light mode with bright colors",
      icon: <Sun className="w-5 h-5" />,
      preview: "bg-gradient-to-br from-white to-gray-100"
    },
    {
      id: "dark",
      name: "Dark",
      description: "Pure black background",
      icon: <Moon className="w-5 h-5" />,
      preview: "bg-gradient-to-br from-black to-zinc-900"
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Theme</h1>
            <p className="text-sm text-muted-foreground">Choose your appearance</p>
          </div>
        </div>
      </div>

      {/* Current Theme */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              {themes.find(t => t.id === theme)?.icon || <Monitor className="w-4 h-4" />}
            </div>
            <div>
              <p className="font-semibold text-foreground">Current Theme</p>
              <p className="text-sm text-muted-foreground">
                {themes.find(t => t.id === theme)?.name || "System"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Options */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Available Themes
        </h2>
        <div className="space-y-4">
          {themes.map((themeOption, index) => (
            <Card
              key={themeOption.id}
              className={`cursor-pointer transition-all animate-in fade-in slide-in-from-bottom-2 ${
                theme === themeOption.id 
                  ? "ring-2 ring-primary bg-primary/5" 
                  : "hover:shadow-md"
              }`}
              onClick={() => setTheme(themeOption.id)}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      {themeOption.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{themeOption.name}</p>
                      <p className="text-sm text-muted-foreground">{themeOption.description}</p>
                    </div>
                  </div>
                  {theme === themeOption.id && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                
                {/* Theme Preview */}
                <div className="flex items-center space-x-2">
                  <div className={`w-full h-16 ${themeOption.preview} rounded-lg border-2 border-border relative overflow-hidden`}>
                    {/* Mock UI Elements */}
                    <div className="absolute top-2 left-2 w-8 h-2 bg-primary/60 rounded"></div>
                    <div className="absolute top-2 right-2 w-12 h-2 bg-muted-foreground/40 rounded"></div>
                    <div className="absolute bottom-2 left-2 right-2 h-8 bg-card/80 rounded flex items-center justify-center">
                      <div className="w-16 h-1 bg-primary/60 rounded"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Auto Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                Automatically switch to dark mode at sunset
              </p>
            </div>
            <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-primary rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground text-center">
            Themes are applied automatically when selected
          </p>
        </CardContent>
      </Card>
    </div>
  )
}