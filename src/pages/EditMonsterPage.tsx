import { useParams, useNavigate } from "react-router-dom"
import { useMonsterStore } from "@/store/useMonsterStore"
import { MonsterForm } from "@/features/monster/MonsterForm"
import { NotFound } from "@/pages/NotFound"

export function EditMonsterPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { monsters } = useMonsterStore()

  const monsterToEdit = monsters.find((m) => m.id === id)

  if (!monsterToEdit) {
    return <NotFound />
  }

  return (
    <MonsterForm
      monsterToEdit={monsterToEdit}
      onSuccess={() => navigate("/monsters")}
    />
  )
}