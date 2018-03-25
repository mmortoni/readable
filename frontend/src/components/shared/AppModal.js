import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalManager, Effect } from 'react-dynamic-modal'

const AppModal = props => {
  const { title, content, detail, callBackFunction, item, effect } = props

  const closeModal = (item, value) => {
    if (callBackFunction)
      callBackFunction(item, value)
  }

  return (
    <Modal effect={effect} onRequestClose={() => true}>
      <div className="modal-header">
        <h4 className="modal-title">{title}</h4>
      </div>

      <div className="modal-body">
        <h4>{content}</h4>
        <h3 className="text-danger">{detail}</h3>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-default" onClick={(event) => { ModalManager.close(); closeModal(item, 'cancel'); }}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={(event) => { ModalManager.close(); closeModal(item, 'ok'); }}>OK</button>
      </div>
    </Modal>
  )
}

AppModal.prototype = {
  title: PropTypes.string.isRequired, 
  content: PropTypes.string.isRequired, 
  detail: PropTypes.string.isRequired, 
  callBackFunction: PropTypes.func, 
  item: PropTypes.string.isRequired, 
  effect: PropTypes.string.isRequired
}


export default AppModal
