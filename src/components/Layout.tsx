import type { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { Sword, Home, Users, Plus, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMonsterStore } from "@/store/useMonsterStore"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { monsters } = useMonsterStore()

  const navigation = [
    {
      name: "Início",
      href: "/",
      icon: Home,
      current: location.pathname === "/",
    },
    {
      name: "Monstros",
      href: "/monsters",
      icon: Users,
      current: location.pathname === "/monsters",
      badge: monsters.length,
    },
    {
      name: "Criar",
      href: "/create",
      icon: Plus,
      current: location.pathname === "/create",
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-white hover:text-yellow-400 transition-colors">
              <Sword className="w-8 h-8 text-yellow-400" />
              <div>
                <h1 className="text-2xl font-bold">Monster Battle Arena</h1>
                <p className="text-sm text-gray-300">Desafio Técnico Revi</p>
              </div>
            </Link>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.name}
                  asChild
                  variant={item.current ? "default" : "ghost"}
                  className={`
                    ${item.current ? "bg-white/20 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"}`}>
                  <Link to={item.href} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.name}
                    {item.badge !== undefined && (
                      <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow animate-in fade-in-0 slide-in-from-top-5 duration-500">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-300">
            <p className="mb-2">
              Desenvolvido com ❤️ para o desafio técnico da <span className="text-yellow-400 font-bold">Revi</span>
            </p>
            <p className="text-sm">React + TypeScript + Vite + Zustand + Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}