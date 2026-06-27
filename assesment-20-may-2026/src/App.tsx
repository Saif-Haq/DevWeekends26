import './App.css'
import Galaxy from './Glaxy'
import { CardMain } from './Card'

function App() {
  return (

    <div className='w-full h-screen relative bg-[#121212]'>
      <div className='absolute inset-0'>
      <Galaxy 
        mouseRepulsion
        mouseInteraction
        density={1}
        glowIntensity={0.3}
        saturation={0}
        hueShift={140}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={1}
    />
    </div>

        <CardMain/>
    </div>
  )
}

export default App
