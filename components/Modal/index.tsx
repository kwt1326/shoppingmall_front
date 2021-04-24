import React from 'react';
import { connect } from 'react-redux';
import { modalOnOff } from '../../store/actions';
import styles from './Modal.module.scss';

const Modal = (props: any) => {
  return (
    <div className={styles.container} data-open={props.isOpen}>
      <div className={styles.modal_wrap}>
        <div className={styles.close_btn} onClick={() => props.modalOnOff(false)} />
        {props.modalComponent}
      </div>
    </div>
  )
}

const mapStateToProps = (state: { modal: { isOpen: boolean; modalComponent: any }; }) => ({
  isOpen: state.modal.isOpen,
  modalComponent: state.modal.modalComponent,
});

const mapDispatchToProps = (dispatch: (arg0: { type: string; isOpen?: boolean; }) => any) => ({
  modalOnOff: (isOpen: boolean) => dispatch(modalOnOff(isOpen)),
});  

export default connect(mapStateToProps, mapDispatchToProps)(Modal);