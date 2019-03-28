import React from "react";
import { build, storiesOf } from "helpers/storybook/exports";
import EntitiesList, {
  Button,
  Search
} from "backend/components/list/EntitiesList";
import UserListItem from "backend/components/user/EntityListItem";
import MakerListItem from "backend/components/maker/EntityListItem";
import FeatureListItem from "backend/components/feature/EntityListItem";
import ProjectListItem from "backend/components/project/EntityListItem";
import TwitterQueryListItem from "backend/components/twitter-query/EntityListItem";
import EventListItem from "backend/components/event/EntityListItem";
import PageListItem from "backend/components/page/EntityListItem";
import SubjectListItem from "backend/components/subject/EntityListItem";
import PermissionListItem from "backend/components/permission/EntityListItem";
import ResourceCollectionListItem from "backend/components/resource-collection/EntityListItem";
import ResourceListItem from "backend/components/resource/EntityListItem";
import LogListItem from "backend/components/log/EntityListItem";
import { EntityRow } from "backend/components/list/EntitiesList";

const users = build.arrayOf.users(8);
const makers = build.arrayOf.makers(8);
const projects = build.arrayOf.projects(6);
const features = build.arrayOf.type("features", 6);
const pages = build.arrayOf.type("pages", 6);
const events = build.arrayOf.type("events", 6);
const resourceCollections = build.arrayOf.resourceCollections(6);
const resources = build.arrayOf.resources(6);
const twitterQueries = build.arrayOf.type("twitterQueries", 6);
const subjects = build.arrayOf.type("subjects", 6);
const permissions = build.arrayOf.permissions(6);
const versions = build.arrayOf.type("versions", 6);

const pagination = {
  perPage: 20,
  currentPage: 3,
  nextPage: 2,
  prevPage: 0,
  totalPages: 10,
  totalCount: 32
};
const fourFilters = [
  {
    label: "Published State",
    key: "draft",
    options: [
      {
        label: "Draft Projects",
        value: true
      },
      {
        label: "Published Projects",
        value: false
      }
    ]
  },
  {
    label: "Category",
    key: "category",
    options: [
      {
        label: "Movies",
        value: "movies"
      },
      {
        label: "Books",
        value: "books"
      }
    ]
  },
  {
    label: "Age",
    key: "age",
    options: [
      {
        label: "> 6 months",
        value: "more"
      },
      {
        label: "< 6 months",
        value: "less"
      }
    ]
  },
  {
    label: "Glorp",
    key: "glorp",
    options: [
      {
        label: "Bananas",
        value: "bananas"
      },
      {
        label: "Peaches",
        value: "peaches"
      }
    ]
  }
];
const threeFilters = fourFilters.slice(0);
threeFilters.pop();
const twoFilters = threeFilters.slice(0);
twoFilters.pop();
const oneFilter = twoFilters.slice(0);
oneFilter.pop();

const sortOptions = [
  {
    label: "Title",
    value: "sort_title"
  }
];

const fakeHandler = () => {};
const callbacks = {
  onPageClick: fakeHandler,
  onSearchChange: fakeHandler
};

