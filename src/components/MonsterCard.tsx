import type { Monster } from "@/models/Monster"
import { useMonsterStore } from "@/store/useMonsterStore"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trash2, RotateCcw, Heart, Sword, Shield, Zap, Pencil } from "lucide-react"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

interface MonsterCardProps {
  monster: Monster
  showActions?: boolean
}

export function MonsterCard({ monster, showActions = false }: MonsterCardProps) {
  const { removeMonster, resetMonsterHp } = useMonsterStore()
  const { t } = useTranslation()

  const handleDelete = () => {
    removeMonster(monster.id)
    toast.success(t("monsterCard.removed", { name: monster.name }))
  }

  const handleResetHp = () => {
    resetMonsterHp(monster.id)
    toast.success(t("monsterCard.hpRestored", { name: monster.name }))
  }

  const hpPercentage = (monster.hp / monster.maxHp) * 100
  const isInjured = hpPercentage < 100
  const isDead = monster.hp <= 0

  const imageUrl =
    monster.imageUrl ||
    `https://placehold.co/200x128?text=${encodeURIComponent(monster.name).replace(/%20/g, "+")}`

  return (
    <Card
      className={`bg-black/20 backdrop-blur-sm border-white/20 transition-all duration-300 hover:scale-105 ${isDead ? "opacity-50 grayscale" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">{monster.name}</CardTitle>
          {isDead && (
            <Badge variant="destructive" className="bg-red-600">
              {t("monsterCard.defeated")}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Imagem do Monstro */}
        <div className="relative w-full h-32 bg-white/10 rounded-lg overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={monster.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://placehold.co/200x128??text=${encodeURIComponent(
                monster.name,
              ).replace(/%20/g, "+")}`
            }}
          />
        </div>

        {/* HP Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-400" />
              {t("monsterCard.hp")}
            </span>
            <span className={`font-bold ${isInjured ? "text-red-400" : "text-green-400"}`}>
              {monster.hp}/{monster.maxHp}
            </span>
          </div>
          <Progress value={hpPercentage} className="h-2 bg-white/20" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
              <Sword className="w-3 h-3" />
            </div>
            <div className="text-white font-bold">{monster.attack}</div>
            <div className="text-gray-400 text-xs">{t("monsterCard.atk")}</div>
          </div>

          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
              <Shield className="w-3 h-3" />
            </div>
            <div className="text-white font-bold">{monster.defense}</div>
            <div className="text-gray-400 text-xs">{t("monsterCard.def")}</div>
          </div>

          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
              <Zap className="w-3 h-3" />
            </div>
            <div className="text-white font-bold">{monster.speed}</div>
            <div className="text-gray-400 text-xs">{t("monsterCard.spd")}</div>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 pt-2 flex-wrap">
            {isInjured && (
              <Button
                onClick={handleResetHp}
                variant="outline"
                size="sm"
                className="flex-1 bg-green-600/20 border-green-600/50 text-green-400 hover:bg-green-600/30"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                {t("monsterCard.heal")}
              </Button>
            )}
            <Button
              onClick={handleDelete}
              variant="outline"
              size="sm"
              className="flex-1 bg-red-600/20 border-red-600/50 text-red-400 hover:bg-red-600/30"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              {t("monsterCard.delete")}
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 bg-blue-600/20 border-blue-600/50 text-blue-400 hover:bg-blue-600/30"
            >
            <Link to={`/edit/${monster.id}`}>
              <Pencil className="w-3 h-3 mr-1" />
              {t("monsterCard.edit")}
            </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
