import React, { useState } from 'react';
import axios from 'axios';

export const Main = () => {
  const [todo, setTodo] = useState("");

  const onChange = (e) => {
    setTodo(e.target.value);
  }

  const onSubmit = async (e) => {
        e.preventDefault() // 브라우저의 도움없이 직접 이벤트를 처리하겠다
    await axios.post('/create', { //REST API에 작성했던 '/create' url 작성
      content: todo // content라는 이름에 todo(input의 value)를 담아서 보냄
    }).then((res) => { // 전송성공하면
      alert('전송성공'); // 알럿을 띄운다.
      window.location.reload(); // 화면을 새로고침 한다.
    }).catch((err) => { // 에러발생 시,
      console.log(err); // 에러 콘솔을 띄움
    })
  }

  return (
    <form className="write" onSubmit={onSubmit}>
      <input className="todo_input" type="text" value={todo} name="todo" onChange={onChange} required />
      <button type="submit" className="submit_btn">ENTER</button>
    </form>
  )
}