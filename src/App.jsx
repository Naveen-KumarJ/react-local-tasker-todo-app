import React from 'react'
import Main from './sections/ToDoContainer/Main'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <main className='container mx-auto max-w-7xl min-h-screen flex flex-col p-2'>
      <Header />
      <Main />
      <Footer />
    </main>
  )
}

export default App