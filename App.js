import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import DataTable from './src/screens/DataTable'; // Nhập thêm
import Chart from './src/screens/Chart'; // Nhập thêm
import Settings from './src/screens/Settings'; // Nhập thêm

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('Login');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('Home');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('Login');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'DataTable':
        return <DataTable onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'Chart':
        return <Chart onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'Settings':
        return <Settings onNavigate={handleNavigate} onLogout={handleLogout} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderCurrentPage()}
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
