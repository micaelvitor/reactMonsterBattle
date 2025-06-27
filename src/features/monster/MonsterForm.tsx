import { useState, type FormEvent } from "react"
import { useMonsterStore } from "@/store/useMonsterStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" 
import { Plus, Sparkles, RotateCcw } from "lucide-react"
import { toast } from "sonner"

interface MonsterFormProps {
  onSuccess?: () => void
}

export function MonsterForm({ onSuccess }: MonsterFormProps) {
  const { addMonster } = useMonsterStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    attack: 10,
    defense: 10,
    speed: 10,
    hp: 100,
    imageUrl: "",
  })

  const isValidImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!url.trim()) {
        resolve(true)
        return
      }
      try {
        new URL(url)
      } catch (_) {
        resolve(false)
        return
      }

      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.name.trim()) {
      toast.error("Nome do monstro é obrigatório!")
      setIsLoading(false)
      return
    }

    if (formData.attack < 1 || formData.defense < 1 || formData.speed < 1 || formData.hp < 1) {
      toast.error("Todos os atributos devem ser maiores que 0!")
      setIsLoading(false)
      return
    }

    if (!(await isValidImageUrl(formData.imageUrl))) {
      toast.error("A URL da imagem é inválida ou não pode ser carregada.")
      setIsLoading(false)
      return
    }

    addMonster(formData)
    toast.success(`${formData.name} foi criado com sucesso!`)

    setFormData({
      name: "",
      attack: 10,
      defense: 10,
      speed: 10,
      hp: 100,
      imageUrl: "",
    })

    setIsLoading(false)
    onSuccess?.()
  }

  const generateRandomMonster = () => {
    const names = [
      "Dragão Flamejante",
      "Lobo Sombrio",
      "Golem de Pedra",
      "Fênix Dourada",
      "Kraken Abissal",
      "Tigre Glacial",
      "Serpente Venenosa",
      "Águia Tempestuosa",
      "Urso Berserker",
      "Escorpião Elétrico",
      "Pantera Noturna",
      "Rinoceronte Blindado",
    ]

    const randomName = names[Math.floor(Math.random() * names.length)]
    const baseStats = 8 + Math.floor(Math.random() * 15)

    setFormData({
      name: randomName,
      attack: baseStats + Math.floor(Math.random() * 10),
      defense: baseStats + Math.floor(Math.random() * 10),
      speed: baseStats + Math.floor(Math.random() * 10),
      hp: 80 + Math.floor(Math.random() * 40),
      imageUrl: `https://placehold.co/200x128?text=${encodeURIComponent(randomName).replace(/%20/g, "+")}`,
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-black/20 backdrop-blur-sm border-white/20 animate-in fade-in-0 slide-in-from-bottom-5 duration-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Plus className="w-6 h-6" />
          Criar Novo Monstro
        </CardTitle>
        <CardDescription className="text-gray-300">
          Defina os atributos do seu monstro e prepare-o para a batalha!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Monster naming and image block */}
            <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-5 duration-500" style={{ animationDelay: `0ms`, animationFillMode: "backwards" }}>
              <div>
                <Label htmlFor="name" className="text-white">Nome do Monstro</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Dragão Flamejante"
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="imageUrl" className="text-white">URL da Imagem (opcional)</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Attribute block */}
            <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-5 duration-500" style={{ animationDelay: `150ms`, animationFillMode: "backwards" }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="attack" className="text-white">Ataque</Label>
                  <Input
                    id="attack"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.attack}
                    onChange={(e) => setFormData((prev) => ({ ...prev, attack: Number.parseInt(e.target.value) || 1 }))}
                    className="w-full bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="defense" className="text-white">Defesa</Label>
                  <Input
                    id="defense"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.defense}
                    onChange={(e) => setFormData((prev) => ({ ...prev, defense: Number.parseInt(e.target.value) || 1 }))}
                    className="w-full bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="speed" className="text-white">Velocidade</Label>
                  <Input
                    id="speed"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.speed}
                    onChange={(e) => setFormData((prev) => ({ ...prev, speed: Number.parseInt(e.target.value) || 1 }))}
                    className="w-full bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="hp" className="text-white">HP</Label>
                  <Input
                    id="hp"
                    type="number"
                    min="1"
                    max="500"
                    value={formData.hp}
                    onChange={(e) => setFormData((prev) => ({ ...prev, hp: Number.parseInt(e.target.value) || 1 }))}
                    className="w-full bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in-0 slide-in-from-bottom-5 duration-500" style={{ animationDelay: `300ms`, animationFillMode: "backwards" }}>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={generateRandomMonster}
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Aleatório
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              {isLoading ? "Criando..." : "Criar Monstro"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}