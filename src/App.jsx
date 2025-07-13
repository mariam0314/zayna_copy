import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Header from "./Header";
import Home from "./Hotel/Home";
import Footer from "./Footer";
function App() {
  const [count, setCount] = useState(0)

  return (
<>

    <Header />
    <Home />
    <Footer />
    </>
  )
}

export default App
