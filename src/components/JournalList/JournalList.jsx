import './JournalList.css';

import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ items, setItem, selectedItem }) {
  const { userId } = useContext(UserContext);

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  }
  const filteredItems = useMemo(() => {
    return items
      .filter(el => el['userId'] === userId)
      .sort(sortItems)
  }, [items, userId]) 

  if (filteredItems.length === 0) {
    return <p style={{ textAlign: 'center' }}>У данного пользователя пока что нет записей :(<br/>Добавьте первую!</p>;
  }

  return (
    <div className='journal-list'>
      {filteredItems
        .map(el => (
          <CardButton key={el.id} onClick={() => setItem(el)} className={selectedItem.id === el.id && 'selected-user-card-button'}>
            <JournalItem
              title={el.title}
              text={el.text}
              date={el.date}
            />
          </CardButton>
        ))}
    </div>
  );
}

export default JournalList;
