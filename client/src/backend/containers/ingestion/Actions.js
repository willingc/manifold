import React, { Component } from "react";
import PropTypes from "prop-types";

export default class IngestionActions extends Component {
  static displayName = "Ingestion.Actions";

  static propTypes = {
    ingestion: PropTypes.object,
    connected: PropTypes.bool,
    start: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    complete: PropTypes.func.isRequired
  };

  get ingestion() {
    return this.props.ingestion;
  }

  get connected() {
    return this.props.connected;
  }

  get canCancel() {
    return !this.finished && !this.inProgress;
  }

  get finished() {
    return this.ingestion.attributes.state === "finished";
  }

  get inProgress() {
    return this.ingestion.attributes.state === "processing";
  }

  get startButton() {
    if (this.finished) return null;
    const label = this.inProgress ? "Ingesting" : "Start Ingestion";

    return (
      <button
        onClick={this.props.start}
        className="button-icon-secondary"
        disabled={this.inProgress}
      >
        <i className="manicon manicon-arrow-down" aria-hidden="true" />
        <span>{label}</span>
      </button>
    );
  }

  get backButton() {
    if (this.finished) return null;

    return (
      <button
        onClick={this.props.cancel}
        className="button-icon-secondary dull"
        disabled={this.inProgress}
      >
        <i className="manicon manicon-x small" aria-hidden="true" />
        <span>Change Source</span>
      </button>
    );
  }

  get completeButton() {
    if (!this.finished) return null;

    return (
      <button onClick={this.props.complete} className="button-icon-secondary">
        <i className="manicon manicon-check small" aria-hidden="true" />
        <span>Complete</span>
      </button>
    );
  }

  render() {
    if (!this.ingestion || !this.connected) return null;

    return (
      <div className="buttons-icon-horizontal">
        {this.startButton}
        {this.completeButton}
        {this.backButton}
      </div>
    );
  }
}
