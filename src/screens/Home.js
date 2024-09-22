import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const HomeScreen = () => {
  const [balance, setBalance] = useState(0);
  const [date, setDate] = useState('');
  const [notificationContent, setNotificationContent] = useState('Đang cập nhật...');
  const [showNotification, setShowNotification] = useState(false);
  const navigation = useNavigation();

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

  const handleLogout = () => {
    Alert.alert('Bạn đã đăng xuất!');
    navigation.navigate('Login');
  };

  const dismissNotification = () => {
    setShowNotification(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Số Dư: <Text style={styles.balance}>{balance} VND</Text></Text>
        <Text style={styles.date}>Ngày: {date}</Text>
      </View>
      <Button title="Thêm Giao Dịch" onPress={handleAddTransaction} />
      
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: [12, 19, 3, 5, 2, 3, 7],
              },
            ],
          }}
          width={Dimensions.get('window').width - 40} // from react-native
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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
      
      <Button title="Đăng Xuất" onPress={handleLogout} />
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

export default HomeScreen;
