import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Login from './src/screens/Login'; // Đảm bảo đường dẫn đúng

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Login />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default App;
