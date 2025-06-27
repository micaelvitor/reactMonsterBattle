import type { BattleResult as BattleResultType } from "@/models/Monster"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Trophy, Crown, Skull, Sword, Heart } from "lucide-react"
import { MonsterCard } from "@/components/MonsterCard"
import { useTranslation } from "react-i18next"

interface BattleResultProps {
  result: BattleResultType
}

export function BattleResult({ result }: BattleResultProps) {
  const { t } = useTranslation()
  return (
    <div className="space-y-6">
      {/* Final result*/}
      <Card className="bg-gradient-to-r from-#3b3301-600/20 to-orange-600/20 backdrop-blur-sm border-yellow-400/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white flex items-center justify-center gap-3">
            <Crown className="w-8 h-8 text-yellow-400" />
            {t("battleResult.winner", { name: result.winner.name })}
            <Crown className="w-8 h-8 text-yellow-400" />
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            {t("battleResult.epicBattle", { rounds: result.totalRounds, roundText: result.totalRounds === 1 ? t("battleResult.round") : t("battleResult.rounds") })}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Monster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">{t("battleResult.winnerTitle")}</h3>
          </div>
          <MonsterCard monster={result.winner} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Skull className="w-5 h-5 text-red-400" />
            <h3 className="text-xl font-bold text-white">{t("battleResult.loser")}</h3>
          </div>
          <MonsterCard monster={result.loser} />
        </div>
      </div>

      {/* Battle Log */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sword className="w-5 h-5" />
            {t("battleResult.battleLog")}
          </CardTitle>
          <CardDescription className="text-gray-300">{t("battleResult.followRounds")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 w-full">
            <div className="space-y-3">
              {result.rounds.map((round, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      {t("battleResult.round")} {round.round}
                    </Badge>
                    <div className="text-sm text-gray-400">{t("battleResult.damage")}: {round.damage}</div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3 space-y-2">
                    <p className="text-white text-sm">{round.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <Heart className="w-3 h-3 text-red-400" />
                        <span className="text-gray-300">{round.attacker.name}:</span>
                        <span className="text-white font-bold">{round.attackerHpAfter} {t("monsterCard.hp")}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Heart className="w-3 h-3 text-red-400" />
                        <span className="text-gray-300">{round.defender.name}:</span>
                        <span className={`font-bold ${round.defenderHpAfter <= 0 ? "text-red-400" : "text-white"}`}>
                          {round.defenderHpAfter} {t("monsterCard.hp")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {index < result.rounds.length - 1 && <Separator className="bg-white/10" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}