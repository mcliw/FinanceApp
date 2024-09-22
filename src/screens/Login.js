import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Xử lý đăng nhập tại đây
    console.log('Đăng nhập với tài khoản:', username);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tài khoản"
        value={username}
        onChangeText={setUsername}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        required
      />
      <Button title="Đăng Nhập" onPress={handleLogin} />
      <Text style={styles.registerText}>
        Chưa có tài khoản?{' '}
        <TouchableOpacity>
          <Text style={styles.link}>Đăng Ký</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 15,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Login;
