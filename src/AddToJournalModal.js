

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input } from 'reactstrap';

function AddToJournalModal (props){

    const {
        buttonLabel,
        className,
        
      } = props;


    const todayDate = new Date().toLocaleDateString();
    const [journalEntry, setJournalEntry] = useState({"Date": todayDate});
    

    const handleSubmit = (event) => {
        event.preventDefault();
        toggle();
        console.log(journalEntry.Bean, journalEntry.Date);
        setJournalEntry({"Date": todayDate})
    }

        const handleModalInputChange = (e) => {
            console.log(e.target.name, e.target.value, e.target)
            setJournalEntry((prevProps) => ({
                ...prevProps,
                [e.target.name]: e.target.value
            }));
        };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  return (
    <>
      <Button color="primary" className="mx-auto p-1 col-xs-2 col-md-1 col-xl-1 btn" data-bs-dismiss="offcanvas" onClick={toggle}>{buttonLabel}</Button>
      <Form onSubmit={handleSubmit} inline>
      <Modal isOpen={modal} toggle={toggle} className={className} centered={true}>
        <ModalHeader toggle={toggle}>Add to Journal</ModalHeader>
        <ModalBody>
            
                <div className="mb-3">
                    <FormGroup>
                        <Label for="bean" className="form-label">Bean</Label>
                        <Input value={journalEntry.Bean} onChange={handleModalInputChange} type="text" className="form-control" id="Bean" name="Bean" placeholder="Bean..."></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Region" className="form-label">Region</Label>
                        <Input value={journalEntry.Region} onChange={handleModalInputChange} type="text" className="form-control" id="Region" name="Region" aria-describedby="Region" placeholder="Region..."></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="roaster" className="form-label">Roaster</Label>
                        <Input value={journalEntry.roaster} onChange={handleModalInputChange} type="text" className="form-control" id="roaster" name="roaster" aria-describedby="roaster" placeholder="Roaster..."></Input>
                    </FormGroup>
                </div> 
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Confirm</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </Form>
    </>
  );
}

export default AddToJournalModal;