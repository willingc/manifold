import React, { PureComponent, PropTypes } from 'react';
import { Form } from 'components/backend';

export default class IngestionFormUpload extends PureComponent {

  static displayName = "ProjectDetail.Text.Ingestion.Form.Upload";

  static PropTypes = {
    getModelValue: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  get valid() {
    return this.ingestionType && (this.ingestionSource || this.ingestionSourceUrl);
  }

  get ingestionSource() {
    return this.props.getModelValue("attributes[source]") ||
      this.props.getModelValue("attributes[sourceFileName]");
  }

  get ingestionSourceUrl() {
    return this.props.getModelValue("attributes[externalSourceUrl]");
  }

  get ingestionType() {
    return this.props.getModelValue("attributes[ingestionType]");
  }

  handleBackClick = (event) => {
    event.preventDefault();
    this.props.history.push(this.props.location.pathname, { stage: "type" });
  };

  render() {

    const ingestionType = this.ingestionType;

    /* eslint-disable max-len */
    return (
      <Form.FieldGroup {...this.props} >
        { ingestionType === "googledoc" ?
          <Form.TextInput
            label="URL"
            name="attributes[externalSourceUrl]"
            instructions="Manifold can ingest any publically avaiable Google doc by entering its URL."
          />
          : null}
        { ingestionType === "epub" ?
          <Form.Upload
            inlineStyle={{ width: "100%" }}
            style="landscape"
            name="attributes[source]"
            readFrom="attributes[sourceFileName]"
            instructions="Manifold supports both v2 and v3 epub files."
            label="Upload a file ending in .epub"
            accepts="epubs"
          />
          : null}
        { ingestionType === "word" ?
          <Form.Upload
            inlineStyle={{ width: "100%" }}
            style="landscape"
            name="attributes[source]"
            readFrom="attributes[sourceFileName]"
            instructions="To create a text from a word document, save the word document as HTML and create a single zip archive. Manifold will expect to see a top level directory in the archive ending in .fld"
            label="Zip source file"
            accepts="zips"
          />
          : null}
        { ingestionType === "markdown" ?
          <Form.Upload
            inlineStyle={{ width: "100%" }}
            style="landscape"
            name="attributes[source]"
            readFrom="attributes[sourceFileName]"
            instructions="Upload a single markdown file, or a zipped collection of markdown files with a book.json file in root directory"
            label="Markdown or .zip source file"
            accepts="zips"
          />
          : null}
        <div style={{ marginTop: 30 }} className="buttons-icon-horizontal">
          <button
            onClick={this.handleBackClick}
            className="button-icon-secondary dull"
          >
            <i className="manicon manicon-x small"></i>
            Back
          </button>
          <button
            type="submit"
            className="button-icon-secondary"
            disabled={!this.valid}
          >
            <i className="manicon manicon-x small"></i>
            Continue
          </button>
        </div>
      </Form.FieldGroup>
    );
  }
}