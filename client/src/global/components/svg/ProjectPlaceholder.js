import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SVGProjectPlaceholder extends Component {
  static displayName = "SVG.ProjectPlaceholder";

  static propTypes = {
    color: PropTypes.string
  };

  render() {
    const blockClass = "project-thumb-placeholder";
    const colorModifier =
      !this.props.color || this.props.color === "sentary"
        ? "sentary"
        : this.props.color;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 134 134"
        width={134}
        height={134}
        className={`${blockClass} ${blockClass}--${colorModifier}`}
        aria-label="Default Project Thumbnail"
      >
        <g fill="none" fillRule="evenodd">
          <g
            className={`${blockClass}__frame`}
            strokeWidth="1.5"
            transform="translate(2 2)"
          >
            <polyline points="124 6 124 124 6 124" />
            <polyline points="130 12 130 130 12 130" />
            <polygon points="0 118 118 118 118 0 0 0" />
          </g>
          <polygon
            className={`${blockClass}__tile`}
            points="0 102 102 102 102 0 0 0"
            transform="translate(10 10)"
          />
          <g transform="translate(34 32)">
            <g transform="translate(47.557 2.968)">
              <polyline
                stroke="#696969"
                strokeWidth="1.5"
                points=".271 7.606 .271 50.893 3.747 57.089 7.221 50.893 7.221 7.606"
              />
              <path
                stroke="#696969"
                strokeWidth="1.5"
                d="M7.22166456 50.8926203L.271601266 50.8926203M.27135443 3.82883544L.27135443 2.02693671C.27135443.936746835 1.1558481.0522531646 2.24603797.0522531646L5.24673418.0522531646C6.33774684.0522531646 7.22141772.936746835 7.22141772 2.02693671L7.22141772 3.82883544"
              />
              <polygon
                stroke="#696969"
                strokeWidth="1.5"
                points=".272 7.606 7.222 7.606 7.222 3.829 .272 3.829"
              />
              <path
                stroke="#696969"
                strokeWidth="1.5"
                d="M3.74655063,11.5277975 L3.74655063,46.9708987"
              />
              <polygon
                fill="#696969"
                points="2.183 54.3 3.747 57.089 5.311 54.3"
              />
            </g>
            <g stroke="#696969" strokeWidth="1.5" transform="translate(0 26)">
              <polygon points="34.054 .598 .703 .598 .703 26.635 17.859 26.635 17.859 34.057 24.336 26.635 34.054 26.635" />
              <path d="M28.3519304 7.9074557L6.30870253 7.9074557M28.3519304 18.7725759L6.30870253 18.7725759M28.3519304 13.3399747L6.30870253 13.3399747" />
            </g>
            <g stroke="#696969" strokeWidth="1.5">
              <path d="M27.3882848 11.8128038C27.3882848 14.7707152 24.9898671 17.1691329 22.0319557 17.1691329 19.0740443 17.1691329 16.6756266 14.7707152 16.6756266 11.8128038 16.6756266 8.85489241 19.0740443 6.45647468 22.0319557 6.45647468 24.9898671 6.45647468 27.3882848 8.85489241 27.3882848 11.8128038zM27.3882848 12.0765886L34.9537911 4.51108228C36.3196139 3.14608228 38.6546772 4.11285443 38.6546772 6.04475316M8.54099982 6.88421582L14.7943291.639221519C16.1601519-.726601266 18.4952152.240993671 18.4952152 2.17206962M11.4153165 12.3338734L12.5877848 11.8393797C13.52 11.4469114 14.5706962 11.4469114 15.5029114 11.8393797L16.6753797 12.3338734" />
              <path d="M11.4153165,11.8128038 C11.4153165,14.7707152 9.01689873,17.1691329 6.05898734,17.1691329 C3.10107595,17.1691329 0.702658228,14.7707152 0.702658228,11.8128038 C0.702658228,8.85489241 3.10107595,6.45647468 6.05898734,6.45647468 C9.01689873,6.45647468 11.4153165,8.85489241 11.4153165,11.8128038 Z" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}