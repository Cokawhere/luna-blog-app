import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CreatePostedit from './pages/CreatePostedit.jsx';



function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreatePostedit />} />
        <Route path="/edit/:id" element={<CreatePostedit />} />

      </Routes>
      <Footer/>
    </>
  )
}

export default App
