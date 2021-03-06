import React from "react";
import renderer from "react-test-renderer";
import { ResourceCollectionGeneralContainer } from "../General";
import { wrapWithRouter } from "test/helpers/routing";
import { Provider } from "react-redux";
import build from "test/fixtures/build";

describe("Backend ResourceCollection General Container", () => {
  const store = build.store();
  const collection = build.entity.resourceCollection("1");

  const component = renderer.create(
    wrapWithRouter(
      <Provider store={store}>
        <ResourceCollectionGeneralContainer resourceCollection={collection} />
      </Provider>
    )
  );

  it("renders correctly", () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("doesn't render to null", () => {
    let tree = component.toJSON();
    expect(tree).not.toBe(null);
  });
});
