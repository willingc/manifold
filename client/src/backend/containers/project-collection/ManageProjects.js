import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import connectAndFetch from "utils/connectAndFetch";
import ProjectCollection from "backend/components/project-collection";
import { select, meta } from "utils/entityUtils";
import { projectsAPI, projectCollectionsAPI, requests } from "api";
import { entityStoreActions } from "actions";
import lh from "helpers/linkHandler";
import Navigation from "backend/components/navigation";
import EntitiesList, {
  Search,
  ProjectRow
} from "backend/components/list/EntitiesList";
import withFilteredLists, { projectFilters } from "hoc/with-filtered-lists";

const { request } = entityStoreActions;
const perPage = 12;

class ProjectCollectionManageProjectsImplementation extends PureComponent {
  static mapStateToProps = state => {
    return {
      projects: select(requests.beProjects, state.entityStore),
      projectsMeta: meta(requests.beProjects, state.entityStore)
    };
  };

  static displayName = "ProjectCollection.ManageProjects";

  static propTypes = {
    projectCollection: PropTypes.object.isRequired,
    projects: PropTypes.array,
    projectsMeta: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object,
    entitiesListSearchProps: PropTypes.func.isRequired,
    entitiesListSearchParams: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.fetchProjects();
  }

  componentDidUpdate(prevProps) {
    if (this.filtersChanged(prevProps)) return this.fetchProjects();
  }

  get filters() {
    return this.props.entitiesListSearchParams.projects || {};
  }

  filtersChanged(prevProps) {
    return (
      prevProps.entitiesListSearchParams !== this.props.entitiesListSearchParams
    );
  }

  projectsForProjectCollection(projectCollection) {
    return projectCollection.relationships.collectionProjects.map(
      cp => cp.relationships.project
    );
  }

  fetchProjects(eventIgnored = null, page = 1) {
    const pagination = { number: page, size: perPage };
    const action = request(
      projectsAPI.index(this.filters, pagination),
      requests.beProjects
    );
    this.props.dispatch(action);
  }

  updateHandlerCreator = page => {
    return event => {
      this.fetchProjects(event, page);
    };
  };

  updateProjects = projects => {
    const adjustedProjects = projects.map(project => {
      return { id: project.id, type: "projects" };
    });
    const projectCollection = {
      id: this.props.projectCollection.id,
      type: "projectCollections",
      relationships: { projects: { data: adjustedProjects } }
    };

    const call = projectCollectionsAPI.update(
      projectCollection.id,
      projectCollection
    );
    const projectCollectionRequest = request(
      call,
      requests.beProjectCollectionUpdate
    );
    this.props.dispatch(projectCollectionRequest);
  };

  handleProjectAdd = project => {
    const projects = this.projectsForProjectCollection(
      this.props.projectCollection
    );
    projects.push({ id: project.id });

    return this.updateProjects(projects);
  };

  handleProjectRemove = project => {
    const projects = this.projectsForProjectCollection(
      this.props.projectCollection
    );
    const adjusted = projects.filter(p => p.id !== project.id);

    return this.updateProjects(adjusted);
  };

  projectCover = props => {
    const entity = props.entity;
    if (!entity) return null;

    return (
      <ProjectRow
        entity={entity}
        listStyle="grid"
        figure={
          <ProjectCollection.ProjectCover
            removeHandler={this.handleProjectRemove}
            addHandler={this.handleProjectAdd}
            {...props}
          />
        }
      />
    );
  };

  handleClose = () => {
    const url = lh.link(
      "backendProjectCollection",
      this.props.projectCollection.id
    );
    return this.props.history.push(url);
  };

  renderProjectCount(projectCollection, projectsMeta) {
    const added = projectCollection.attributes.projectsCount || 0;
    const total = projectsMeta.pagination.totalCount || 0;

    return (
      <p className="list-total">
        You have added <span>{added}</span> of <span>{total}</span> available
        projects
      </p>
    );
  }

  render() {
    if (!this.props.projectsMeta) return null;

    return (
      <React.Fragment>
        <Navigation.DrawerHeader
          icon="BECollectionManual64"
          title={this.props.projectCollection.attributes.title}
        >
          <p className="instructions">
            Select which projects should be included in this collection. Click
            the plus sign to add a project to the collection. Click the
            checkmark to remove a project.
          </p>
        </Navigation.DrawerHeader>

        <EntitiesList
          entities={this.props.projects}
          listStyle="grid"
          entityComponent={this.projectCover}
          entityComponentProps={{
            projectCollection: this.props.projectCollection,
            addable: true
          }}
          pagination={this.props.projectsMeta.pagination}
          showCount={this.renderProjectCount(
            this.props.projectCollection,
            this.props.projectsMeta
          )}
          callbacks={{
            onPageClick: this.updateHandlerCreator
          }}
          search={
            <Search {...this.props.entitiesListSearchProps("projects")} />
          }
        />

        <div className="actions">
          <button className="button-icon-secondary" onClick={this.handleClose}>
            <span>Close</span>
            <i className="manicon manicon-x" />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export const ProjectCollectionManageProjects = withFilteredLists(
  ProjectCollectionManageProjectsImplementation,
  {
    projects: projectFilters()
  }
);
export default connectAndFetch(ProjectCollectionManageProjects);
