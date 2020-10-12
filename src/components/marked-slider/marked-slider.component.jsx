import React from 'react'
import Slider from '@material-ui/core/Slider'
import { withStyles } from "@material-ui/core/styles"

const MSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
    },
    rail: {
      height: 8,
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 14,
        width: 4,
        marginTop: -3,
      },
      markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
      },
  })(Slider);


export const MarkedSlider = ({ volumeFlow, onVolumeFlowChange,marks }) => (
    <div>
        <MSlider
            defaultValue={0}
            aria-labelledby="discrete-slider-always"
            min={0}
            max={marks[3].value}
            step={null}
            valueLabelDisplay="auto"
            onChange={onVolumeFlowChange}
            value={volumeFlow || 0}
            marks={marks}
        ></MSlider>
    </div>
)

