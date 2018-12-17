import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Available from "./sections/Available";
import Placed from "./sections/Placed";
import { projectsAPI } from "api";
import { DragDropContext } from "react-beautiful-dnd";
import Developer from "global/components/developer";

export default class ProjectContent extends PureComponent {
  static displayName = "Project.Content";

  static propTypes = {
    // dispatch: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      available: [
        { id: "1", attributes: { type: "Content::TOCBlock", name: "Table of Contents" } },
        { id: "2", attributes: { type: "Content::ResourcesBlock", name: "Resources" } },
        { id: "2", attributes: { type: "Content::MarkdownBlock", name: "Markdown" } }
      ],
      placed: []
    }
  }

  get availableBlocks() {
    return this.state.available;
  }

  get placedBlocks() {
    return this.state.placed;
  }

  onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) return null;

    switch (source.droppableId) {
      case destination.droppableId:
        return this.reorder(source, destination);
      case "available":
        return this.copy(source, destination);
      default:
        return null;
    }
  };

  reorder(source, destination) {
    if (source.droppableId !== "placed") return null;

    const items = Array.from(this.placedBlocks);
    const [removed] = items.splice(source.index, 1);
    items.splice(destination.index, 0, removed);

    return this.setState({ placed: items }, () => {
      return this.updateContentBlockPositions(removed);
    });
  }

  // https://codesandbox.io/s/40p81qy7v0
  copy(source, destination) {
    const sourceClone = Array.from(this.availableBlocks);
    const destClone = Array.from(this.placedBlocks);
    const item = sourceClone[source.index];

    destClone.splice(destination.index, 0, { ...item, id: Math.random() }); // TODO: Something other than Math.random(), just needs to be unique

    return this.setState({ placed: destClone }, () => {
      return this.configureContentBlock(item);
    });
  };

  updateContentBlockPositions = entity => {
    // Compose API PUT request to update content block position
  };

  configureContentBlock = entity => {
    // Store block config and position in location state
    // Open /new drawer
  };

  render() {
    const debug = { props: { }, state: this.state };

    return (
      <section>
        <Developer.Debugger object={debug} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Available blocks={this.availableBlocks} />
          <Placed blocks={this.placedBlocks} />
        </DragDropContext>
      </section>
    );
  }
}
