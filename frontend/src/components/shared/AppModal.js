//import 'babel-polyfill';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal,ModalManager,Effect } from 'react-dynamic-modal';

export class AppModal extends Component{
  constructor(props) {
    super(props)

    this.closeModal = this.closeModal.bind(this)
  }

  closeModal (item, value) {
    if (this.props.callBackFunction)
      this.props.callBackFunction(item, value);
  }

  render(){
    const { title,content,detail,item,effect } = this.props;

    return (
      <Modal effect={ effect } onRequestClose={ () => true }>
          <div className="modal-header">
            <h4 className="modal-title">{ title }</h4>
          </div>

          <div className="modal-body">
            <h4>{ content }</h4>
            <p>{ detail }</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={ (event) => { ModalManager.close(); this.closeModal(item, 'cancel'); } }>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={ (event) => { ModalManager.close(); this.closeModal(item, 'ok'); } }>OK</button>
          </div>
      </Modal>
    );
  }
}
 