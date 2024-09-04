import { useLocalStorage } from './hooks/useLocalStorage.hook'

import './App.css'

import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalList from './components/JournalList/JournalList'
import Body from './layouts/Body/Body'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import JournalForm from './components/JournalForm/JournalForm'
import { UserContextProvider } from './context/user.context'
import { useState } from 'react'
import Logo from './components/Logo/Logo'
import SelectUser from './components/SelectUser/SelectUser'

function mapItems(items) {
  if (!items) {
    return [];
  }

  return items.map(i => ({
    ...i,
    date: new Date(i.date)
  }))
}

function App() {
  const [items, setItems] = useLocalStorage('data');
  const [selectedItem, setSelectedItem] = useState({});

  const addItem = item => {
    if (!item.id) {
      setItems([...mapItems(items), {
        ...item,
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
        date: new Date(item.date),
      }]);
    } else {
      setItems([...mapItems(items).map(i => {
        if (i.id === item.id) {
          return item;
        } else {
          return i;
        }
      })]);
    }
  }

  const removeItem = item => {
    setItems([...mapItems(items).filter(i => i.id !== item.id)]);
    setSelectedItem({});
  }

  const clearSelectedItem = () => {
    setSelectedItem({});
  }

  return (
    <UserContextProvider>
      <div className='app'>
        <LeftPanel>
          <Logo image={'./logo.svg'} />
          <SelectUser onSelect={clearSelectedItem} />
          <JournalAddButton onClick={clearSelectedItem} />
          <JournalList items={mapItems(items)} setItem={setSelectedItem} selectedItem={selectedItem} />
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem} data={selectedItem} onRemove={removeItem} />
        </Body>
      </div>
    </UserContextProvider>
  )
}

export default App
