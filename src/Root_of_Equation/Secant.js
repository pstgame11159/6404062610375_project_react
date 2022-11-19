import React, { useState } from 'react';


import {compile} from "mathjs";
import { Container,Button,Table} from 'react-bootstrap';
import axios from 'axios';
import Graph from './graph';


function Secant() {


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

axios.get('http://localhost:3500/Secant')
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
  var x2 = 0,dx=0

  var check = 1
  var fxR1=0,fxR=0,fxL=0;
  var array_x=[0];
  var round=[0];
  var xL = Number(xl)
  var xR = Number(xr)
  check = 1
  while(check>0.000001){
  

  let scope_XL = {x:xL}
  const code1 = compile(Eq) 
  fxL = code1.evaluate(scope_XL)

  let scope_XR = {x:xR}
  const code2 = compile(Eq) 
  fxR = code2.evaluate(scope_XR)
  




  fxR1 = (fxL-fxR)/(xL-xR)
  x2 = xR-(fxR/fxR1)
  dx =fxR/fxR1
  check =dx/x2
  if(check<0)
  {
      check = 0-check
  }

  round[iteration] = iteration;
  array_x[iteration] = x2;
  if(iteration<=0)
  {
    ssd = [{it:iteration,show_xR:xR.toFixed(6),show_xL:xL.toFixed(6),show_xM:x2.toFixed(6),show_check:check.toFixed(6)}]
  }
  else{
  ssd.push({it:iteration,show_xR:xR.toFixed(6),show_xL:xL.toFixed(6),show_xM:x2.toFixed(6),show_check:check.toFixed(6)})
  }
  iteration++;



  xL = xR
  xR = x2



  
  }
 




  Seterror(x2)
 setXm_g(ssd)
  

//set_graph


  setObject({
    chars:{
      id: 'Secant'
    },
    xaxis:{
      categories:round
    }
  })

  seSeries([{
  
    name: 'x2',
    data:array_x
  }])

  //end_set_graph






}


  return (
  
    <>
    <h1>Secant</h1>
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









export default Secant;

