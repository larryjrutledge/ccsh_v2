import { AppRegistry, YellowBox } from 'react-native'
import Sentry from 'sentry-expo'

import store from './src/config/Store'
import App from 'src/App'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Require cycle:'
])

Sentry.enableInExpoDevelopment = true
Sentry.config(
  'https://d6ec75932544463a99fdf36c79958550@sentry.io/1383658'
).install()

AppRegistry.registerComponent('ChristChapelSH', () => App)

export default App
