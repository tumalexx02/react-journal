import './JournalItem.css'

function JournalItem({ title, text, date }) {
  const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);

  return (
    <>
      <h3 className="journal-item__header">{title}</h3>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{formatedDate}</div>
        <div className="journal-item__text">{text}</div>
      </h2>
    </>
  )
}

export default JournalItem