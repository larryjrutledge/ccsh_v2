import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'

import * as Indicators from 'src/components/Indicators'

class BibleTabScreen extends Component {
  // render() {
  //   return (
  //     <SafeAreaView style={{ flex: 1 }}>
  //       <View
  //         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  //       >
  //         <Text>Bible Tab Screen</Text>
  //         <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
  //           <Text>Open Drawer</Text>
  //         </TouchableOpacity>
  //         <View style={{ flex: 1 }}>
  //           <Indicators.BarIndicator color="blue" count={5} size={50} />
  //         </View>
  //       </View>
  //     </SafeAreaView>
  //   )

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Indicators.BallIndicator color="white" animationDuration={800} />
          </View>

          <View style={{ flex: 1 }}>
            <Indicators.PulseIndicator color="white" />
          </View>

          <View style={{ flex: 1 }}>
            <Indicators.SkypeIndicator color="white" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Indicators.WaveIndicator color="white" />
          </View>

          <View style={{ flex: 1 }}>
            <Indicators.WaveIndicator color="white" waveMode="outline" />
          </View>

          <View style={{ flex: 1 }}>
            <Indicators.WaveIndicator
              color="white"
              count={2}
              waveFactor={0.4}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Indicators.UIActivityIndicator color="white" />
          </View>

          <View style={{ flex: 1 }}>
            <Indicators.MaterialIndicator color="white" />
          </View>

          <View style={{ flex: 1 }}>
            <Indicators.PacmanIndicator color="white" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Indicators.BarIndicator color="white" count={5} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Indicators.DotIndicator
              count={3}
              color="white"
              animationDuration={800}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Indicators.DotIndicator
              style={styles.reverse}
              count={3}
              color="white"
              animationDuration={800}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#01579B',
    padding: 20
  },

  row: {
    flex: 1,
    flexDirection: 'row'
  },

  reverse: {
    transform: [
      {
        rotate: '180deg'
      }
    ]
  }
}

export default BibleTabScreen
