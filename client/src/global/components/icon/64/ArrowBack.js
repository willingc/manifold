import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ArrowBack extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string
  };

  static defaultProps = {
    className: "",
    width: 52,
    height: 52
  };

  render() {
    const { className, width, height } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width}
        height={height}
        viewBox="0 0 52 52"
      >
        <path
          d="M32,58 C17.6405965,58 5.99999996,46.3594035 5.99999996,32 C5.99999996,17.6405965 17.6405965,5.99999996 32,5.99999996 C46.3594035,5.99999996 58,17.6405965 58,32 C58,46.3594035 46.3594035,58 32,58 Z M32,56 C45.254834,56 56,45.254834 56,32 C56,18.745166 45.254834,7.99999996 32,7.99999996 C18.745166,7.99999996 7.99999996,18.745166 7.99999996,32 C7.99999996,45.254834 18.745166,56 32,56 Z M19.6388077,32.9918997 L19.6403922,30.9919003 L44.0007923,31.0112003 L43.9992077,33.0111997 L19.6388077,32.9918997 Z M21.019947,32 L35.2169617,44.5045804 L33.8950383,46.0054197 L17.994053,32 L33.8950383,17.9945803 L35.2169617,19.4954196 L21.019947,32 Z"
          transform="translate(-6 -6)"
        />
      </svg>
    );
  }
}