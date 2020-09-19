import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export const ButtonIncrement = ({ noOfBoxes, handleDecrement, handleIncrement }) => (
    <ButtonGroup size="small" aria-label="small outlined button group">
        <Button variant="contained" color="primary" disabled={noOfBoxes <= 1} onClick={handleDecrement}>-</Button>
        <Button disabled>{noOfBoxes}</Button>
        <Button variant="contained" color="primary" onClick={handleIncrement}>+</Button>
    </ButtonGroup>
)

