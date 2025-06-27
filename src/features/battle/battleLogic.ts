import type { Monster, BattleRound, BattleResult } from "@/models/Monster"
import { useMonsterStore } from "@/store/useMonsterStore"

export function battleLogic(monster1: Monster, monster2: Monster): BattleResult {
  const fighter1: Monster = { ...monster1 }
  const fighter2: Monster = { ...monster2 }

  const rounds: BattleRound[] = []
  let roundNumber = 1

  let attacker: Monster
  let defender: Monster

  if (fighter1.speed > fighter2.speed) {
    attacker = fighter1
    defender = fighter2
  } else if (fighter2.speed > fighter1.speed) {
    attacker = fighter2
    defender = fighter1
  } else {
    if (fighter1.attack >= fighter2.attack) {
      attacker = fighter1
      defender = fighter2
    } else {
      attacker = fighter2
      defender = fighter1
    }
  }

  while (fighter1.hp > 0 && fighter2.hp > 0) {
    const damage = Math.max(1, attacker.attack - defender.defense)
    defender.hp = Math.max(0, defender.hp - damage)
    const round: BattleRound = {
      round: roundNumber,
      attacker: { ...attacker },
      defender: { ...defender },
      damage,
      attackerHpAfter: attacker.hp,
      defenderHpAfter: defender.hp,
      description: `${attacker.name} ataca ${defender.name} causando ${damage} de dano!`,
    }

    rounds.push(round)

    if (defender.hp <= 0) {
      break
    }

    const temp = attacker
    attacker = defender
    defender = temp

    roundNumber++

    if (roundNumber > 100) {
      console.warn("Batalha interrompida após 100 rounds para evitar loop infinito")
      break
    }
  }

  // Determinar vencedor e perdedor
  const winner = fighter1.hp > 0 ? fighter1 : fighter2
  const loser = fighter1.hp <= 0 ? fighter1 : fighter2

  // Incrementa o contador de batalhas no final de cada batalha
  useMonsterStore.getState().incrementTotalBattles()

  return {
    winner,
    loser,
    rounds,
    totalRounds: rounds.length,
  }
}