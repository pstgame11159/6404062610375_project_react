 import React, { useState } from 'react';


import {compile} from "mathjs";
import { Container,Button,Table} from 'react-bootstrap';
import axios from 'axios';
import Graph from './graph';


function False_Position() {


 var  x= []
  


 const [Xm_g,setXm_g]=useState([{it:[],show_xR:[],show_xL:[],show_xM:[],show_check:[]}]);
  const [xl,setxl] = useState(0);
  const [xr,setxr] = useState(0);
  const [Eq,seteq] = useState("");
  const [Errror,Seterror] = useState();

//set_graph

  const[options,setObject]= useState({
    chars:{
      id: 'apexchart-example'
    },
    xaxis:{
      categories:x
    }
  })
  const [series,seSeries] = useState([{
  
    name: 'series-1',
    data:x
  }])


//end_set_graph

    const Xl = (event)=>
    {
      setxl(event.target.value)
      };
  
    const Xr = (event)=>{
      setxr(event.target.value)
     };
      
     const eq = (event)=>{
      seteq(event.target.value)
     };


     const api_test=()=>
     {

axios.get('http://localhost:3500/False_position')
.then(res=>
  {
    
    let data = res.data;
    data.forEach(val=>
      {
        console.log(val)
        if(Number(`${val.id}`)===1)
        {
          setxl(Number(`${val.xl}`))
          setxr(Number(`${val.xr}`))
          seteq(`${val.eq}`)
        }

      })
  })
  .catch(error=>{
    console.log(error)
  })



     }





const Cal_bis=()=>
{
  console.log(Xm_g)
  var ssd = [{it:[],show_xR:[],show_xL:[],show_xM:[],show_check:[]}]


  var iteration = 0;
  var xM = 0

  var check = 1
  var xOld = 0;
  var fxM=0,fxR=0;
  var  xL = Number(xl)
  var  xR = Number(xr)
  var array_x=[0];
  var round=[0];

  while(check > 0.000001){
      xOld = xM;

      xM = (xL+xR)/2

    let scope_XM = {x:xM}
    const code1 = compile(Eq) 
    fxM = code1.evaluate(scope_XM)

    let scope_XR = {x:xR}
    const code2 = compile(Eq) 
    fxR = code2.evaluate(scope_XR)
    
      if(fxM*fxR > 0){
        xR = xM;
      }
      else if(fxM*fxR < 0){
         xL= xM;
      }

        check = Math.abs((xM - xOld)/xM)*100;
        array_x[iteration] = xM;
        round[iteration] = iteration;
        if(iteration<=0)
        {
          ssd = [{it:iteration,show_xR:xR.toFixed(6),show_xL:xL.toFixed(6),show_xM:xM.toFixed(6),show_check:check.toFixed(6)}]
        }
        else{
        ssd.push({it:iteration,show_xR:xR.toFixed(6),show_xL:xL.toFixed(6),show_xM:xM.toFixed(6),show_check:check.toFixed(6)})
        }
        iteration++;
        
  }

  Seterror(xM)
  setXm_g(ssd)
  

//set_graph


  setObject({
    chars:{
      id: 'False_position'
    },
    xaxis:{
      categories:round
    }
  })

  seSeries([{
  
    name: 'xM',
    data:array_x
  }])

  //end_set_graph






}


  return (
  
    <>
    <h1>False-Position</h1>
     <h2>XL = <input type="number" value={xl} onChange={Xl} /> </h2>
     <h2>XR =<input type="number" value={xr}onChange={Xr} /> </h2>
     <h2>EQ =<input type="text" value={Eq}onChange={eq} /> </h2>
     <Button   variant="success" onClick={e=>Cal_bis()}>Cal</Button>
      <br></br>
      <br></br>
      <Button onClick={e=>api_test()}>API</Button>
      <h1>{Errror}</h1>
 
      {Graph(options,series)}
      <Container>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th >iteration</th>
          <th>XR</th>
          <th>XL</th>
          <th>XM</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>

      {Xm_g.map((user,i) => (
        <tr>
      
         <td>{user.it}</td>
         <td>{user.show_xR}</td>
         <td>{user.show_xL}</td>
         <td>{user.show_xM}</td>
         <td>{user.show_check}</td>

          </tr>

        ))}



        
      </tbody>
    </Table>
    </Container>



    </>
  );
}









export default False_Position;

