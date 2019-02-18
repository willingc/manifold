import React, { Component } from "react";
import PropTypes from "prop-types";

export default class BEProject extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string
  };

  static defaultProps = {
    className: "",
    width: 57,
    height: 39
  };

  render() {
    const { className, width, height } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width}
        height={height}
        viewBox="0 0 57 39"
      >
        <path
          fillRule="evenodd"
          d="M9.103,24.948 L32.045,34.722 L54.984,24.948 L32.045,15.174 L9.103,24.948 Z M32.045,36.896 L4,24.948 L32.045,13 L60.086,24.948 L32.045,36.896 Z M60.009,32.175 L60.009,30 L32.01,41.94 L4,30.021 L4,32.194 L32.011,44.113 L60.009,32.175 Z M60.009,39.175 L60.009,37 L32.01,48.94 L4,37.02 L4,39.194 L32.011,51.113 L60.009,39.175 Z"
          transform="translate(-4 -13)"
        />
      </svg>
    );
  }
}