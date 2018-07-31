import { handleActions } from "redux-actions";

const initialState = {
  dashboardProjectsList: {
    filter: { order: "sort_title ASC" },
    page: 1
  }
};

const setDashboardProjectsListSnapshot = (state, action) => {
  const newState = Object.assign(
    {},
    state.dashboardProjectsList,
    action.payload
  );
  return Object.assign({}, state, { dashboardProjectsList: newState });
};

const resetDashboardProjectsList = state => {
  return Object.assign({}, state, {
    dashboardProjectsList: initialState.dashboardProjectsList
  });
};

export default handleActions(
  {
    SET_DASHBOARD_PROJECTS_LIST_SNAPSHOT: setDashboardProjectsListSnapshot,
    RESET_DASHBOARD_PROJECTS_LIST_SNAPSHOT: resetDashboardProjectsList
  },
  initialState
);
