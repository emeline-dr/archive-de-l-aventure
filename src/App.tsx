import './App.css'
import logo from "./assets/images/logo.png"

function App() {

  return (
    <>
      <div className='bg-accent w-full h-screen'>
        <h1 className='font-uncial-antiqua'>Test Uncial</h1>
        <p className='font-crimson-text'>Test Crimson</p>
        <img src={logo} alt="" className='size-50' />
      </div>
    </>
  )
}

export default App
