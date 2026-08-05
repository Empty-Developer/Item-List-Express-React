import './App.css'
import { Input } from './components/ui/input/Input'
import { Button } from './components/ui/button/Button'
import Box from './components/shared/box/Box'
import ListItems from './components/shared/listItems/ListItems'

function App() {

  return (
    <div className='container'>
      {/* left box all items */}
      <Box>
        {/* panel */}
        <div className='panel-component'>
          <Input />
          <Button title='SELECT'/>
        </div>
        <div>
          {/* list items */}
          <ListItems />
        </div>
      </Box>
      {/* right box select items */}
      <Box>
        {/* panel */}
        <div className='panel-component'>
          <Input />
          <Button title='DELETE'/>
        </div>
        <div>
          {/* list items */}
          <ListItems />
        </div>
      </Box>
    </div>
  )
}

export default App
