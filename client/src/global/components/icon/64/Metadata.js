import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Metadata extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string
  };

  static defaultProps = {
    className: "",
    width: 44,
    height: 44
  };

  render() {
    const { className, width, height } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width}
        height={height}
        viewBox="0 0 44 44"
      >
        <path
          d="M50.3575535,16.8650119 L36.4328782,13.0164094 L13.2597167,32.1224174 L28.3074171,50.3732863 L51.4805971,31.2672631 L50.3575535,16.8650119 Z M28.0365829,53.1887137 L10.4442832,31.8515826 L35.9631218,10.8115905 L52.2424466,15.3109881 L53.555403,32.1487369 L28.0365829,53.1887137 Z M24.2831408,34.8501729 L23.0108591,33.3070271 L33.7550591,24.448727 L35.0273409,25.9918729 L24.2831408,34.8501729 Z M29.0031331,40.5750794 L27.7308669,39.0319206 L38.475167,30.1737206 L39.7474331,31.7168794 L29.0031331,40.5750794 Z M43.2364,26.2414 C41.3003658,26.2414 39.7309,24.6719342 39.7309,22.7359 C39.7309,20.7998658 41.3003658,19.2304 43.2364,19.2304 C45.1724342,19.2304 46.7419,20.7998658 46.7419,22.7359 C46.7419,24.6719342 45.1724342,26.2414 43.2364,26.2414 Z M43.2364,24.2414 C44.0678647,24.2414 44.7419,23.5673647 44.7419,22.7359 C44.7419,21.9044353 44.0678647,21.2304 43.2364,21.2304 C42.4049353,21.2304 41.7309,21.9044353 41.7309,22.7359 C41.7309,23.5673647 42.4049353,24.2414 43.2364,24.2414 Z"
          transform="translate(-10 -10)"
        />
      </svg>
    );
  }
}