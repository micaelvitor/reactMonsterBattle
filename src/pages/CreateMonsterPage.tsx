import { useNavigate } from "react-router-dom"
import { MonsterForm } from "../features/monster/MonsterForm"

export function CreateMonsterPage() {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate("/monsters")
  }

  return <MonsterForm onSuccess={handleSuccess} />
}