import { AppRegistry } from 'react-native';
import App from './App'; // Import App component
import { name as appName } from './app.json'; // Tên ứng dụng từ file app.json

AppRegistry.registerComponent(appName, () => App);
