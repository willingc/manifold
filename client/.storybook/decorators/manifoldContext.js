import { makeDecorator } from '@storybook/addons';
import Wrappers from "../wrappers";
import React from "react";
import Provider from "react-redux/es/components/Provider";
import build from "test/fixtures/build";
import storyRouter from "storybook-react-router";
import startsWith from "lodash/startsWith";

const store = build.store();
const routeDecorator = storyRouter();

export default makeDecorator({
  name: 'withManifoldContext',
  parameterName: 'manifoldContext',
  wrapper: (storyFn, context, { parameters }) => {

    const wrapped = () => {
      return storyFn(
        {
          dispatch: store.dispatch
        }
      );
    };

    const wrap = (child) => {
      if (startsWith(context.kind, "Backend")) {
        return (
          <Wrappers.Backend>
            {child}
          </Wrappers.Backend>
        )
      }
      if (startsWith(context.kind, "Frontend") || startsWith(context.kind, "Global")) {
        return (
          <Wrappers.Frontend>
            {child}
          </Wrappers.Frontend>
        )
      }
      return child;
    };

    return wrap(
      <Provider store={store}>
        {routeDecorator(wrapped)}
      </Provider>
    );
  }
});

