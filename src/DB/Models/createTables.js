import client from "../db.connection.js";

export default async function createTables() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS Suppliers (
      SupplierID SERIAL PRIMARY KEY,
      SupplierName TEXT,
      ContactNumber TEXT
    );

    CREATE TABLE IF NOT EXISTS Products (
      ProductID SERIAL PRIMARY KEY,
      ProductName TEXT NOT NULL,
      Price DECIMAL,
      StockQuantity INT,
      SupplierID INT REFERENCES Suppliers(SupplierID)
    );

    CREATE TABLE IF NOT EXISTS Sales (
      SaleID SERIAL PRIMARY KEY,
      ProductID INT REFERENCES Products(ProductID),
      QuantitySold INT,
      SaleDate DATE
    );
  `);
  console.log('Tables created.');
}


