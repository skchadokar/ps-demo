import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import axios from "axios";


class Home extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = { 
      oldMac:[],
      devicesColdef: [
        {headerName: "Scanner", field: "scannerMacName", suppressSizeToFit: false},//cellRendererFramework: this.updateScannerRenderer},
        {headerName: "BLE(Assets)", field: "bleUUIDName", suppressSizeToFit: false},
        {headerName: "Time (DD-MM-YYY HH:MM:SS) ", field: "timeStamp", suppressSizeToFit: false},
        {headerName: "Action",width: 60, cellRendererFramework: this.updateDevicesRenderer,suppressSizeToFit: false}
        ],
        assetsColdef: [
          {headerName: "BLE(Assets)",width: 60, field: "bleUUIDName", suppressSizeToFit: false},
          {headerName: "Scanner", field: "scannerMacName", suppressSizeToFit: false}
       ],
        devices:[],
        assets:[],
       
    };
   
   // this.updateScannerRenderer = this.updateScannerRenderer.bind(this);
    this.updateDevicesRenderer = this.updateDevicesRenderer.bind(this);
    this.updateDevicesHandler = this.updateDevicesHandler.bind(this);
    this.getAllDevicesHandler = this.getAllDevicesHandler.bind(this);
  }
  
  componentDidMount() {
    this.getAllDevicesHandler();
    setInterval(this.getAllDevicesHandler, 5000);
    //window.location.reload();
   }
  
   updateDevicesRenderer=(params)=>{ 
    // alert(params.data.del);
   return (<input type="button" value="Delete"  onClick={(event)=>this.updateDevicesHandler(event,params.data)} disabled = {!params.data.del} />);
  }

  updateScannerRenderer=(params)=>{
    var newMac= params.data.scannerMacName;
    var oldMacCP= this.state.oldMac;
    if(oldMacCP.indexOf(newMac)>-1){
      return (<label/>);
    }else{
      oldMacCP.push(newMac);
      this.setState({oldMac:oldMacCP});
      console.log(this.state);
       return (<label>{newMac}</label >);
     }
  }
 
   onGridReady(params) {
     this.gridApi = params.api;
     this.columnApi = params.columnApi;
     this.gridApi.sizeColumnsToFit();
 }

 updateDevicesHandler=(e,data)=>{
  // alert(data.id);
   axios.delete('http://localhost:8080/ps/devices/'+data.id)
   .then(response =>{
       console.error('response', response.data);
       this.setState({ devices : response.data.deviceMovementForm });
       this.setState({ assets : response.data.assetForm });
      window.location.reload();
  } ).catch(error => console.error('Error', error));

 }
 
 getAllDevicesHandler=()=>{
  axios.get('http://localhost:8080/ps/devices/display')
   .then(response =>{
       console.error('response', response.data);
       this.setState({ devices : response.data.deviceMovementForm });
       this.setState({ assets : response.data.assetForm });
   } ).catch(error => console.error('Error', error));
  
 }


  render() {
    return (
      <div className='app'>
        <h3 style={{marginLeft: "13%"}}>FIFO Room</h3>
        <div className="HomeGrid">
        <div style={{height: 300, width: '70%', marginTop: 10,marginLeft: "13%",fontSize:'13px'}} className="ag-theme-balham">
                <AgGridReact
                    columnDefs={this.state.devicesColdef}
                    rowData={this.state.devices}
                    enableFilter={true}
                    onGridReady={this.onGridReady}
                    headerHeight={30}
                    enableSorting={true}
                    animateRows={true}
                  //  enableColResize={true}
                    >
                </AgGridReact>
        </div>
    </div>
<br/>
<h3 style={{marginLeft: "13%"}}>Assembly Line</h3>
<div className="HomeGrid">
            <div style={{height: 300, width: '70%', marginTop: 10,marginLeft: "13%",fontSize:'13px'}} className="ag-theme-balham">
                <AgGridReact
                    columnDefs={this.state.assetsColdef}
                    rowData={this.state.assets}
                    enableFilter={true}
                    onGridReady={this.onGridReady}
                    headerHeight={30}
                    enableSorting={true}
                    animateRows={true}
                  //  enableColResize={true}
                    
                    >
                </AgGridReact>
            </div>
            </div>
    </div>
    );
  }
}

export default Home;
