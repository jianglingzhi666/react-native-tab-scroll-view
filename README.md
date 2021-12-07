
# react-native-tab-scroll-view

`ReactNative 跨平台实现TabView嵌套ScrollView滚动吸顶效果,采用react-native-tab-view+flatlist实现效果丝滑`

## 安装
`使用前需要先安装`[react-native-tab-view](https://github.com/satya164/react-native-tab-view#readme) `与` [react-native-pager-view](https://github.com/callstack/react-native-pager-view)
</br>
</br>
</br>
`npm install react-native-tab-scroll-view --save`


## Demo


## 开始
```
import React from 'react';
import {View,Text,} from 'react-native';
import {ScrollView, TabView, FlatList} from '../components/TabScrollView';

export default class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeIndex: 0,
      refresh: false,
    };
  }
  renderScene = (props: any) => {
    switch (props.route.key) {
      case '1':
        return (
          <ScrollView isActive={this.state.activeIndex == 0 ? true : false}>
            <View
              style={{
                width: '100%',
                height: 1000,
                backgroundColor: '#5a32ac',
              }}
            />
            <View
              style={{
                width: '100%',
                height: 1000,
                backgroundColor: 'yellow',
              }}
            />
          </ScrollView>
        );
      case '2':
        return (
          <FlatList
            style={{zIndex: 999}}
            isActive={this.state.activeIndex == 1 ? true : false}
            data={[1, 2, 3]}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: '100%',
                    height: 600,
                    backgroundColor: index % 2 == 0 ? '#f93776' : '#48a248',
                  }}
                />
              );
            }}
          />
        );
    }
  };

  // 渲染头部
  renderTabHeader = (props: any, position: any) => {
    const {
      navigationState: {index},
    } = props;
    return (
      <View style={{width: '100%', height: 300, backgroundColor: '#2b88f0'}}>
        <View
          style={{
            height: 100,
            width: '100%',
            marginTop: 200,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: index == 0 ? 'white' : '#000'}}>
              页面1
            </Text>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: index == 1 ? 'white' : '#000'}}>
              页面2
            </Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <TabView
          renderHeader={this.renderTabHeader}
          headerHeight={300}
          stopHeight={200}
          navigationState={{
            index: this.state.activeIndex,
            routes: [
              {title: '页面1', key: '1'},
              {title: '页面2', key: '2'},
            ],
          }}
          renderScene={this.renderScene}
          onIndexChange={index => {
            this.setState({
              activeIndex: index,
            });
          }}
        />
      </View>
    );
  }
}
