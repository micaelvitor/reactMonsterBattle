import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { Layout } from "./components/Layout"
import { MonstersPage } from "./pages/MonstersPage"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<>'Salve'</>} />
          <Route path="/monsters" element={<MonstersPage />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  )
}

export default App