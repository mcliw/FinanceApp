import SQLite from 'react-native-sqlite-storage';

// Khởi tạo cơ sở dữ liệu
const database = SQLite.openDatabase(
  {
    name: 'ecommerce.db',
    location: 'default',
  },
  () => {},
  error => {
    console.error('Error opening database: ', error);
  }
);

// Tạo bảng
const createTables = () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS merchants (
      id INTEGER PRIMARY KEY,
      country_code INTEGER,
      merchant_name TEXT,
      "created at" TEXT,
      admin_id INTEGER,
      FOREIGN KEY (admin_id) REFERENCES users(id)
    )`,

    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT,
      created_at TIMESTAMP,
      country_code INTEGER,
      FOREIGN KEY (country_code) REFERENCES countries(code)
    )`,

    `CREATE TABLE IF NOT EXISTS countries (
      code INTEGER PRIMARY KEY,
      name TEXT,
      continent_name TEXT
    )`,

    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL UNIQUE,
      status TEXT,
      created_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`,

    `CREATE TABLE IF NOT EXISTS order_items (
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER DEFAULT 1,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`,

    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      merchant_id INTEGER NOT NULL,
      price INTEGER,
      status TEXT CHECK (status IN ('out_of_stock', 'in_stock', 'running_low')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (merchant_id) REFERENCES merchants(id),
      UNIQUE (id)
    )`,

    `CREATE TABLE IF NOT EXISTS product_tags (
      id INTEGER PRIMARY KEY,
      name TEXT
    )`,

    `CREATE TABLE IF NOT EXISTS merchant_periods (
      id INTEGER PRIMARY KEY,
      merchant_id INTEGER,
      country_code INTEGER,
      start_date DATETIME,
      end_date DATETIME,
      FOREIGN KEY (merchant_id, country_code) REFERENCES merchants(id, country_code)
    )`
  ];

  queries.forEach(query => {
    database.transaction(tx => {
      tx.executeSql(query, [], 
        () => console.log('Table created successfully'),
        (tx, error) => console.error('Error creating table: ', error)
      );
    });
  });
};

// Khởi động cơ sở dữ liệu và tạo bảng
const initializeDatabase = () => {
  createTables();
};

// Xuất các hàm khởi tạo
export default {
  initializeDatabase,
  database,
};
