import { useMonsterStore } from "@/store/useMonsterStore"
import { MonsterCard } from "@/components/MonsterCard"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Plus } from "lucide-react"

export function MonsterList() {
  const { monsters } = useMonsterStore()
  if (monsters.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
            <Users className="w-6 h-6" />
            Nenhum Monstro Criado
          </CardTitle>
          <CardDescription className="text-gray-300">
            Crie seu primeiro monstro para começar as batalhas épicas!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link to="/create" className="group inline-block" aria-label="Criar novo monstro">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 cursor-pointer">
              <Plus className="w-16 h-16 text-gray-400 transition-colors group-hover:text-white" />
            </div>
          </Link>
          <p className="text-gray-400 mb-4">Clique no botão para criar seu primeiro guerreiro!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Seus Monstros</h2>
        <p className="text-gray-300">
          {monsters.length} {monsters.length === 1 ? "monstro criado" : "monstros criados"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monsters.map((monster, index) => (
          <div
            key={monster.id}
            className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
          >
            <MonsterCard monster={monster} showActions />
          </div>
        ))}
      </div>
    </div>
  )
}