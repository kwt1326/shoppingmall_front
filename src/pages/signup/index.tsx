import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axiosRequestApi from '../../utils/axiosRequest';
import validator from '../../utils/signupValitor';

import styles from './SignUp.scss';

const SignUp = (props: any) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState(''); // 단방향, https 전송 이므로 인코딩X
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const validate = (): boolean => {
    if (username && password && name && contact && email) {
      if (
        validator('username', username) &&
        validator('contact', contact) &&
        validator('password', password) &&
        validator('email', email)
      ) {
        return true;
      }
    } else {
      alert('가입 정보를 입력해주세요.')
    }
    return false;
  }

  const submit = async () => {
    try {
      if (!validate()) return;
      const response = await axiosRequestApi({
        url: '/user/auth/create',
        method: 'POST',
        data: { username, password, contact, email, name },
      })
      if (response.status === 200) {
        alert('가입에 성공하였습니다. \n로그인 화면으로 이동합니다.');
        return props.history.push('/login');
      }
      return console.error(response?.status);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.section_wrap}>
        <article className={styles.title}>
          <h1>회원가입</h1>
        </article>
        <div className={styles.content_wrap}>
          <div className={styles.input_wrap}>
            <label htmlFor="input_username" className={styles.form_label}>아이디</label>
            <input id="input_username" className={styles.form_control} type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
            />
          </div>
          <div className={styles.input_wrap}>
            <label htmlFor="input_pw" className={styles.form_label}>비밀번호</label>
            <input id="input_pw" className={styles.form_control} type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className={styles.input_wrap}>
            <label htmlFor="input_name" className={styles.form_label}>사용자명</label>
            <input id="input_name" className={styles.form_control} type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className={styles.input_wrap}>
            <label htmlFor="input_contact" className={styles.form_label}>연락처</label>
            <input id="input_contact" className={styles.form_control} type="text"
              onChange={(e) => setContact(e.target.value?.replace(/[^0-9]/g, ''))}
              value={contact}
            />
          </div>
          <div className={styles.input_wrap}>
            <label htmlFor="input_email" className={styles.form_label}>이메일</label>
            <input id="input_email" className={styles.form_control} type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <button onClick={submit}>가입하기</button>
        </div>
      </div>
    </section>
  )
}

export default withRouter(SignUp);