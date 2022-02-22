import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import StyledTurn from './styled'
import Slide from '@material-ui/core/Slide'
import ArrowRight from '@material-ui/icons/TrendingFlat'
import {
  compose,
  setPropTypes,
  withHandlers,
  lifecycle,
  onlyUpdateForKeys,
} from 'recompose'
import {endTurn} from 'store/movement'
import {withNamespaces} from 'react-i18next'

function Turn({currentPlayer, canPassTurn, endTurn, t}) {
  const color = currentPlayer === 1 ? 'primary' : 'secondary'
  const tPassTurn = t('buttons.pass_turn')
  return (
    <Slide
      key={`button-turn-player-${currentPlayer}`}
      direction="up"
      in={canPassTurn}
      mountOnEnter
      unmountOnExit
    >
      <Button
        variant="extendedFab"
        aria-label="Pass Turn"
        onClick={endTurn}
        color={color}
        size="large"
        component={StyledTurn}
      >
        {tPassTurn}
        <ArrowRight className="Icon" />
      </Button>
    </Slide>
  )
}

const propTypes = {
  /**
   * The current player
   */
  currentPlayer: PropTypes.oneOf([1, 2]).isRequired,

  /**
   * Determine if player can pass his turn
   */
  canPassTurn: PropTypes.bool.isRequired,

  /**
   * Callback to end current player turn
   */
  endTurn: PropTypes.func.isRequired,

  /**
   * The translations
   */
  t: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    currentPlayer: state.turns.currentPlayer,
    canPassTurn: state.movement.movementCount !== 0,
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    {endTurn},
  ),
  withNamespaces(),
  withHandlers({
    spacebarPressed: props => e => {
      if (e.code === 'Space') {
        props.endTurn()
      }
      e.preventDefault()
      e.stopPropagation()
    },
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('keydown', this.props.spacebarPressed)
    },
    componentWillUnmount() {
      window.removeEventListener('keydown', this.props.spacebarPressed)
    },
  }),
  setPropTypes(propTypes),
  onlyUpdateForKeys(['canPassTurn']),
)

export default enhance(Turn)
