import React from 'react';
import axiosRequestApi from '../../utils/axiosRequest';

import styles from './Login.scss';

const Login = (props: any) => {
  const submit = async (info: React.FormEvent<HTMLFormElement>) => {
    console.log(info)
    try {
      const response = await axiosRequestApi({
        url: '/user/auth/login',
        method: 'POST',
        params: { username: '', password: '' },
      })
      if (response.status === 200) {
        return alert('로그인이 성공하였습니다.')
      }
      return console.error(response?.status);
    } catch (e) {
      alert('로그인이 실패했습니다. 입력하신 정보를 확인해주세요.')
      console.error(e);
    }
  }

  return (
    <section className={styles.login_container}>
      <article className={styles.title}>로그인</article>
      <form className={styles.form_container} onSubmit={submit}>
        <input
          name="username"
          className={styles.input_id}
          placeholder="아이디를 입력해주세요."
          type="text"
        />
        <input
          name="password"
          className={styles.input_pw}
          placeholder="비밀번호를 입력해주세요."
          type="password"
        />
        <button type="submit">로그인</button>
      </form>
    </section>
  )
}

export default Login;
