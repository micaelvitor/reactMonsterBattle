import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<>'Salve'</>} />
        </Routes>
      <Toaster />
    </Router>
  )
}

export default App