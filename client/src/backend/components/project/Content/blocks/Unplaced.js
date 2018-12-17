import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Utility from "global/components/utility";
import { Draggable } from "react-beautiful-dnd";

export default class ProjectContentBlocksUnplaced extends PureComponent {
  static displayName = "Project.Content.Blocks.Placed";

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    index: PropTypes.number
  };

  get body() {
    return (
      <React.Fragment>
        <Utility.IconComposer icon={this.props.icon} size={50} />
        {this.props.title}
      </React.Fragment>
    );
  }

  render() {
    return (
      <Draggable draggableId={`AvailableBlock-${this.props.index}`} index={this.props.index}>
        {(provided, snapshot) => {
          return (
            <React.Fragment>
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={provided.draggableProps.style}
                className="item pool"
              >
                {this.body}
              </div>
              {snapshot.isDragging && <div className="item pool clone">{this.body}</div>}
            </React.Fragment>
          )
        }}
      </Draggable>
    );
  }
}
