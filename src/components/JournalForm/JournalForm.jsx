import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

import styles from './JournalForm.module.css';

import Button from '../Button/Button';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit, data, onRemove }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch(true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  }

  useEffect(() => {
    if (data.id) {
      dispatchForm({type: 'SET_VALUE', payload: { 
        ...data
      }});
    } else {
      dispatchForm({type: 'CLEAR'});
    }
  }, [data])

  useEffect(() => {
    dispatchForm({type: 'SET_VALUE', payload: { 
      ...data
    }});
  }, [data])

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    }
  }, [isValid])

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(formState.values);
      dispatchForm({type: 'CLEAR'});
    }
  }, [formState.values, isFormReadyToSubmit, onSubmit])

  useEffect(() => {
    dispatchForm({type: 'SET_VALUE', payload: { userId: userId }});
  }, [userId])

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({type: 'SUBMIT'});
  }

  const onChange = (e) => {
    dispatchForm({type: 'SET_VALUE', payload: { [e.target.name]: e.target.value }});
  }

  const deleteItem = (e) => {
    e.preventDefault();
    onRemove(data);
    dispatchForm({type: 'CLEAR'});
  }

  return (
        <form className={styles['journal-form']} onSubmit={addJournalItem} >
          <div className={styles['form-row']}>
            <Input appearence={'title'} isValid={isValid.title} type="text" name='title' value={values.title} onChange={onChange} ref={titleRef} placeholder='Название воспоминания' />

            <Button disabled={data.id ? false : true} onClick={deleteItem}><img src="./archive.svg" alt="" /></Button>
          </div>
          <div className={styles['form-row']}>
            <label htmlFor="date" className={styles['form-label']}>
              <img src="/calendar.svg" alt="Иконка календаря" />
              <span>Дата</span>
            </label>
            <Input isValid={isValid.date} type="date" name='date' onChange={onChange} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} ref={dateRef} id='date' />
          </div>
          <div className={styles['form-row']}>
            <label htmlFor="tag" className={styles['form-label']}>
              <img src="/folder.svg" alt="Иконка папки" />
              <span>Метки</span>
            </label>
            <Input type='text' id='tag' name='tag' onChange={onChange} value={values.tag} />
          </div>
          <textarea name='text' id="" cols="30" rows="10" value={values.text} onChange={onChange} ref={textRef} className={cn(styles['input'], {
            [styles['invalid']]: !isValid.text
          })} ></textarea>
          <Button>Сохранить</Button>
        </form>
      )
}

export default JournalForm;
