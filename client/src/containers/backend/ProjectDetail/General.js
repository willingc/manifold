import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Project } from "components/backend";
import { Form as FormContainer } from "containers/backend";
import { projectsAPI } from "api";

export default class ProjectPanelGeneral extends PureComponent {
  static displayName = "ProjectDetail.General";

  static propTypes = {
    project: PropTypes.object
  };

  render() {
    const project = this.props.project;

    return (
      <section>
        <FormContainer.Form
          model={this.props.project}
          name="backend-project-update"
          update={projectsAPI.update}
          create={projectsAPI.create}
          className="form-secondary"
        >
          <Form.Switch label="Draft Mode" name="attributes[draft]" />
          <Form.TextInput
            validation={["required"]}
            focusOnMount
            label="Title"
            name="attributes[title]"
            placeholder="Enter Project Title"
          />
          <Form.TextInput
            label="Subtitle"
            name="attributes[subtitle]"
            placeholder="Enter Project Subtitle"
          />
          <Form.Date
            label="Publication Date"
            name="attributes[publicationDate]"
          />
          <Form.Switch label="Featured" name="attributes[featured]" />
          <Form.MaskedTextInput
            label="Hashtag"
            name="attributes[hashtag]"
            mask="hashtag"
          />
          <Form.TextArea label="Description" name="attributes[description]" />
          <Project.Form.AvatarBuilder project={project} {...this.props} />
          <Form.Upload
            layout="portrait"
            label="Cover"
            accepts="images"
            readFrom="attributes[coverStyles][smallPortrait]"
            name="attributes[cover]"
            remove="attributes[removeCover]"
          />
          <Form.Upload
            layout="landscape"
            accepts="images"
            label="Hero Image"
            readFrom="attributes[heroStyles][mediumLandscape]"
            name="attributes[hero]"
            remove="attributes[removeHero]"
          />
          <Form.TextInput
            label="Purchase URL"
            name="attributes[purchaseUrl]"
            placeholder="Enter Purchase URL"
          />
          <Form.MaskedTextInput
            label="Purchase Price"
            name="attributes[purchasePriceMoney]"
            mask="currency"
          />
          <Form.TextInput
            label="Currency"
            name="attributes[purchasePriceCurrency]"
            placeholder="Enter Purchase Price Currency Code"
          />
          <Form.TextInput
            label="Twitter Username"
            name="attributes[twitterId]"
            placeholder="Enter Twitter username"
          />
          <Form.TextInput
            label="Instagram Username"
            name="attributes[instagramId]"
            placeholder="Enter Instagram username"
          />
          <Form.Save text="Save Project" />
        </FormContainer.Form>
      </section>
    );
  }
}
