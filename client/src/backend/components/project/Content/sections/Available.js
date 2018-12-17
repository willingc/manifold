import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Blocks from "../blocks";
import { Droppable } from "react-beautiful-dnd";
import humps from "humps";

export default class ProjectContentSectionsAvailable extends PureComponent {
  static displayName = "Project.Content.Sections.Available";

  static propTypes = {
    blocks: PropTypes.array
  };

  static defaultProps = {
    blocks: []
  };

  blockComponent(entity, index) {
    const name = humps.pascalize(entity.attributes.name);
    const Component = Blocks[name];

    return <Component key={`AvailableBlock-${index}`} placed={false} entity={entity} index={index} />
  }

  render() {
    return (
      <React.Fragment>
        <Header title="Content Blocks" instructions="Drag content blocks directly into your project page layout, or use the plus symbol to add them." />
        <Droppable droppableId="available" isDropDisabled>
          {provided => (
            <div ref={provided.innerRef} className="list">
              {this.props.blocks.map((entity, index) => this.blockComponent(entity, index) )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </React.Fragment>
    );
  }
}
