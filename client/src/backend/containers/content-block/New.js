import React, { Component } from "react";
import PropTypes from "prop-types";
import connectAndFetch from "utils/connectAndFetch";
import Form from "backend/containers/project/content/Form";
import lh from "helpers/linkHandler";
import { Redirect } from "react-router-dom";

export class ContentBlockNewContainer extends Component {
  static displayName = "ContentBlock.New";

  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    pendingBlock: PropTypes.object
  };

  get pendingBlock() {
    return this.props.pendingBlock;
  }

  get projectId() {
    return this.props.match.params.pId;
  }

  render() {
    // This container is dependent on a pendingBlock being placed in the layout.  If no pendingBlock is
    // passed, we assumed nothing has changed in the layout and close the drawer.
    if (!this.pendingBlock)
      return (
        <Redirect to={lh.link("backendProjectProjectPage", this.projectId)} />
      );

    return (
      <section>
        <header className="drawer-header">
          <h2 className="heading-quaternary">Configure Content Block</h2>
        </header>
        <Form contentBlock={this.pendingBlock} />
      </section>
    );
  }
}

export default connectAndFetch(ContentBlockNewContainer);
