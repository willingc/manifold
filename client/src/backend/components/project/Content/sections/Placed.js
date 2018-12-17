import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { Droppable } from "react-beautiful-dnd";
import humps from "humps";
import Blocks from "../blocks";

export default class ProjectContentSectionsPlaced extends PureComponent {
  static displayName = "Project.Content.Sections.Placed";

  static propTypes = {
    blocks: PropTypes.array
  };

  static defaultProps = {
    blocks: []
  };

  blockComponent(entity, index) {
    const name = humps.pascalize(entity.attributes.name);
    const Component = Blocks[name];

    return <Component key={`AvailableBlock-${index}`} placed entity={entity} index={index} />
  }

  render() {
    return (
      <React.Fragment>
        <Header title="Content Layout" instructions="Use the icons on the left of each content block to reorder them, edit their settings, change their visibility, or remove them." />
        <Droppable droppableId="placed">
          {provided => (
            <div ref={provided.innerRef} className="list drag-container">
              {this.props.blocks.length
                ? this.props.blocks.map((entity, index) => this.blockComponent(entity, index) )
                : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </React.Fragment>
    );
  }
}
