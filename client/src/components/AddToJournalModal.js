import { useState } from 'react';
import {useHistory} from 'react-router-dom';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


// if not logged in, disable button...
// TODO persist shotlog so user can click add to log button and it redirects to to login page then back to pull page with persisted data to enter as log
// this will help people who forgot to log in but pull valuable data already
// for now use tooltip to say login

function AddToJournalModal ({ buttonLabel, shotsCount, handleModalSubmit, handleModalInputChange, journalEntry, isLoggedIn, setShow, show }){
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  let history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button color="primary" className="btn w-100" disabled={!isLoggedIn || !shotsCount} data-bs-dismiss="offcanvas" onClick={isLoggedIn? handleShow : () => history.push('/login')}>{buttonLabel}</Button>
      
      <form onSubmit={handleModalSubmit} id="modalForm" inline="true">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add to Journal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <Form.Group>
                  <label for="bean" className="form-label">Bean</label>
                  <input value={journalEntry.Bean} onChange={handleModalInputChange} type="text" className="form-control" id="bean" name="bean" placeholder="Bean..."></input>
              </Form.Group>
              <Form.Group>
                  <label for="region" className="form-label">Region</label>
                  <input value={journalEntry.Region} onChange={handleModalInputChange} type="text" className="form-control" id="region" name="region" aria-describedby="Region" placeholder="Region..."></input>
              </Form.Group>
              <Form.Group>
                  <label for="roaster" className="form-label">Roaster</label>
                  <input value={journalEntry.Roaster} onChange={handleModalInputChange} type="text" className="form-control" id="roaster" name="roaster" aria-describedby="Roaster" placeholder="Roaster..."></input>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" form="modalForm" value="Submit" onClick={toggle}>Confirm</Button>{' '}
            <Button variant="danger" onClick={handleClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>

      </form>
    </>
  );
}

export default AddToJournalModal;
