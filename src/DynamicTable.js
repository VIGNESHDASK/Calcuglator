import React, { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import jsPDF from "jspdf";
import "jspdf-autotable";

const DynamicTable = () => {
  const [rows, setRows] = useState([
    { prize: 0, weightGram: 0, totalPrize: 0 }, // Initialize with zeros
  ]);
  const [grandTotal, setGrandTotal] = useState(0); 

  useEffect(() => {
    console.log(rows); // Log rows for debugging
    setGrandTotal(calculateGrandTotal()); // Calculate grandTotal on initial render
  }, [rows]);

  const handleAddRow = () => {
    setRows([...rows, { prize: 0, weightGram: 0, totalPrize: 0 }]);
  };

  const handleInputChange = (event, rowIndex, columnIndex) => {
    const updatedRows = [...rows];
    // Ensure numerical values (fix typo: `weightGram` instead of `weight`.)
    const parsedValue = parseFloat(event.target.value) || 0;
    

    // Update the appropriate value in the row object
    if (columnIndex === 'prize') {
      updatedRows[rowIndex].prize = parsedValue;
    } else if (columnIndex === 'weightGram') {
      updatedRows[rowIndex].weightGram = parsedValue;
    }

    // Calculate and update totalPrize based on updated values
    updatedRows[rowIndex].totalPrize = Math.ceil(updatedRows[rowIndex].prize * (updatedRows[rowIndex].weightGram/1000));

    setRows(updatedRows);
  };

  const handlePrint = () => {
    const doc = new jsPDF();

    // Table header
    doc.setFontSize(14);
    doc.text("Bill Estimation", 80, 10);

    // Table data
    const columns = ["Prize" , "Weight (gram)", "Total Prize"]; // Adjust column names as needed
    const columnWidths = [30 ,60, 40]; // Adjust column widths as needed
    doc.autoTable({
      columnStyles: { fontSize: 11 },
      head: [columns],
      body: rows.map((row) => [row.prize ,row.weightGram, row.totalPrize]),
      startY: 20,
      columnStyles: {
        0: { align: "left" },
        1: { align: "right" }, // Align 'Total Prize' column to the right
      },
      columnWidths: columnWidths,
    });

    // Grand total
    doc.setFontSize(12);
    doc.text(
      `Grand Total: ${grandTotal.toFixed(2)}`,
      80,
      doc.lastAutoTable.finalY + 10
    );

    doc.save("SingleItemsReport.pdf");
  };

  const calculateGrandTotal = () => {
    return rows.reduce((total, row) => total + row.totalPrize, 0);
  };

  const handleDeleteRow = (rowIndex) => {
    if (rows.length > 1) {
      const updatedRows = [...rows];
      updatedRows.splice(rowIndex, 1);
      setRows(updatedRows);
    } else {
      alert('Cannot delete the last row!');
    }
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Prize</th>
            <th>Weight (Gram)</th>
            <th>Total Prize</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <Form.Control
                  type="string" // Use 'number' for numerical input
                  value={row.prize}
                  onChange={(event) => handleInputChange(event, rowIndex, 'prize')} // Correct column index
                />
              </td>
              <td>
                <Form.Control
                  type="string"
                  value={row.weightGram}
                  onChange={(event) => handleInputChange(event, rowIndex, 'weightGram')}
                />
              </td>
              <td>
                <Form.Control
                  type="string" // Use 'number' for numerical input
                  value={row.totalPrize}
                  readOnly // Make 'totalPrize' read-only
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteRow(rowIndex)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Grand Total: {grandTotal}</h4>
      <Button onClick={handlePrint}>Print</Button>
      &nbsp; &nbsp;
      <Button onClick={handleAddRow}>Add Row</Button>
    </div>
  );
};

export default DynamicTable;
