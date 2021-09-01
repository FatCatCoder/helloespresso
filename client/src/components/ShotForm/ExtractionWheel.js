/* eslint-disable */
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import '../../assets/ShotFormPageFinal.scss';


function ExtractionWheel({attribute}) {
    const tooltip1 = (props) => (
        <Tooltip id="button-tooltip1" {...props}>
            <h6>Extract more by</h6>
            <ul>
                <li>Finer Grind</li>
                <li>More Time</li>
                <li>Increase Yield</li>
                <li>If Fast: Try Increasing Dose</li>
            </ul>
        </Tooltip>
        )
    const tooltip2 = (props) => (
        <Tooltip id="button-tooltip2" {...props}>
            <h6>Extract less by</h6>
            <ul>
                <li>Coarser Grind</li>
                <li>Less Time</li>
                <li>Decrease Yield</li>
                <li>If Slow: Try Decreasing Dose</li>
            </ul>
        </Tooltip>
        )
    const tooltip3 = (props) => (
        <Tooltip id="button-tooltip3" {...props}>
            <h6>Balance solubles by</h6>
            <ul>
                <li>Finer Grind</li>
                <li>More Time</li>
                <li>Increase Dose</li>
                <li>Balance Dose with Ratio</li>
            </ul>
        </Tooltip>
        )
    const tooltip4 = (props) => (
        <Tooltip id="button-tooltip4" {...props}>
            <h6>Weak and Bitter</h6>
            <ul>
                <li>Coarser Grind</li>
                <li>Less Time</li>
                <li>Decrease Dose</li>
                <li>Balance Yield with Ratio</li>
            </ul>
        </Tooltip>
        )


    return(
        <div className="main mt-5 mb-5">
            <div>
                <OverlayTrigger overlay={tooltip1} placement={'right'}>
                    <div className="quarter quarter1" id="Tooltip1" ></div>
                </OverlayTrigger>
            </div>
            
            <div>  
                <OverlayTrigger overlay={tooltip2} placement={'left'}>
                    <div className="quarter quarter2" id="Tooltip2" ></div>
                </OverlayTrigger>
            </div>

            <div>
                <OverlayTrigger overlay={tooltip3} placement={'right'}>
                    <div className="quarter quarter3" id="Tooltip3" ></div>
                </OverlayTrigger>
            </div>

            <div>
                <OverlayTrigger overlay={tooltip4} placement={'left'}>
                    <div className="quarter quarter4" id="Tooltip4" ></div>
                </OverlayTrigger>
            </div>

            <div className="cutout"></div>

            <div id="innerCir" className="container text-center">
                <div className="row">
                    <div className={`quarter-circle-bottom-right ${attribute === 'sour'? 'focusTopLeft': ''}`}><span id="middleTextInnerCirTop">Sour</span></div>
                    <div className={`quarter-circle-bottom-left ${attribute === 'bitter'? 'focusTopRight': ''}`}><span id="middleTextInnerCirTop">Bitter</span></div>
                </div>

                <div className="row">
                    <div className={`quarter-circle-top-right ${attribute === 'weak'? 'focusBottomRight': ''}`}><span id="middleTextInnerCirBottom">Weak</span></div>
                    <div className={`quarter-circle-top-left ${attribute === 'missing'? 'focusBottomLeft': ''}`}><span id="middleTextInnerCirBottom">Intense</span></div>
                </div>
            </div>
        </div>
        )
    }

export default ExtractionWheel;
