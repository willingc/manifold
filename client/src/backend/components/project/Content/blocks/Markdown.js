import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Placed from "./Placed";
import Unplaced from "./Unplaced";

export default class ProjectContentBlocksMarkdown extends PureComponent {
  static displayName = "Project.Content.Blocks.Markdown";

  static propTypes = {
    entity: PropTypes.object,
    index: PropTypes.number,
    placed: PropTypes.bool
  };

  static defaultProps = {
    placed: false
  };

  render() {
    if (!this.props.entity) return null;
    const Component = this.props.placed ? Placed : Unplaced;

    return <Component title="Markdown" icon="lamp" index={this.props.index} />;
  }
}
