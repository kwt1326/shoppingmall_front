import React from "react";
import { useParams } from "react-router";

import styles from './Mypage.scss';

const Mypage = (props: any) => {
  const params = useParams<{ mode?: string }>();
  return (
    <section className={styles.mypage_container}>
      <input
        name="username"
        className={styles.input_id}
        placeholder="아이디를 입력해주세요."
        type="text"
        disabled={!params?.mode}
      />
    </section>
  )
}

export default Mypage;
