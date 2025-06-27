import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Monster } from "@/models/Monster"

interface MonsterStore {
  monsters: Monster[]
  addMonster: (monster: Omit<Monster, "id" | "maxHp">) => void
  removeMonster: (id: string) => void
  resetMonsterHp: (id: string) => void
  updateMonsterHp: (id: string, hp: number) => void
  updateMonster: (updated: Monster) => void
}

export const useMonsterStore = create<MonsterStore>()(
  persist(
    (set) => ({
      monsters: [],

      addMonster: (monsterData) => {
        const newMonster: Monster = {
          ...monsterData,
          id: crypto.randomUUID(),
          maxHp: monsterData.hp,
        }
        set((state) => ({
          monsters: [...state.monsters, newMonster],
        }))
      },

      updateMonster: (updatedMonster) => {
        set((state) => ({
          monsters: state.monsters.map((m) => (m.id === updatedMonster.id ? updatedMonster : m)),
        }))
      },

      removeMonster: (id) => {
        set((state) => ({
          monsters: state.monsters.filter((monster) => monster.id !== id),
        }))
      },

      resetMonsterHp: (id) => {
        set((state) => ({
          monsters: state.monsters.map((monster) => (monster.id === id ? { ...monster, hp: monster.maxHp } : monster)),
        }))
      },

      updateMonsterHp: (id, hp) => {
        set((state) => ({
          monsters: state.monsters.map((monster) =>
            monster.id === id ? { ...monster, hp: Math.max(0, hp) } : monster,
          ),
        }))
      },
    }),
    {
      name: "monster-storage",
    },
  ),
)