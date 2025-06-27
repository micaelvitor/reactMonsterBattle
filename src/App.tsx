import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { MonsterList } from "@/features/monster/MonsterList"
import { MonsterForm } from "@/features/monster/MonsterForm"
import { NotFound } from "@/pages/NotFound"
import { BattlePage } from "@/pages/Battle"

export function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<>'Salve'</>} />
          <Route path="/monsters" element={<MonsterList />} />
          <Route path="/create" element={<MonsterForm />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}