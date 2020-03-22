import React, { useState } from 'react';
import { Table } from 'antd';
import XLSX from 'xlsx';
import './App.css';
import 'antd/dist/antd.css'

function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const columns = [
    {
      title: '型号',
      dataIndex: 'xinghao',
      key: 'xinghao',
    },
    {
      title: '线长',
      dataIndex: 'xianchang',
      key: 'xianchang',
    },
    {
      title: '电机规格',
      dataIndex: 'dianjiguige',
      key: 'dianjiguige',
    },
    {
      title: '功率',
      dataIndex: 'gonglv',
      key: 'gonglv',
    },
    {
      title: '档位',
      dataIndex: 'dangwei',
      key: 'dangwei',
    },
    {
      title: '机身规格',
      dataIndex: 'jishenguige',
      key: 'jishenguige',
    },
    {
      title: '配件',
      dataIndex: 'peijian',
      key: 'peijian',
    },
    {
      title: '卖点',
      dataIndex: 'maidian',
      key: 'maidian',
    },
  ];

  function handleFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const buf = e.target.result;
      const wb = XLSX.read(buf, { type: 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const origData = XLSX.utils.sheet_to_json(ws, {header:1});
      const data = origData.map(d => {
        return {
          xinghao: d[0],
          xianchang: d[1],
          dianjiguige: d[2],
          gonglv: d[3],
          dangwei: d[4],
          jishenguige: d[5],
          peijian: d[6],
          maidian: d[7],
        };
      });
      setData(data);
      setResult(data);
    }
    reader.readAsArrayBuffer(file);
  }

  function handleQueryChange(e) {
    const query = e.target.value;
    setQuery(e.target.value);
    if (!query) {
      setResult(data);
      return;
    }
    if (query && data) {
      let results = [];
      data.forEach(d => {
        if (d.xinghao && d.xinghao.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
          results.push(d);
        }
      });
      setResult(results);
    }
  }

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} accept=".xls,.xlsx,.csv" />
      <input placeholder="请输入查询条件" onChange={handleQueryChange} value={query} />
      <h2>查询结果：</h2>
      <Table columns={columns} dataSource={result} pagination={false} />
    </div>
  );
}

export default App;
