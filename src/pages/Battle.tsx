import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sword } from "lucide-react"

export function BattlePage() {
  return (
    <Card className="max-w-2xl mx-auto bg-black/20 backdrop-blur-sm border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
          <Sword className="w-6 h-6" />
          Arena de Batalha
        </CardTitle>
        <CardDescription className="text-gray-300">
          Em breve: Selecione dois monstros e veja-os lutar!
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center text-gray-400">
        <p>Funcionalidade de batalha em desenvolvimento.</p>
      </CardContent>
    </Card>
  )
}