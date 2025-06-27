export interface Monster {
  id: string
  name: string
  attack: number
  defense: number
  speed: number
  hp: number
  maxHp: number
  imageUrl: string
}

export interface BattleRound {
  round: number
  attacker: Monster
  defender: Monster
  damage: number
  attackerHpAfter: number
  defenderHpAfter: number
  description: string
}

export interface BattleResult {
  winner: Monster
  loser: Monster
  rounds: BattleRound[]
  totalRounds: number
}