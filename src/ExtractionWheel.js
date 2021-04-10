import './ShotFormPageFinal.scss';
import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody, Tooltip, UncontrolledTooltip  } from 'reactstrap';

function ExtractionWheel(props) {

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const ToggleTool = () => setTooltipOpen(!tooltipOpen);


    return(
    <div class="main mt-5 mb-5">
                    <div>
                        <div class="quarter quarter1" id="Tooltip1" ></div>    
                    </div>
                    <div>  
                        <div class="quarter quarter2" id="Tooltip2" ></div>
                        </div>
                    <div>
                        <div class="quarter quarter3" id="Tooltip3" ></div>
                        </div>
                    <div>
                        <div class="quarter quarter4" id="Tooltip4" ></div>
                    </div>
                        <div class="cutout"></div>


                        <UncontrolledTooltip show={tooltipOpen} placement="left" target="Tooltip1" trigger="hover">
                            <h6>Extract more by</h6>
                            <ul>
                                <li>Finer Grind</li>
                                <li>More Time</li>
                                <li>Increase Yield</li>
                                <li>If Fast: Try Increasing Dose</li>
                            </ul>
                        </UncontrolledTooltip>

                        <UncontrolledTooltip show={tooltipOpen} placement="right" target="Tooltip2" trigger="hover">
                            <h6>Extract less by</h6>
                            <ul>
                                <li>Coarser Grind</li>
                                <li>Less Time</li>
                                <li>Decrease Yield</li>
                                <li>If Slow: Try Decreasing Dose</li>
                            </ul>
                        </UncontrolledTooltip>

                        <UncontrolledTooltip show={tooltipOpen} placement="left" target="Tooltip3" trigger="hover">
                        <h6>Balance solubles by</h6>
                            <ul>
                                <li>Finer Grind</li>
                                <li>More Time</li>
                                <li>Increase Dose</li>
                                <li>Balance Dose with Ratio</li>
                            </ul>
                        </UncontrolledTooltip>

                        <UncontrolledTooltip show={tooltipOpen} placement="right" target="Tooltip4" trigger="hover">
                        <h6>Weak and Bitter</h6>
                            <ul>
                                <li>Coarser Grind</li>
                                <li>Less Time</li>
                                <li>Decrease Dose</li>
                                <li>Balance Yield with Ratio</li>
                            </ul>
                        </UncontrolledTooltip>




                        <div id="innerCir" class="container text-center">
                            <div class="row">
                                <div class="quarter-circle-bottom-right focusTopLeft"><span id="middleTextInnerCirTop">Sour</span></div>
                                <div class="quarter-circle-bottom-left"><span id="middleTextInnerCirTop">Bitter</span></div>
                            </div>

                            <div class="row">
                                <div class="quarter-circle-top-right"><span id="middleTextInnerCirBottom">Flat</span></div>
                                <div class="quarter-circle-top-left"><span id="middleTextInnerCirBottom">Intense</span></div>
                            </div>

                        </div>
                </div>
    )
}

export default ExtractionWheel;