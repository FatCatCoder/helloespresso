import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {useHistory} from 'react-router-dom';

// if not logged in, disable button...
// TODO persist shotlog so user can click add to log button and it redirects to to login page then back to pull page with persisted data to enter as log
// this will help people who forgot to log in but pull valuable data already
// for now use tooltip to say login

function AddToJournalModal ({ buttonLabel, className, handleModalSubmit, handleModalInputChange, journalEntry, isLoggedIn }){
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  let history = useHistory();

  return (
    <>
      <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">login to add to your journal!</Tooltip>}>
        <span className="d-inline-block">
          <Button color="primary" className="mx-auto pe-2 ps-2 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 btn" disabled={!isLoggedIn} data-bs-dismiss="offcanvas" onClick={isLoggedIn? toggle: () => history.push('/login')}>{buttonLabel}</Button>
        </span>
      </OverlayTrigger>

      <form onSubmit={handleModalSubmit} id="modalForm" inline="true">
      <Modal isOpen={modal} toggle={toggle} className={className} centered={true}>
        <ModalHeader toggle={toggle}>Add to Journal</ModalHeader>
        <ModalBody>
                <div className="mb-3">
                    <FormGroup>
                        <label for="bean" className="form-label">Bean</label>
                        <input value={journalEntry.Bean} onChange={handleModalInputChange} type="text" className="form-control" id="bean" name="bean" placeholder="Bean..."></input>
                    </FormGroup>
                    <FormGroup>
                        <label for="region" className="form-label">Region</label>
                        <input value={journalEntry.Region} onChange={handleModalInputChange} type="text" className="form-control" id="region" name="region" aria-describedby="Region" placeholder="Region..."></input>
                    </FormGroup>
                    <FormGroup>
                        <label for="roaster" className="form-label">Roaster</label>
                        <input value={journalEntry.Roaster} onChange={handleModalInputChange} type="text" className="form-control" id="roaster" name="roaster" aria-describedby="Roaster" placeholder="Roaster..."></input>
                    </FormGroup>
                </div>  
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"  type="submit" form="modalForm" value="Submit" onClick={toggle}>Confirm</button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </form>
    </>
  );
}

export default AddToJournalModal;