import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Stopwatch from './Stopwatch';

// collapse version
//import { useState } from 'react';
//import Collapse from 'react-bootstrap/Collapse'



// function ToolsBox() {
//   const [open, setOpen] = useState(false);

//   const popover = (
//     <Popover placement="bottom" id="Popover1">
//       <Popover.Header>Timer</Popover.Header>
//       <Popover.Body><Stopwatch /></Popover.Body>
//     </Popover>
//   )

// return (
//   <div className="container col-7 col-md-4 col-lg-3 col-xl-2"> 
//     <Button className="btn bg-light btn-outline-dark" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="example-collapse-text" type="button"><i className="bi bi-watch"></i></Button>

//     <Collapse in={open}>
//         <div className="" id="example-collapse-text">
//           <Stopwatch />
//         </div>
//     </Collapse>
//   </div>
// )
// };

// export default ToolsBox


function ToolsBox({handleInputChange}) {
    const popover = (
      <Popover id="Popover1">
        <Popover.Header>Timer</Popover.Header>
        <Popover.Body><Stopwatch handleInputChange={handleInputChange} /></Popover.Body>
      </Popover>
    )
  
  return (
    <div className="text-center">
      <OverlayTrigger trigger="click" placement={'bottom'} overlay={popover}>
        <Button className="btn bg-light btn-outline-dark" id="Popover1" type="button" aria-label="stopwatch"><i className="bi bi-watch"></i></Button>
      </OverlayTrigger>
    </div>
  )
};

export default ToolsBox
