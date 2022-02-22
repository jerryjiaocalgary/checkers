import React from 'react'
import PropTypes from 'prop-types'
import StyledCountDownTimer from './styled'
import { withNamespaces } from 'react-i18next'
import { compose, setPropTypes } from 'recompose'
import { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import { endTurn } from 'store/movement'

function CountDownTimer({ currentPlayer, timeLimits, canPassTurn, endTurn }) {
    const [previousPlayer, setPreviousPlayer] = useState(1);
    const [seconds, setSeconds] = useState(timeLimits);
    const [failedMessage, setFailedMessage] = useState("");

    function updateTime() {
        if (seconds == 0) {
            if (!canPassTurn) {
                setFailedMessage("Player " + currentPlayer + " has failed to make any move within the " + timeLimits + " seconds time limit.")
            }
            else {
                setSeconds(timeLimits);
                endTurn();
            }
        }
        else if (previousPlayer !== currentPlayer) {
            setSeconds(timeLimits);
            setPreviousPlayer(currentPlayer);
        }
        else {
            setSeconds(seconds => seconds - 1);
        }
    }

    useEffect(() => {
        const token = setTimeout(updateTime, 1000)

        return function cleanUp() {
            clearTimeout(token);
        }
    })

    function handleReset() {
        setSeconds(timeLimits);
        setFailedMessage("");
    }

    return (
        <StyledCountDownTimer currentPlayer={currentPlayer}>
            <div className="Container">
                <div className="Header">Player {currentPlayer}'s  turn</div>
                <div className="MainTimer" style={{ color: seconds <= 5 ? 'Red' : 'White' }}>0:{("00" + seconds).slice(-2)}</div>
                {failedMessage.length > 0 && <div className="TimedOut">
                    <div className="msg">{failedMessage}</div>
                    <div className="reset">
                        Apologize and <Button variant="contained" color="primary" className='btn' onClick={handleReset}>Reset</Button>
                    </div>
                </div>
                }
            </div>
        </StyledCountDownTimer>
    )
}

function mapStateToProps(state) {
    return {
        currentPlayer: state.turns.currentPlayer,
        timeLimits: state.turns.timeLimit,
        canPassTurn: state.movement.movementCount !== 0,
    }
}

const propTypes = {

    /* The Current Player */
    currentPlayer: PropTypes.oneOf([1, 2]).isRequired,

    timeLimits: PropTypes.number.isRequired,

    canPassTurn: PropTypes.bool.isRequired,

    /**
    * Callback to end current player turn
    */
    endTurn: PropTypes.func.isRequired,
}

const enhance = compose(
    connect(
        mapStateToProps,
        { endTurn },
    ),
    withNamespaces(),
    setPropTypes(propTypes),
)

export default enhance(CountDownTimer)
