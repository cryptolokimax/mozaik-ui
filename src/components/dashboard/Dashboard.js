import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import WidgetWrapper from '../../containers/WidgetContainer'
import classes from './Dashboard.css'

export const DashboardPropType = PropTypes.shape({
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    widgets: PropTypes.arrayOf(
        PropTypes.shape({
            extension: PropTypes.string.isRequired,
            widget: PropTypes.string.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            columns: PropTypes.number.isRequired,
            rows: PropTypes.number.isRequired,
        })
    ).isRequired,
})

const widgetWillEnter = ({ data }) => {
    return {
        opacity: 0,
        x: 200 * (data.x + 1),
    }
}

const widgetWillLeave = () => ({
    opacity: spring(0, { stiffness: 120, damping: 15, precision: 0.1 }),
    x: spring(-60, { stiffness: 120, damping: 15, precision: 1 }),
})

const ignoreProps = [
    'x',
    'y',
    'top',
    'left',
    'columns',
    'rows',
    'width',
    'height',
]

export default class Dashboard extends Component {
    static propTypes = {
        dashboard: DashboardPropType.isRequired,
        dashboardIndex: PropTypes.number.isRequired,
        registry: PropTypes.shape({
            getComponent: PropTypes.func.isRequired,
        }).isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const {
            dashboard: { columns, rows, widgets: _widgets },
            dashboardIndex,
            registry,
        } = this.props

        const { theme } = this.context

        const widgets = _widgets.map(w => {
            return {
                ...w,
                key: `dashboard${dashboardIndex}.x${w.x}.y${w.y}`,
                width: `${w.columns / columns * 100}%`,
                height: `${w.rows / rows * 100}%`,
                left: `${w.x / columns * 100}%`,
                top: `${w.y / rows * 100}%`,
            }
        })

        return (
            <TransitionMotion
                willEnter={widgetWillEnter}
                willLeave={widgetWillLeave}
                styles={widgets.map(w => ({
                    key: w.key,
                    data: w,
                    style: {
                        opacity: spring(1, {
                            stiffness: 60,
                            damping: 10,
                            precision: 0.1,
                        }),
                        x: spring(0, {
                            stiffness: 60,
                            damping: 10,
                            precision: 1,
                        }),
                    },
                }))}
            >
                {styles =>
                    <div className={`dashboard ${classes.dashboard}`}>
                        {styles.map(({ key, data, style }) => {
                            return (
                                <div
                                    className={`widget__wrapper ${_.get(
                                        theme,
                                        'widget.wrapper',
                                        ''
                                    )}`}
                                    key={key}
                                    style={{
                                        transformOrigin: '0 50%',
                                        position: 'absolute',
                                        width: data.width,
                                        height: data.height,
                                        top: data.top,
                                        left: data.left,
                                        opacity: style.opacity,
                                        transform: `translate3d(${style.x}px,0,0)`,
                                    }}
                                >
                                    <WidgetWrapper
                                        {..._.omit(data, ignoreProps)}
                                        registry={registry}
                                    />
                                </div>
                            )
                        })}
                    </div>}
            </TransitionMotion>
        )
    }
}
