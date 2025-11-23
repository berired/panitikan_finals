import { useState } from 'react'
import SearchBar from './components/SearchBar'
import BookCarousel from './components/BookCarousel'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Tahanan ng Mga Kuwento</h1>
        <p className="app-subtitle">Mga Klasikong Kwentong Pambata</p>
      </header>
      
      <SearchBar onSearch={handleSearch} />
      
      <main className="app-main">
        <BookCarousel searchQuery={searchQuery} />
      </main>

      <Footer />
    </div>
  )
}

export default App
