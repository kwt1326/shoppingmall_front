export default function validator(type: string, str: string) {
  if (typeof str === 'string') {
    switch (type) {
      case 'username':
        if (/^(?=.*[a-zA-z])(?=.*[0-9]).{8,16}$/.test(str) === false) {
          alert('아이디 형식이 올바르지 않습니다.'); return false;
        }
        break;
      case 'contact':
        if (/^[0-9_]{9,12}$/.test(str) === false) {
          alert('연락처 형식이 올바르지 않습니다.'); return false;
        }
        break;
      case 'password':
        if (/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(str) === false) {
          alert('비밀번호 형식이 올바르지 않습니다.'); return false;
        }
        break;
      case 'email':
        if (/^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*\.[a-z]{2,3}$/i.test(str) === false) {
          alert('이메일 형식이 올바르지 않습니다.'); return false;
        }
        break;
      default:
        return false;
    }
    return true;
  }
  return false;
}