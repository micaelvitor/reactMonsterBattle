import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { NotFound } from "@/pages/NotFound"
import { HomePage } from "@/pages/Home"
import { MonstersPage } from "@/pages/MonstersPage"
import { BattlePage } from "@/pages/BattlePage"
import { CreateMonsterPage } from "./pages/CreateMonsterPage"
import { EditMonsterPage } from "./pages/EditMonsterPage"

export function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/monsters" element={<MonstersPage />} />
          <Route path="/edit/:id" element={<EditMonsterPage />} />
          <Route path="/create" element={<CreateMonsterPage />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}