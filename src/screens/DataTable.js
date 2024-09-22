import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import Header from '../components/Header';
import Database from '../database/Database';

const DataTable = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Database.initializeDatabase();
    fetchData();
  }, []);

  const fetchData = () => {
    Database.database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM orders', // Hoặc bảng dữ liệu bạn cần
        [],
        (tx, results) => {
          const items = [];
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i));
          }
          setData(items);
        },
        error => {
          console.error('Error fetching data: ', error);
        }
      );
    });
  };

  const handleDelete = (id) => {
    Alert.alert('Xóa Giao Dịch', 'Bạn có chắc chắn muốn xóa giao dịch này?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Xóa',
        onPress: () => {
          Database.database.transaction(tx => {
            tx.executeSql(
              'DELETE FROM orders WHERE id = ?',
              [id],
              () => {
                fetchData();
                Alert.alert('Thành công', 'Giao dịch đã được xóa!');
              },
              error => {
                console.error('Error deleting data: ', error);
              }
            );
          });
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.note}</Text>
      <Button title="Xóa" onPress={() => handleDelete(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'left',
  },
});

export default DataTable;
