import React, { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import axiosRequestApi from '../../utils/axiosRequest';

import styles from './Login.scss';

const Login = (props: any) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (cookie.get('shoppingmall-cookie')) {
      props.history.push('/')
    }
  }, [])

  const submit = async () => {
    try {
      if (!username || !password) {
        return alert('아이디 또는 비밀번호를 입력해주세요.');
      }
      const response = await axiosRequestApi({
        url: '/user/auth/login',
        method: 'POST',
        params: { username, password },
      })
      if (response.status === 200) {
        cookie.set('shoppingmall-cookie', response.headers?.authorization);
        alert('로그인이 성공하였습니다.');
        return props.history.push('/');
      }
      return console.error(response?.status);
    } catch (e) {
      alert('로그인이 실패했습니다. 입력하신 정보를 확인해주세요.')
      console.error(e);
    }
  }

  return (
    <section className={styles.login_container}>
      <article className={styles.title}><h1>로그인</h1></article>
      <div className={styles.form_container}>
        <input
          name="username"
          className={styles.input_id}
          onChange={(e) => { setUsername(e.target.value) }}
          placeholder="아이디를 입력해주세요."
          type="text"
        />
        <input
          name="password"
          className={styles.input_pw}
          onChange={(e) => { setPassword(e.target.value) }}
          placeholder="비밀번호를 입력해주세요."
          type="password"
        />
        <button onClick={submit}>로그인</button>
        <button onClick={() => { props.history.push('/signup') }}>회원가입</button>
      </div>
    </section>
  )
}

export default Login;
