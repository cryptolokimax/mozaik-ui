import {
  SET_DASHBOARDS,
  SET_CURRENT_DASHBOARD,
  DASHBOARDS_PLAY,
  DASHBOARDS_PAUSE,
} from "../actions/dashboardsActions";

export default function dashboards(
  state = {
    dashboards: [],
    current: (() => {
      const predefinedDashboard = parseInt(
        window.location.pathname.replace("/", ""),
        10
      );
      if (predefinedDashboard > 0 && predefinedDashboard <= 10) {
        return predefinedDashboard - 1;
      } else return 0;
    })(),
    isPlaying: false,
  },
  action
) {
  switch (action.type) {
    case SET_DASHBOARDS:
      return {
        ...state,
        dashboards: action.dashboards,
      };

    case SET_CURRENT_DASHBOARD:
      return {
        ...state,
        current: action.index,
      };

    case DASHBOARDS_PLAY:
      return {
        ...state,
        isPlaying: true,
      };

    case DASHBOARDS_PAUSE:
      return {
        ...state,
        isPlaying: false,
      };

    default:
      return state;
  }
}
