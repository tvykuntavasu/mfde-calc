import React from 'react'
import Slider from '@material-ui/core/Slider'
import { withStyles } from "@material-ui/core/styles";


const MHSlider = withStyles({
    root: {
        color: "#52af77",
        height: 8,
    },
    thumb: {
        height: 25,
        width: 25,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -3,
        marginLeft: -12,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit"
        }
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)"
    },
    track: {
        height: 20,
        borderRadius: 4
    },
    rail: {
        height: 20,
        borderRadius: 4
    },    
})(Slider);

export const MFDESlider = ({ avrgSpeedLimit, onAverageSpeedChange }) => (
    <div>
        <MHSlider
            defaultValue={0}
            aria-labelledby="discrete-slider-always"
            min={0}
            max={100}
            step={0.1}
            valueLabelDisplay="on"
            onChange={onAverageSpeedChange}
            value={avrgSpeedLimit || 0}
        ></MHSlider>
    </div>
)

