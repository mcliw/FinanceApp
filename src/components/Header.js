import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

const Header = ({ currentPage, onNavigate, onLogout }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const pages = [
    { name: 'Trang Chủ', value: 'Home' },
    { name: 'Bảng Số Liệu', value: 'DataTable' },
    { name: 'Biểu Đồ', value: 'Chart' },
    { name: 'Cài Đặt', value: 'Settings' },
  ];

  const handlePageSelect = (page) => {
    if (page !== currentPage) {
      onNavigate(page);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Ứng Dụng Quản Lý Tài Chính</Text>

      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Đăng Xuất</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn Trang</Text>
            {pages.map((page) => (
              currentPage !== page.value && (
                <TouchableOpacity
                  key={page.value}
                  onPress={() => handlePageSelect(page.value)}
                  style={styles.pageOption}
                >
                  <Text style={styles.pageText}>{page.name}</Text>
                </TouchableOpacity>
              )
            ))}
            <Button title="Đóng" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  menuButton: {
    padding: 10,
  },
  menuText: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  pageOption: {
    padding: 10,
    width: '100%',
  },
  pageText: {
    fontSize: 16,
  },
});

export default Header;
