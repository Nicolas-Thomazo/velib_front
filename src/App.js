// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Input, Table, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
const DICT_MAPPING = ["ID", "NAME", "IS_WORKING", "CAPACITY", "AVAILABLES_BIKES", "TIME", "COMMUNE"]

const baseUrl = "http://127.0.0.1:5000/"

export default function App() {
  // usestate for setting a javascript
  // object for storing and using data
  const [dataSource, setdata] = useState();
  const columns = [
    {
      title: 'COMMUNE',
      dataIndex: 'COMMUNE',
      key: '',
    },
    {
      title: 'AVAILABLES_BIKES',
      dataIndex: 'AVAILABLES_BIKES',
      key: '',
    },
    {
      title: 'CAPACITY',
      dataIndex: 'CAPACITY',
      key: '',
    },
    {
      title: 'TIME',
      dataIndex: 'TIME',
      key: '',
    },
  ];
  // "Nom communes équipées": "",
  // "Station en fonctionnement": "",
  // "Nombre total vélos disponibles": 0

  const getData = async (event) => {
    const url = baseUrl + "commune"
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "commune": event.target.value }),
    });
    const newres = await res.json()
    setdata(newres)
  };

  const uploadData = async () => {
    const url = baseUrl + "upload"
    const res = await fetch(url, {
      method: 'GET',
    });
    //const newres = await res.json()
    //setdata(newres)
  };
  const clearData = async () => {
    const url = baseUrl + "clear"
    const res = await fetch(url, {
      method: 'GET',
    });
  };

  // Using useEffect for single rendering
  // useEffect(() => {
  //   console.log("hello")
  // }, []);


  //(event) => uploadData(event.target.value)
  return (
    <div className="All">
      <div className="App">
        <Row>
          <header >
            <Row style={{ marginTop: "50px", fontSize: "40px" }}>
              <Col offset={15}>Application</Col>
            </Row>
            <Row style={{ marginTop: "50px" }}>
              <Col offset={2}>
                <Input placeholder="Enter commune" onPressEnter={getData} />
              </Col>
              <Col>
                <Button type="primary" onClick={uploadData}>Upload data</Button>
              </Col>
              <Col offset={2}>
                <Button type="primary" onClick={clearData}>Clear data</Button>
              </Col>
            </Row>
          </header>
        </Row>
        <Row style={{ marginTop: "50px" }}>
          {dataSource &&
            <Col offset={5}>
              <Table dataSource={dataSource} columns={columns} />;
            </Col>
          }
        </Row>

      </div>
    </div>
  );
}

{/* <Button type="primary" onClick={(event) => myfunc(event.target.value)}>Fetch velib</Button>
  <p>{data["Nom communes équipées"]}</p>
<p>{data["Station en fonctionnement"]}</p>
<p>{data["Nombre total vélos disponibles"]}</p> 
className="App-Content"
className="App-header"
*/}