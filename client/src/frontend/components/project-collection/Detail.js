import React, { Component } from "react";
import PropTypes from "prop-types";
import Filters from "./Filters";
import ProjectList from "frontend/components/project-list";
import IconComputed from "global/components/icon-computed";
import Utility from "global/components/utility";
import get from "lodash/get";

export default class ProjectCollectionDetail extends Component {
  static displayName = "ProjectCollectionDetail";

  static propTypes = {
    projectCollection: PropTypes.object,
    authentication: PropTypes.object,
    dispatch: PropTypes.func,
    pagination: PropTypes.object,
    paginationClickHandler: PropTypes.func,
    projects: PropTypes.array,
    filterChangeHandler: PropTypes.func,
    initialState: PropTypes.object
  };

  get description() {
    return this.props.projectCollection.attributes.descriptionFormatted;
  }

  render() {
    const projectCollection = this.props.projectCollection;
    if (!projectCollection) return null;

    const baseClass = "entity-section-wrapper";

    const iconFill =
      projectCollection.attributes.icon === "new-round"
        ? "#52e3ac"
        : "currentColor";

    return (
      <section key={projectCollection.id} className="bg-neutral05">
        <div className={`${baseClass} container`}>
          <div className={`${baseClass}__heading section-heading`}>
            <div className="main">
              <i className={"manicon"} aria-hidden="true">
                <IconComputed.ProjectCollection
                  icon={projectCollection.attributes.icon}
                  size={56}
                  fill={iconFill}
                />
              </i>
              <div className="body">
                <h4 className="title">{projectCollection.attributes.title}</h4>
              </div>
            </div>
          </div>
          <Filters
            filterChangeHandler={this.props.filterChangeHandler}
            initialState={this.props.initialState}
            additionalClasses={`${baseClass}__tools`}
          />
          <div className={`${baseClass}__details`}>
            {this.description && (
              <p
                className="description"
                dangerouslySetInnerHTML={{
                  __html: this.description
                }}
              />
            )}
            <Utility.EntityCount
              pagination={this.props.pagination}
              singularUnit="project"
              pluralUnit="projects"
              countOnly
            />
          </div>
          <ProjectList.Grid
            authenticated={this.props.authentication.authenticated}
            favorites={get(this.props.authentication, "currentUser.favorites")}
            projects={this.props.projects}
            dispatch={this.props.dispatch}
            paginationClickHandler={this.props.paginationClickHandler}
            pagination={this.props.pagination}
            additionalClass={baseClass}
          />
        </div>
      </section>
    );
  }
}
