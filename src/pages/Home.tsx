import { Link } from "react-router-dom"
import { useMonsterStore } from "../store/useMonsterStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Sword, Users, Plus, Trophy, Zap, Shield, Heart, Star } from "lucide-react"

export function HomePage() {
  const { monsters } = useMonsterStore()

  const stats = {
    totalMonsters: monsters.length,
    totalBattles: 0,
    averageAttack:
      monsters.length > 0 ? Math.round(monsters.reduce((sum, m) => sum + m.attack, 0) / monsters.length) : 0,
    averageDefense:
      monsters.length > 0 ? Math.round(monsters.reduce((sum, m) => sum + m.defense, 0) / monsters.length) : 0,
  }

  const features = [
    {
      icon: Plus,
      title: "Criar Monstros",
      description: "Crie monstros únicos com atributos personalizados",
      href: "/create",
      color: "from-green-600 to-emerald-600",
    },
    {
      icon: Users,
      title: "Gerenciar Monstros",
      description: "Visualize e gerencie sua coleção de monstros",
      href: "/monsters",
      color: "from-blue-600 to-cyan-600",
      badge: monsters.length,
    },
    {
      icon: Trophy,
      title: "Arena de Batalha",
      description: "Deixe seus monstros lutarem pela supremacia",
      href: "/battle",
      color: "from-red-600 to-orange-600",
      disabled: monsters.length < 2,
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Sword className="w-16 h-16 text-yellow-400" />
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">Monster Battle Arena</h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Crie monstros épicos e deixe-os batalhar pela supremacia!
            </p>
          </div>
          <Sword className="w-16 h-16 text-yellow-400" />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-4 py-2 text-lg">
            <Star className="w-4 h-4 mr-2" />
            Desafio Técnico Revi
          </Badge>
          <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-4 py-2 text-lg">
            React + TypeScript
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />,
            value: stats.totalMonsters,
            label: "Monstros",
          },
          {
            icon: <Zap className="w-8 h-8 text-red-400 mx-auto mb-2" />,
            value: stats.averageAttack,
            label: "ATK Médio",
          },
          {
            icon: <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />,
            value: stats.averageDefense,
            label: "DEF Médio",
          },
          {
            icon: <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />,
            value: stats.totalBattles,
            label: "Batalhas",
          },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
          >
          <Card className="bg-black/20 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
            {stat.icon}
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-300">{stat.label}</div>
            </CardContent>
          </Card>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
            >
              <Card
                className={`bg-black/20 backdrop-blur-sm border-white/20 transition-all duration-300 hover:scale-105 ${
                  feature.disabled ? "opacity-50" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {feature.title}
                    </CardTitle>
                    {feature.badge !== undefined && (
                      <Badge className="bg-yellow-400 text-black">{feature.badge}</Badge>
                    )}
                  </div>
                  <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90`}
                    disabled={feature.disabled}
                  >
                    {feature.disabled ? (
                      <Link to={'/create'}>
                        Precisa de 2+ monstros
                      </Link>
                    ) : (
                      <Link to={feature.href}>Acessar</Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>


      {/* Getting Started */}
      {monsters.length === 0 && (
        <Card className="bg-gradient-to-r from-#3a1b3a-600/20 to-blue-600/20 backdrop-blur-sm border-purple-400/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">🚀 Comece sua jornada!</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Crie seu primeiro monstro para começar as batalhas épicas
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link to="/create">
                <Plus className="w-5 h-5 mr-2" />
                Criar Primeiro Monstro
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Algorithm Info */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400" />
            Como Funciona o Sistema de Batalha
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-semibold mb-2">📊 Ordem de Ataque</h4>
              <p className="text-sm">
                Monstro com maior velocidade ataca primeiro. Em caso de empate, maior ataque decide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">⚔️ Cálculo de Dano</h4>
              <p className="text-sm">Dano = Ataque - Defesa (mínimo 1 de dano sempre)</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">🏆 Condição de Vitória</h4>
              <p className="text-sm">Primeiro monstro a reduzir o HP do oponente a zero vence</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">🔄 Rounds Alternados</h4>
              <p className="text-sm">Monstros atacam alternadamente até haver um vencedor</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}