import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header'; // Đảm bảo đường dẫn đúng

const Home = ({ onNavigate, onLogout }) => {
  const [balance] = useState(0);
  const [date, setDate] = useState('');
  const [notificationContent, setNotificationContent] = useState('Đang cập nhật...');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Cập nhật ngày
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    setDate(formattedDate);

    // Cập nhật thông báo hàng ngày sau 22h
    const nextUpdate = new Date();
    nextUpdate.setHours(22, 0, 0, 0);
    if (today.getTime() > nextUpdate.getTime()) {
      nextUpdate.setDate(nextUpdate.getDate() + 1);
    }
    const timeToNextUpdate = nextUpdate.getTime() - today.getTime();
    const timer = setTimeout(() => {
      updateNotificationBanner();
      setInterval(updateNotificationBanner, 24 * 60 * 60 * 1000); // Cập nhật mỗi 24 giờ
    }, timeToNextUpdate);

    return () => clearTimeout(timer);
  }, []);

  const updateNotificationBanner = () => {
    const totalIncome = Math.floor(Math.random() * 1000);
    const totalExpense = Math.floor(Math.random() * 1000);
    setNotificationContent(`Ngày: ${date}\nTổng Thu: ${totalIncome} VND\nTổng Chi: ${totalExpense} VND`);
    setShowNotification(true);
  };

  const handleAddTransaction = () => {
    Alert.alert('Thêm giao dịch!');
  };

  const dismissNotification = () => {
    setShowNotification(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header onNavigate={onNavigate} onLogout={onLogout} />
      <View style={styles.header}>
        <Text style={styles.title}>Số Dư: <Text style={styles.balance}>{balance} VND</Text></Text>
        <Text style={styles.date}>Ngày: {date}</Text>
      </View>
      <Button title="Thêm Giao Dịch" onPress={handleAddTransaction} />

      <View style={styles.chartContainer}>
        <View style={styles.simpleChart}>
          <Text style={styles.chartText}>Biểu đồ thu chi sẽ ở đây.</Text>
        </View>
      </View>

      {showNotification && (
        <View style={styles.notificationBanner}>
          <Text style={styles.notificationTitle}>Thông Báo Tổng Thu và Tổng Chi</Text>
          <Text style={styles.notificationContent}>{notificationContent}</Text>
          <TouchableOpacity onPress={dismissNotification} style={styles.dismissButton}>
            <Text style={styles.dismissButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  balance: {
    color: 'green',
  },
  date: {
    fontSize: 16,
    color: 'gray',
  },
  chartContainer: {
    marginVertical: 20,
  },
  simpleChart: {
    height: 220,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  chartText: {
    fontSize: 16,
    color: 'gray',
  },
  notificationBanner: {
    backgroundColor: '#ffcccb',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationContent: {
    fontSize: 16,
  },
  dismissButton: {
    marginTop: 10,
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  dismissButtonText: {
    color: 'white',
  },
});

export default Home;
