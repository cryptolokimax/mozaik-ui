import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { injectGlobal } from "styled-components";

import Dashboard, { DashboardPropType } from "./dashboard/Dashboard";
import DashboardHeader from "./dashboard/DashboardHeader";
import DashboardTitle from "./dashboard/DashboardTitle";
import WidgetsRegistry from "./../WidgetsRegistry";
import Settings from "./settings/Settings";
import Notifications from "../containers/NotificationsContainer";
import typography from "../theming/typography";

injectGlobal`
html,
body {
    margin: 0;
    height: 100%;
    width:  100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

@media screen and (min-width: 1200px) {
    body {
        overflow: hidden;
    }
}


@media screen and (max-width: 1200px) {
    body {
        overflow: scroll !important;
    }
    .Dashboard__Title {
        top: 15px !important;
        height: 22px !important;
    }
}

*,
*:before,
*:after {
    box-sizing: border-box;
}

a {
    color: inherit;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}

img {
    max-width: 100%;
    max-height: 100%;
}

svg {
    display: block;
}
`;

const TitleWrapper = styled.div`
  flex-grow: 1;
  margin-right: 4vmin;
  padding-left: 1.9vmin;
  height: 0vmin;
  ${(props) => typography(props.theme, "display")};
`;

const RootDesktop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.root.background};
  color: ${(props) => props.theme.colors.text};
  ${(props) => props.theme.root.extend.trim()};
`;
const RootMobile = styled.div`
  width: 100%;
  background: ${(props) => props.theme.root.background};
  color: ${(props) => props.theme.colors.text};
  ${(props) => props.theme.root.extend.trim()};
`;

const getIsMobile = function () {
  if (window.innerWidth < 1200) {
    return true;
  } else {
    return false;
  }
};

export default class Mozaik extends Component {
  static propTypes = {
    fetchConfiguration: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    dashboards: PropTypes.arrayOf(DashboardPropType).isRequired,
    currentDashboard: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    configuration: PropTypes.shape({}),
    themes: PropTypes.object.isRequired,
    currentTheme: PropTypes.string.isRequired,
    setTheme: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.toggleSettings = this.toggleSettings.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = { settingsOpened: false };
  }

  onKeyDown({ code }) {
    switch (code) {
      case "ArrowRight": {
        this.props.next();
        this.props.play();
        break;
      }
      case "ArrowLeft": {
        this.props.previous();
        this.props.play();
        break;
      }
      case "Space":
        return this.props.isPlaying ? this.props.pause() : this.props.play();
    }
  }

  toggleSettings() {
    const { settingsOpened } = this.state;
    this.setState({ settingsOpened: !settingsOpened });
  }

  componentDidMount() {
    const { fetchConfiguration } = this.props;
    fetchConfiguration();

    document.addEventListener("keydown", this.onKeyDown);
  }

  componentDidUpdate() {
    window.onresize = function () {
      this.forceUpdate();
    }.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  render() {
    const isMobile = getIsMobile();

    const {
      isLoading,
      dashboards,
      currentDashboard,
      isPlaying,
      play,
      pause,
      previous,
      next,
      themes,
      currentTheme,
      setTheme,
    } = this.props;

    const { settingsOpened } = this.state;

    let content = <div>loading</div>;
    if (!isLoading && dashboards.length > 0) {
      console.log(dashboards);
      content = isMobile ? (
        <div>
          {dashboards.map((dshbrd, di) => [
            <TitleWrapper key={`${di}-title`}>
              <DashboardTitle
                currentDashboardIndex={di}
                title={dashboards[di].title}
              />
            </TitleWrapper>,
            <Dashboard
              key={di}
              dashboard={dashboards[di]}
              dashboardIndex={di}
              registry={WidgetsRegistry}
              isMobile={isMobile}
            />,
          ])}
        </div>
      ) : (
        <Dashboard
          dashboard={dashboards[currentDashboard]}
          dashboardIndex={currentDashboard}
          registry={WidgetsRegistry}
          isMobile={isMobile}
        />
      );
    }

    const Root = isMobile ? RootMobile : RootDesktop;

    return (
      <Root>
        <DashboardHeader
          settingsOpened={settingsOpened}
          toggleSettings={this.toggleSettings}
          dashboards={dashboards}
          currentDashboardIndex={currentDashboard}
          isPlaying={isPlaying}
          play={play}
          pause={pause}
          previous={previous}
          next={next}
          isMobile={isMobile}
        />
        {content}
        <Settings
          themes={themes}
          currentTheme={currentTheme}
          setTheme={setTheme}
          opened={settingsOpened}
          close={this.toggleSettings}
        />
        <Notifications />
      </Root>
    );
  }
}
