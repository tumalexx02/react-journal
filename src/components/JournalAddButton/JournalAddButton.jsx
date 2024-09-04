import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton({ onClick }) {
  return (
    <CardButton className="journal-add" onClick={onClick}>
      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 1.96265V13.6293" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.16669 7.79599H12.8334" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;
