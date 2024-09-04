import SelectUser from '../SelectUser/SelectUser';
import Logo from '../Logo/Logo';


function Header({ onSelect }) {

  return (
    <>
      <Logo image={'./logo.svg'} />
      <SelectUser onSelect={onSelect} />
    </>
  );
}

export default Header;
