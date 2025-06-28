import client from "../db.connection.js";

export default async function insertInitialData() {
  // Insert supplier
  await client.query(`
    INSERT INTO Suppliers (SupplierName, ContactNumber)
    VALUES ('FreshFoods', '01001234567')
    ON CONFLICT DO NOTHING;
  `);

  // Insert products
  await client.query(`
    INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
    VALUES
      ('Milk', 15.00, 50, 1),
      ('Bread', 10.00, 30, 1),
      ('Eggs', 20.00, 40, 1)
    ON CONFLICT DO NOTHING;
  `);

  // Insert sale
  await client.query(`
    INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
    VALUES (
      (SELECT ProductID FROM Products WHERE ProductName = 'Milk'),
      2, '2025-05-20'
    );
  `);

  console.log('Initial data inserted.');
}


