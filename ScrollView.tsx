import React, {createRef} from 'react';
import {View, Animated, ScrollView, ScrollViewProps} from 'react-native';
import {intercept} from './service';

interface TabScrollViewProps
  extends Omit<ScrollViewProps, 'onScroll' | 'showsVerticalScrollIndicator'> {
  isActive: boolean;
  position?: Animated.Value;
  stopHeight?: number;
  headerHeight?: number;
}

export default class Fragment extends React.Component<TabScrollViewProps, any> {
  public scrollRef = createRef<ScrollView>();
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    const {position, stopHeight} = this.props;
    let fun = intercept((data: number) => {
      this.scrollTo(data);
    });
    stopHeight &&
      position !== undefined &&
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
    this.scrollRef.current?.scrollTo({x: 0, y, animated: false});
  };
  render() {
    const {children, position, headerHeight, ...other} = this.props;
    return (
      <Animated.ScrollView
        {...other}
        showsVerticalScrollIndicator={false}
        ref={this.scrollRef}
        onScroll={Animated.event(
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
        )}>
        <View style={{width: '100%', height: headerHeight}} />
        {children}
      </Animated.ScrollView>
    );
  }
}
