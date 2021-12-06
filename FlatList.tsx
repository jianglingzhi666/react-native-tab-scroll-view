import React, {createRef} from 'react';
import {
  View,
  ScrollView,
  FlatListProps,
  ListRenderItem,
  StyleProp,
  ViewStyle,
  Animated,
  FlatList,
} from 'react-native';
import {intercept} from './service';

interface TabFlatListProps
  extends Omit<
    FlatListProps<any>,
    'onScroll' | 'showsVerticalScrollIndicator' | 'refreshing'
  > {
  isActive: boolean;
  position?: Animated.Value;
  stopHeight?: number;
  headerHeight?: number;
}
export default class Flatlist extends React.Component<TabFlatListProps, any> {
  public flatListRef = createRef<FlatList>();
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    const {position, stopHeight} = this.props;
    let fun = intercept((data: number) => {
      this.scrollTo(data);
    });
    stopHeight &&
      position &&
      position.addListener((data: {value: number}) => {
        if (!this.props.isActive) {
          if (stopHeight < data.value) {
            fun(this.props.stopHeight);
          } else {
            fun(data.value);
          }
        }
      });
  }

  /**
   * 滚动
   */
  scrollTo = (y: number) => {
    this.flatListRef.current?.scrollToOffset({offset: y, animated: false});
  };
  render() {
    const {position, headerHeight, ...other} = this.props;

    return (
      <Animated.FlatList
        {...other}
        ListHeaderComponent={() => (
          <View style={{width: '100%', height: headerHeight}} />
        )}
        showsVerticalScrollIndicator={false}
        ref={this.flatListRef}
        onScroll={
          position
            ? Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: position,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )
            : () => {}
        }
      />
    );
  }
}
