/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TensorFlowJs from './tensorFlowJs';

AppRegistry.registerComponent(appName, () => TensorFlowJs);
