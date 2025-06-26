import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Sword, Github } from "lucide-react"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
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
              href="https://github.com/micaelvitor/reactMonsterBattle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-16">
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