storiesOf("Backend/List/Entities", module)
  .add("Users", () => {
    return (
      <EntitiesList
        title={"A List of Users"}
        entities={users}
        entityComponent={UserListItem}
        showCount
        unit="resource"
        pagination={pagination}
        callbacks={callbacks}
        buttons={[<Button path="/foo" text="Add a New User" type="add" />]}
        search={
          <Search
            filters={threeFilters}
            sortOptions={sortOptions}
            onChange={callbacks.onSearchChange}
          />
        }
      />
    );
  })

  .add("TwitterQueries", () => {
    return (
      <EntitiesList
        title={"Twitter Queries"}
        titleIcon={"activityTweet64"}
        titleStyle={"section"}
        instructions={
          "Manifold will periodically fetch tweets according to the queries specified below."
        }
        entities={twitterQueries}
        showCountInTitle
        pagination={pagination}
        callbacks={callbacks}
        buttons={[<Button path="/foo" text="Add New Query" type="add" />]}
        entityComponent={TwitterQueryListItem}
        search={
          <Search
            filters={threeFilters}
            sortOptions={sortOptions}
            onChange={callbacks.onSearchChange}
          />
        }
      />
    );
  })

  .add("Subjects", () => {
    return (
      <EntitiesList
        title={"Project Subjects"}
        titleStyle="bar"
        entities={subjects}
        entityComponent={SubjectListItem}
        pagination={pagination}
        callbacks={callbacks}
        search={
          <Search filters={twoFilters} onChange={callbacks.onSearchChange} />
        }
        buttons={[<Button path="/foo" text="Add New Subject" type="add" />]}
      />
    );
  })

  .add("Res. Collections", () => {
    return (
      <EntitiesList
        title={"Resource Collections"}
        titleIcon="resourceCollection64"
        entities={resourceCollections}
        entityComponent={ResourceCollectionListItem}
      />
    );
  })

  .add("Resources", () => {
    return (
      <EntitiesList
        title={"Resources"}
        titleIcon="resources64"
        entities={resources}
        pagination={pagination}
        callbacks={callbacks}
        showCount
        unit="resource"
        entityComponent={ResourceListItem}
        buttons={[
          <Button path="/foo" text="Add New Resource" type="add" />,
          <Button path="/foo" text="Bulk Import Resources" icon="resource24" />
        ]}
      />
    );
  })

  .add("Projects", () => {
    return (
      <EntitiesList
        title={"Projects"}
        titleIcon="BEProject64"
        entities={projects}
        entityComponent={ProjectListItem}
        pagination={pagination}
        showCount
        showCountInTitle
        unit={{
          singular: "project",
          plural: "projects"
        }}
        search={
          <Search
            filters={threeFilters}
            sortOptions={sortOptions}
            onChange={callbacks.onSearchChange}
          />
        }
        buttons={[
          <Button path="/foo" text="Add New Project" type="add" />,
          <Button path="/foo" text="Bulk Import Projects" icon="resource24" />
        ]}
        callbacks={callbacks}
      />
    );
  })

  .add("Projects Grid", () => {
    return (
      <EntitiesList
        title="Projects"
        titleIcon="BEProject64"
        titleStyle="bar"
        listStyle="grid"
        entities={projects}
        entityComponent={ProjectListItem}
        pagination={pagination}
        paginationStyle="compact"
        showCount
        showCountInTitle
        unit="Project"
        callbacks={callbacks}
        buttons={[
          <Button path="/foo" text="Add New Project" type="add" />,
          <Button path="/foo" text="Bulk Import Projects" icon="resource24" />
        ]}
      />
    );
  })

  .add("Permissions", () => {
    return (
      <EntitiesList
        title={"Permissions"}
        entities={permissions}
        entityComponent={PermissionListItem}
        entityComponentProps={{
          linkName: "backendProjectPermission"
        }}
      />
    );
  })

  .add("Pages", () => {
    return (
      <EntitiesList
        title={"Pages"}
        titleIcon="resourceDocument64"
        entities={pages}
        entityComponent={PageListItem}
        search={
          <Search
            filters={threeFilters}
            sortOptions={sortOptions}
            onChange={callbacks.onSearchChange}
          />
        }
      />
    );
  })

  .add("Makers", () => {
    return (
      <EntitiesList
        title={"Makers"}
        titleIcon="avatar64"
        entities={makers}
        entityComponent={MakerListItem}
      />
    );
  })

  .add("Log", () => {
    return (
      <EntitiesList
        title={"Log"}
        titleIcon="BEActivity64"
        entities={versions}
        entityComponent={LogListItem}
      />
    );
  })

  .add("Features", () => {
    return (
      <EntitiesList
        title={"Features"}
        titleStyle="bar"
        entities={features}
        entityComponent={FeatureListItem}
      />
    );
  })

  .add("Activity", () => {
    return (
      <EntitiesList
        title={"Activity"}
        titleIcon={"BEActivity64"}
        listStyle="tiles"
        entities={events}
        entityComponent={EventListItem}
      />
    );
  })

  /* eslint-disable no-console */
  .add("Custom Row", () => {
    return (
      <EntitiesList
        instructions={"This list generates rows using an arrow function."}
        title={"A Custom List"}
        entities={users}
        entityComponent={props => {
          const { entity } = props;
          return (
            <EntityRow
              onRowClick={() => {
                console.log("clicked!");
              }}
              title={entity.attributes.fullName}
              label={entity.attributes.role}
            />
          );
        }}
      />
    );
  });