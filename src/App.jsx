import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DragDropContainer from './components/DragDropContainer'
import { useMediaQuery } from '@chakra-ui/react'
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
function App() {
  const [count, setCount] = useState(0)
  const [isMobile] = useMediaQuery('(max-width: 48em)');

  return (
    <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <DragDropContainer />
      </DndProvider>
    </>
  )
}

export default App
