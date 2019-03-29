import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ProjectRow from "./ProjectRow";

export default class EventRow extends PureComponent {
  static displayName = "EntitiesList.Entity.ProjectRow";

  static propTypes = {
    entity: PropTypes.object,
    placeholderMode: PropTypes.string,
    listStyle: PropTypes.oneOf(["rows", "grid"]),
    figure: PropTypes.node,
    compact: PropTypes.bool
  };

  get project() {
    return this.props.entity.relationships.project;
  }

  render() {
    return <ProjectRow {...this.props} entity={this.project} />;
  }
}
