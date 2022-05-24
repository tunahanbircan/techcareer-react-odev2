import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { suppliers } from "./data/suppliers";


function SupplierTable() {

  const [supplierList, setSupplierList] = useState(suppliers);

  const removeAll = () => {
    setSupplierList([])
  }

  const removeItem = (id) => {
    let newSupplierList = supplierList.filter(item => item.id !== id )
    setSupplierList(newSupplierList)
  }

  const searchSuppliers = (data) => {
    let searchData = data.toLowerCase().trim();
    let newSuppliers = suppliers.filter(q => q.companyName.toLowerCase().includes(searchData));
    setSupplierList(newSuppliers);
}


const orderBy = () => {
    let sortSuppliers = supplierList.sort((a, b) => {
        let fa = a.companyName.toLowerCase(),
            fb = b.companyName.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    setSupplierList([...sortSuppliers])
}

const orderByDesc = () => {
    let sortSuppliers = supplierList.sort((a, b) => {
        let fa = a.companyName.toLowerCase(),
            fb = b.companyName.toLowerCase();

        if (fb < fa) {
            return -1;
        }
        if (fb > fa) {
            return 1;
        }
        return 0;
    });
    setSupplierList([...sortSuppliers])
}

const loadData = () => {
    setSupplierList(suppliers)
}

  
  return (<>

        <div class="d-flex justify-content-between ">
          <div>
            <input type='text' onChange={(e) => searchSuppliers(e.target.value)} placeholder="Search by name..." />
            <Button variant="primary" onClick={() => searchSuppliers()}>Search</Button>
          </div>
          <div>
            <Button variant="secondary" onClick={() => orderBy()}>Order By</Button>
            <Button variant="dark" onClick={() => orderByDesc()}>Order By Desc</Button>
          </div>
          <div>
            <Button variant="outline-danger" onClick={() => removeAll()}>Remove All</Button>
            <Button variant="outline-success" onClick={() => loadData()}>Load Data</Button>
          </div>
        </div>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th> Id </th>
              <th> Company Name </th>
              <th> Contact Name </th>
              <th> Contact Title </th>
              <th> Country </th>
              <th> Phone </th>
            </tr>
          </thead>

        {
          supplierList && supplierList.map((item, key) => {
            return <tbody>
                <tr key = {item.id}>
                  <th> {item.id} </th>
                  <td> {item.companyName} </td>
                  <td> {item.contactName} </td>
                  <td> {item.contactTitle} </td>
                  <td> {item.address.city}</td>
                  <td> {item.address.phone} </td>
                  <td> <Button variant="outline-primary" onClick={() => removeItem(item.id)}>Remove</Button></td>
                </tr>
              </tbody>
          })
        }
      </Table>    
    </>)
  }

export default SupplierTable;