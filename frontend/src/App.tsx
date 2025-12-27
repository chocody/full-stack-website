import bg from './assets/bg/forest.jpg'
import { Quests } from './components/quests'
import { RollButton } from './components/rollButton'

function App() {
  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className='flex flex-row grid-rows-3 h-screen'>
        <div className='basis-1/4 border-red-500 border-2 flex items-center justify-center'>
          <h1>FREE SPACE</h1>
        </div>
        <div className='basis-2/4 border-red-500 border-2 flex items-center justify-center'>
          <h1>MAP</h1>
        </div>
        <div className='basis-1/4 border-red-500 border-2'>
          <div className='flex flex-col items-center justify-center gap-20 !m-10'>
            <Quests />
            <RollButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
