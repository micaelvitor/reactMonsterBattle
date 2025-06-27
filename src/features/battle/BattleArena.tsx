"use client"

import { useState } from "react"
import { useMonsterStore } from "@/store/useMonsterStore"
import { MonsterCard } from "@/components/MonsterCard"
import { BattleResult } from "@/components/BattleResult"
import { battleLogic } from "./battleLogic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Sword, RotateCcw, Trophy, Zap } from "lucide-react"
import type { BattleResult as BattleResultType } from "../../models/Monster"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

export function BattleArena() {
  const { monsters, resetMonsterHp } = useMonsterStore()
  const [selectedMonster1, setSelectedMonster1] = useState<string>("")
  const [selectedMonster2, setSelectedMonster2] = useState<string>("")
  const [battleResult, setBattleResult] = useState<BattleResultType | null>(null)
  const [isLoading, setBattleLoading] = useState(false)
  const { t, i18n } = useTranslation()

  const monster1 = monsters.find((m) => m.id === selectedMonster1)
  const monster2 = monsters.find((m) => m.id === selectedMonster2)

  const canBattle = monster1 && monster2 && monster1.id !== monster2.id

  const startBattle = async () => {
    if (!monster1 || !monster2) return

    setBattleLoading(true)
    setBattleResult(null)

    // Reset HP dos monstros antes da batalha
    resetMonsterHp(monster1.id)
    resetMonsterHp(monster2.id)

    // Simular delay para efeito dramático
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const result = battleLogic({ ...monster1, hp: monster1.maxHp }, { ...monster2, hp: monster2.maxHp }, t)
      setBattleResult(result)
      toast.success(t("battle.winner", { name: result.winner.name }))
    } catch (error) {
      toast.error(t("battle.error"))
      console.error(error)
    } finally {
      setBattleLoading(false)
    }
  }

  const resetBattle = () => {
    setBattleResult(null)
    if (monster1) resetMonsterHp(monster1.id)
    if (monster2) resetMonsterHp(monster2.id)
  }

  const availableMonsters1 = monsters.filter((m) => m.id !== selectedMonster2)
  const availableMonsters2 = monsters.filter((m) => m.id !== selectedMonster1)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          {t("battleArena.title")}
          <Trophy className="w-8 h-8 text-yellow-400" />
        </h2>
        <p className="text-gray-300">{t("battleArena.subtitle")}</p>
      </div>

      {/* Monster Selection */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sword className="w-5 h-5" />
            {t("battleArena.chooseCombatants")}
          </CardTitle>
          <CardDescription className="text-gray-300">{t("battleArena.selectTwoMonsters")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">{t("battleArena.monster1")}</label>
              <Select value={selectedMonster1} onValueChange={setSelectedMonster1}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder={t("battleArena.selectFirstMonster")} />
                </SelectTrigger>
                <SelectContent>
                  {availableMonsters1.map((monster) => (
                    <SelectItem key={monster.id} value={monster.id}>
                      {monster.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">{t("battleArena.monster2")}</label>
              <Select value={selectedMonster2} onValueChange={setSelectedMonster2}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder={t("battleArena.selectSecondMonster")} />
                </SelectTrigger>
                <SelectContent>
                  {availableMonsters2.map((monster) => (
                    <SelectItem key={monster.id} value={monster.id}>
                      {monster.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monsters Preview */}
      {(monster1 || monster2) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {monster1 ? (
              <MonsterCard monster={monster1} />
            ) : (
              <Card className="bg-black/10 backdrop-blur-sm border-white/10 border-dashed">
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-gray-400">{t("battleArena.selectFirstMonster")}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            {monster2 ? (
              <MonsterCard monster={monster2} />
            ) : (
              <Card className="bg-black/10 backdrop-blur-sm border-white/10 border-dashed">
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-gray-400">{t("battleArena.selectSecondMonster")}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {canBattle && (
        <div className="flex justify-center gap-4">
          <Button
            onClick={startBattle}
            disabled={isLoading}
            size="lg"
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold px-8"
          >
            {isLoading ? (
              <>
                <Zap className="w-5 h-5 mr-2 animate-pulse" />
                {t("battleArena.battleInProgress")}
              </>
            ) : (
              <>
                <Sword className="w-5 h-5 mr-2" />
                {t("battleArena.startBattle")}
              </>
            )}
          </Button>

          {battleResult && (
            <Button
              onClick={resetBattle}
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {t("battleArena.newBattle")}
            </Button>
          )}
        </div>
      )}

      {/* Battle Result */}
      {battleResult && <BattleResult result={battleResult} />}
    </div>
  )
}