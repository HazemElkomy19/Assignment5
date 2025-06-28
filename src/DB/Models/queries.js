import client from "../db.connection.js";

export default async function runQueries() {
 
  await client.query(
    `UPDATE Products SET Price = 25.00 WHERE ProductName = 'Bread';`
  );
  console.log('Bread price updated');


  await client.query(
    `DELETE FROM Products WHERE ProductName = 'Eggs';`
  );
  console.log('Eggs deleted');

  
  const totalSold = await client.query(
    `SELECT p.ProductName, SUM(s.QuantitySold) AS TotalSold
     FROM Sales s
     JOIN Products p ON s.ProductID = p.ProductID
     GROUP BY p.ProductName;`
  );
  console.log('Total quantity sold per product:');
  console.table(totalSold.rows);

 
  await client.query(
    `ALTER TABLE Products ADD COLUMN IF NOT EXISTS Category TEXT;`
  );
  console.log('Category column added');

 
  await client.query(
    `ALTER TABLE Products DROP COLUMN IF EXISTS Category;`
  );
  console.log('Category column removed');

  
  await client.query(
    `ALTER TABLE Suppliers ALTER COLUMN ContactNumber TYPE VARCHAR(15);`
  );
  console.log('ContactNumber column type changed to VARCHAR(15)');

  
  const highestStock = await client.query(
    `SELECT * FROM Products ORDER BY StockQuantity DESC LIMIT 1;`
  );
  console.log('Product with highest stock:');
  console.table(highestStock.rows);

  
  const fSuppliers = await client.query(
    `SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%';`
  );
  console.log("Suppliers with names starting with 'F':");
  console.table(fSuppliers.rows);

 
  const neverSold = await client.query(
    `SELECT * FROM Products
     WHERE ProductID NOT IN (SELECT DISTINCT ProductID FROM Sales);`
  );
  console.log('Products never sold:');
  console.table(neverSold.rows);

  
  const salesWithNames = await client.query(
    `SELECT p.ProductName, s.SaleDate, s.QuantitySold
     FROM Sales s
     JOIN Products p ON s.ProductID = p.ProductID;`
  );
  console.log('Sales with product name and sale date:');
  console.table(salesWithNames.rows);

  await client.query(`
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'store_manager') THEN
      CREATE ROLE store_manager LOGIN PASSWORD 'your_secure_password';
    END IF;
  END
  $$;
  GRANT SELECT, INSERT, UPDATE ON Suppliers, Products, Sales TO store_manager;
`);
console.log('User "store_manager" created with SELECT, INSERT, UPDATE permissions');

  
  await client.query(
    `REVOKE UPDATE ON Suppliers, Products, Sales FROM store_manager;`
  );
  console.log('UPDATE permission revoked from "store_manager"');


  await client.query(
    `GRANT DELETE ON Sales TO store_manager;`
  );
  console.log('DELETE permission granted to "store_manager" on Sales');
}
