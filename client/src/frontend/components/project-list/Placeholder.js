import React, { Component } from "react";
import { Link } from "react-router-dom";
import lh from "helpers/linkHandler";
import Utility from "global/components/utility";
import Authorize from "hoc/authorize";

const helpLink = "https://manifoldapp.org/docs/";

export default class ProjectListPlaceholder extends Component {
  static displayName = "ProjectList.Placeholder";

  adminMessage() {
    const adminLink = lh.link("backend");

    return (
      <div className="centered-message">
        {
          "But it’s easy to create and publish projects with Manifold. If you have backend access, "
        }
        <Link to={adminLink}>head to the backend</Link>
        {" and select "}
        <em>Add a New Project</em>
        {
          ". For more help, you can learn about creating and publishing Manifold Projects "
        }
        <a href={helpLink}>here</a>.
      </div>
    );
  }

  defaultMessage() {
    const adminLink = lh.link("backend");

    return (
      <div className="centered-message">
        {
          "But it’s easy to create and publish projects with Manifold. If you have project creation privileges, "
        }
        <Link to={adminLink}>login to the backend</Link>
        {
          " to get started. For more help, you can learn about creating and publishing Manifold Projects "
        }
        <a href={helpLink}>here</a>.
      </div>
    );
  }

  render() {
    return (
      <section className="bg-neutral05">
        <div className="container">
          <div className="project-list-placeholder">
            <header className="section-heading">
              <div className="main">
                <div className="body">
                  <h4 className="title">
                    {"Uh-oh. This Manifold Library is empty."}
                  </h4>
                </div>
              </div>
            </header>
            <Authorize entity="project" ability="create">
              {this.adminMessage()}
            </Authorize>
            <Authorize entity="project" ability="create" successBehavior="hide">
              {this.defaultMessage()}
            </Authorize>
            <Utility.IconComposer icon="BooksOnShelfColorUnique" />
            <div className="button">
              <Link
                to={lh.link("backendProjects")}
                className="button-icon-primary"
              >
                <span>{"Publish a Project Now"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
