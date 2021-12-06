import React, {createRef} from 'react';
import {View, Animated} from 'react-native';
import {
  TabView as RNTabView,
  SceneRendererProps,
  TabViewProps,
  NavigationState,
} from 'react-native-tab-view';

type MyTabViewProps = Omit<TabViewProps<any>, 'lazy' | 'renderTabBar'> & {
  headerHeight: number;
  stopHeight: number;
  renderHeader?: (
    props: SceneRendererProps & {navigationState: NavigationState<any>},
    position: Animated.Value,
  ) => React.ReactElement;
  renderTabBar?: (
    props: SceneRendererProps & {navigationState: NavigationState<any>},
    position: Animated.Value,
  ) => React.ReactElement;
};
export default class TabView extends React.Component<MyTabViewProps, any> {
  private scollViewTop: Animated.Value = new Animated.Value(0);

  render() {
    const {renderScene, renderHeader, renderTabBar, headerHeight, stopHeight} =
      this.props;

    const positionY = this.scollViewTop.interpolate({
      inputRange: [0, stopHeight, stopHeight + 1],
      outputRange: [0, -stopHeight, -stopHeight],
    });
    return (
      <View style={{flex: 1, position: 'relative'}}>
        <RNTabView
          {...this.props}
          lazy={false}
          renderTabBar={props => {
            if (renderHeader) {
              return (
                <Animated.View
                  style={{
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    backgroundColor: 'yellow',
                    transform: [{translateY: positionY}],
                  }}>
                  {renderHeader(props, this.scollViewTop)}
                </Animated.View>
              );
            }
            if (renderTabBar) {
              renderTabBar(props, this.scollViewTop);
            }
            return null;
          }}
          renderScene={props => {
            var view = renderScene(props);
            return React.cloneElement(view, {
              position: this.scollViewTop,
              headerHeight,
              stopHeight,
            });
          }}
        />
      </View>
    );
  }
}
