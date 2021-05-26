

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';

function AddToJournalModal ({ buttonLabel, className, handleModalSubmit, handleModalInputChange, journalEntry }){
  
    

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  return (
    <>
      <Button color="primary" className="mx-auto p-1 col-xs-2 col-md-1 col-xl-1 btn" data-bs-dismiss="offcanvas" onClick={toggle}>{buttonLabel}</Button>
      <form onSubmit={handleModalSubmit} id="modalForm" inline>
      <Modal isOpen={modal} toggle={toggle} className={className} centered={true}>
        <ModalHeader toggle={toggle}>Add to Journal</ModalHeader>
        <ModalBody>
            
                <div className="mb-3">
                    <FormGroup>
                        <label for="bean" className="form-label">Bean</label>
                        <input value={journalEntry.Bean} onChange={handleModalInputChange} type="text" className="form-control" id="Bean" name="Bean" placeholder="Bean..."></input>
                    </FormGroup>
                    <FormGroup>
                        <label for="Region" className="form-label">Region</label>
                        <input value={journalEntry.Region} onChange={handleModalInputChange} type="text" className="form-control" id="Region" name="Region" aria-describedby="Region" placeholder="Region..."></input>
                    </FormGroup>
                    <FormGroup>
                        <label for="Roaster" className="form-label">Roaster</label>
                        <input value={journalEntry.Roaster} onChange={handleModalInputChange} type="text" className="form-control" id="Roaster" name="Roaster" aria-describedby="Roaster" placeholder="Roaster..."></input>
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