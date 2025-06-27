import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { Layout } from "@/components/Layout"
import { MonstersPage } from "@/pages/MonstersPage"
import { CreateMonsterPage } from "@/pages/CreateMonsterPage"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<>'Salve'</>} />
          <Route path="/monsters" element={<MonstersPage />} />
          <Route path="/create" element={<CreateMonsterPage />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  )
}

export default App