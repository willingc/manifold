import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Utility from "global/components/utility";
import { Draggable } from "react-beautiful-dnd";

export default class ProjectContentSectionsHeader extends PureComponent {
  static displayName = "Project.Content.Sections.Header";

  static propTypes = {
    title: PropTypes.string,
    instructions: PropTypes.string
  };

  get instructions() {
    const instructions = this.props.instructions;
    if (!instructions) return null;
    return <span className="instructions">{instructions}</span>;
  }

  render() {
    const title = this.props.title;
    if (!title) return null;

    return (
      <div>
        <h2>{title}</h2>
        {this.instructions}
      </div>
    );
  }
}
