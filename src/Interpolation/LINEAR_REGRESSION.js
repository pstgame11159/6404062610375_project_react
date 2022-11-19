import React, { useState } from 'react';

import { Container,Form,Button,Table} from 'react-bootstrap';

function LINEAR_REGRESSION(){
    const [val_x,setVal_x]=useState([{x:[],y:[]}]);
    const [size_array,set_size]=useState(0);
    const [fXX,set_fx]=useState(0);
    const [Show_Lagrange,set_Lagrange]=useState(0);
  
  
     const handleAdd=(e)=>{
      var array_x = []
      for(var i=0;i<Number(e.target.value);i++)
      {
  

         if(i<=0)
        {
          array_x[i] = [{x:i,y:i}]
        }
        else{
          array_x.push({x:i,y:i})
        }
   
      }

      setVal_x(array_x)
      set_size(Number(e.target.value))
     }
     

     const X_fx=(e)=>
     {
      set_fx(Number(e.target.value))
     }
     
  
     const cal_test=()=>{
     
      var x = []
      var y = []
      
      for(var i =0;i<size_array;i++)
      {
        x[i] =  val_x[i].x 
        y[i] =  val_x[i].y 
      }
      var a0=0,a1=0;
      var n = x.length
      var sumX = 0;
      var sumY = 0;
      var sumX2 = 0;
      var sumXY = 0;
      
   
      const fx = (x) =>{
        set_Lagrange(a0+a1*x)
        return a0+a1*x
      }

          for(i=0;i<x.length;i++){
              sumX = sumX + x[i]
              sumY = sumY + y[i]
              sumX2 = sumX2 + x[i]*x[i]
              sumXY = sumXY + x[i]*y[i]
          }
          //cramer rule 2x2 
       var  det = n*sumX2 - sumX*sumX;
       a0 = (sumY*sumX2 - sumXY*sumX)/det
          a1 = (n*sumXY - sumX*sumY)/det 
          fx(fXX)

    }


  
     const handleChange_x=(rowIndex, e)=>{
      val_x[rowIndex].x =  Number(e.target.value);

     }
     const handleChange_y=(rowIndex, e)=>{
      val_x[rowIndex].y =  Number(e.target.value);

     }
  


     
  return(
      <>
      <h1>LINEAR REGRESSION</h1>
      <Container>
      <Form>
             <Form.Group className="mb-3">
                 <Form.Control size="lg" type="text" name = "dimentions" onChange={handleAdd} placeholder="Input Number of Dimentions" />
             </Form.Group>
         </Form>
      <br></br>
      <br></br>
      <h2>X =<input type="number" onChange={X_fx} /> </h2>
      <br></br>
      <Table striped bordered hover variant="dark">
      <thead>
      <tr>
      <th>X</th>
      <th>Y</th>

       </tr>
        </thead>
             <tbody>
      {val_x.map((row, rowIndex) => (
                     <tr>
                 <td> <input onChange={e => handleChange_x(rowIndex, e)}/></td>
        
                  <td> <input onChange={e => handleChange_y(rowIndex, e)}/></td>
         
                  </tr>
            ))}
        

</tbody>

    </Table>


                <br></br>
               <Button onClick={()=>cal_test()}>Cal</Button>
               </Container>
  


               <br></br>
               <h1> {Show_Lagrange}</h1>
  
      
      </>


  );
  }
  
  
  
export default  LINEAR_REGRESSION;