import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useMonsterStore } from "@/store/useMonsterStore"
import { BattleArena } from "@/features/battle/BattleArena"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Plus } from "lucide-react"

export function BattlePage() {
  const navigate = useNavigate()
  const { monsters } = useMonsterStore()

  useEffect(() => {
    if (monsters.length < 2){}
  }, [monsters.length])

  if (monsters.length < 2) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 animate-in fade-in-0 slide-in-from-bottom-5 duration-500">
            <CardHeader className="text-center animate-in fade-in-0 slide-in-from-bottom-5 duration-500" style={{ animationDelay: "100ms", animationFillMode: "backwards" }}>
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              Monstros Insuficientes
            </CardTitle>
            <CardDescription className="text-gray-300">
              Você precisa de pelo menos 2 monstros para iniciar uma batalha
            </CardDescription>
            </CardHeader>

            <CardContent className="text-center space-y-4">
            <div
              className="text-gray-400 animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
              style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
            >
              <p>
                Monstros atuais: <span className="text-white font-bold">{monsters.length}</span>
              </p>
              <p>
                Monstros necessários: <span className="text-white font-bold">2</span>
              </p>
            </div>

            <div
              className="flex gap-4 justify-center animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
              style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
            >
              <Button onClick={() => navigate("/create")} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                  Criar Monstro
                </Button>
                { monsters.length > 0 && 
                  <Button onClick={() => navigate("/monsters")} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Ver Monstros
                  </Button>
                }
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  return <BattleArena />
}