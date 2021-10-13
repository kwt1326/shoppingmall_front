import React from "react";

import styles from './Mypage.scss';

const Mypage = (props: any) => {
  const {
    location
  } = props;
  const { edit } = location.params;
  return (
    <section className={styles.mypage_container}>
      <input
        name="username"
        className={styles.input_id}
        placeholder="아이디를 입력해주세요."
        type="text"
        disabled={!edit}
      />
    </section>
  )
}