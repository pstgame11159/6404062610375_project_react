import React, { useState } from 'react';


import {compile} from "mathjs";
import { Container,Button,Table} from 'react-bootstrap';
import axios from 'axios';
import Graph from './graph';


function Newton() {


 var  x= []
  


 const [Xm_g,setXm_g]=useState([{it:[],show_xR:[],show_fdx:[],show_avg:[],show_xL:[],show_check:[]}]);
  const [xl,setxl] = useState(0);
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
      
     const eq = (event)=>{
      seteq(event.target.value)
     };


     const api_test=()=>
     {

axios.get('http://localhost:3500/Newton')
.then(res=>
  {
    
    let data = res.data;
    data.forEach(val=>
      {
        console.log(val)
        if(Number(`${val.id}`)===1)
        {
          setxl(Number(`${val.xl}`))
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
  var ssd = [{it:[],show_xR:[],show_fdx:[],show_avg:[],show_xL:[],show_check:[]}]


  var iteration = 0;


  var xt=0,xR,fdx=0,avg=0
  var check = 1
  var fxL=0;
  var array_x=[0];
  var round=[0];
  var xL = Number(xl)
  check = 1
  


  

  
  
  while(check>0.000001){
  
    let scope_XL = {x:xL}
    const code1 = compile(Eq) 
    fxL = code1.evaluate(scope_XL)
  
      xt =   xL-(fxL)/(2*  xL)
      xR = fxL
      if(xR<0)
      {
        xR =0-xR
      }
      fdx = 2*  xL
      avg =xR/fdx
      check = avg/xt
      xL = xt
  
      round[iteration] = iteration;
      array_x[iteration] = xL;
      if(iteration<=0)
      {
        ssd = [{it:iteration,show_xR:xR.toFixed(6),show_fdx:fdx.toFixed(6),show_avg:avg.toFixed(6),show_xL:xL.toFixed(6),show_check:check.toFixed(6)}]
      }
      else{
      ssd.push({it:iteration,show_xR:xR.toFixed(6),show_fdx:fdx.toFixed(6),show_avg:avg.toFixed(6),show_xL:xL.toFixed(6),show_check:check.toFixed(6)})
      }
      iteration++;
    
     
    
  
  
  
  
  
  }

 



  Seterror(xL)
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
    <h1>NewTon</h1>
     <h2>XL = <input type="number" value={xl} onChange={Xl} /> </h2>
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
          <th>FDX</th>
          <th>AVG</th>
          <th>XL</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>

      {Xm_g.map((user,i) => (
        <tr>
      
         <td>{user.it}</td>
         <td>{user.show_xR}</td>
         <td>{user.show_fdx}</td>
         <td>{user.show_avg}</td>
         <td>{user.show_xL}</td>
         <td>{user.show_check}</td>

          </tr>

        ))}



        
      </tbody>
    </Table>
    </Container>






    </>
  );
}









export default Newton;
