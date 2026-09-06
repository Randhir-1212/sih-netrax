import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import DashboardView from './components/DashboardView'
import DriverView from './components/DriverView'

function App() {
    const [lang, setLang] = useState('en')

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardView lang={lang} setLang={setLang} />} />
                <Route path="/driver" element={<DriverView lang={lang} setLang={setLang} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
