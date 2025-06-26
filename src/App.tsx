import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { Layout } from "./components/Layout"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<>'Salve'</>} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  )
}

export default App