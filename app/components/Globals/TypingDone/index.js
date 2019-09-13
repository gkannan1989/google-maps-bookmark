/**
 * @memberOf components.Globals
 * @namespace components.Globals.TypingDone
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

/**
 * class representing a component
 * @memberOf components.Globals.TypingDone
 * @class TypingDone
 * @classdesc
 * Typing done will trigger given function after user done typing
 * @extends Component
 * @example
 * <TypingDone
     onChangeValue={onChangeValue}
     disabled={disabled}
     onTypingDone={onTypingDone}
     placeholder={placeholder}
     value={value}
     type={type}
   />
 */
class TypingDone extends Component {
  /**
   * initializes TypingDone
   * @memberOf components.Globals.TypingDone.TypingDone
   * @constructs TypingDone
   * @function constructor
   * @description initializes default states and gives access to class through the handlers
   * @param {object} props - props to extend
   * @return void
   */
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
    this.timer = false;

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSetTimer = this.handleSetTimer.bind(this);
    this.handleClearTimer = this.handleClearTimer.bind(this);
  }

  /**
   * operations after mounting components
   * @memberOf components.Globals.TypingDone.TypingDone
   * @function componentDidMount
   * @description initializes given props in state after mounting component
   * @return void
   */
  componentDidMount() {
    const { value } = this.props;
    if (value && value !== '') {
      this.handleValueChange(value);
    }
  }

  /**
   * operations after reseiving props
   * @memberOf components.Globals.TypingDone.TypingDone
   * @function componentWillReceiveProps
   * @description updates state using given props from parent
   * @param {object}   nextProps    - updated props given from parent
   * @return void
   */
  componentWillReceiveProps(nextProps) {
    const { value: currentValue } = this.state;
    const { value } = nextProps;
    if (currentValue !== value) {
      this.setState({
        value,
      });
    }
  }

  /**
   * sets a value in state and passes up to parent
   * @memberOf components.Globals.TypingDone.TypingDone
   * @function handleValueChange
   * @description sets given value to state of component and passes up to parent
   * @param {object}   value    - value to put in state and pass up
   * @return void
   */
  handleValueChange(value) {
    const { onChangeValue } = this.props;
    this.setState(
      {
        value,
      },
      () => {
        onChangeValue(value);
        this.handleSetTimer();
      },
    );
  }

  /**
   * sets an interval to tell the parent that typing is done
   * @memberOf components.Globals.TypingDone.TypingDone
   * @function handleSetTimer
   * @description sets an interval to tell the parent that typing is done
   * @return void
   */
  handleSetTimer() {
    const { delay, onTypingDone } = this.props;
    if (this.timer) {
      this.handleClearTimer();
    }
    this.timer = setInterval(() => {
      onTypingDone();
      this.handleClearTimer();
    }, delay);
  }

  /**
   * clears the interval
   * @memberOf components.Globals.TypingDone.TypingDone
   * @function handleSetTimer
   * @descriptionclears the interval to avoid calling typing done again
   * @return void
   */
  handleClearTimer() {
    clearInterval(this.timer);
  }

  /**
   * renders TypingDone component
   * @memberOf components.Globals.TypingDone.TypingDone
   * @function render
   * @description renders an input witch call given function when user done typing
   * @return {jsx} - jsx component to show
   */
  render() {
    const { value } = this.state;
    const rest = omit(this.props, ['onTypingDone', 'onChangeValue', 'delay']);
    return (
      <input
        value={value}
        onChange={e => {
          this.handleValueChange(e.target.value);
        }}
        {...rest}
      />
    );
  }
}
/**
 * @memberOf components.Globals.TypingDone.TypingDone
 * @name propTypes
 * @type {object}
 * @description defines prop types of TypingDone
 * @property {boolean}     [disabled]             - defines that input is disabled
 * @property {boolean}     [readOnly]             - defines that input is readonly
 * @property {string}      [value]                - value of input
 * @property {string}      [defaultValue]         - default value to initialize input
 * @property {string}      [placeholder]          - placeholder to show when input is empty
 * @property {string}      [type]                 - type of the input
 * @property {number}      [delay]                - delay after user done typing
 * @property {function}    onChangeValue          - function to change value
 * @property {function}    onTypingDone           - function to call after user done typing
 * @property {string}      [className]            - class name of input
 */
TypingDone.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  delay: PropTypes.number,
  onChangeValue: PropTypes.func.isRequired,
  onTypingDone: PropTypes.func.isRequired,
  className: PropTypes.string,
};

/**
 * @memberOf components.Globals.TypingDone.TypingDone
 * @name defaultProps
 * @type {object}
 * @description defines default props of TypingDone
 * @property {number}      delay          - default delay after user done typing
 */
TypingDone.defaultProps = {
  delay: 1000,
};

/**
 * @memberOf components.Globals.TypingDone.TypingDone
 * @export Places
 * @description exports TypingDone module.
 */
export default TypingDone;
