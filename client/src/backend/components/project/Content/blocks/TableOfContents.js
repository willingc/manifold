import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Placed from "./Placed";
import Unplaced from "./Unplaced";

export default class ProjectContentBlocksTableOfContents extends PureComponent {
  static displayName = "Project.Content.Blocks.TableOfContents";

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

    return <Component title="Table of Contents" icon="touch" index={this.props.index} />;
  }
}
