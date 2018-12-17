import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Utility from "global/components/utility";
import { Draggable } from "react-beautiful-dnd";

export default class ProjectContentBlocksPlaced extends PureComponent {
  static displayName = "Project.Content.Blocks.Placed";

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    index: PropTypes.number
  };

  render() {
    return (
      <Draggable draggableId={`PlacedBlock-${this.props.index}`} index={this.props.index}>
        {(provided, snapshot) => {
          return (
            <React.Fragment>
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={provided.draggableProps.style}
                className="item"
              >
                <Utility.IconComposer icon={this.props.icon} size={50} />
                {this.props.title}
              </div>
              {provided.placeholder}
            </React.Fragment>
          )
        }}
      </Draggable>
    );
  }
}
