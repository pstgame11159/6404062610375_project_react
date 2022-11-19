import React, { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { det } from 'mathjs'

const CramerRule = () => {
  const [Dimention, setDimention] = useState([])
  const [Bmatrix, setBmatrix] = useState([])
  const [Ans, setAns] = useState([])

  const [Deta, set_deta] = useState([])

  const [Show_carmer, set_carmer] = useState([]);
  const copymatrix = (m) => {
    var array = [[]]

    for (var i = 0; i < m.length; i++) {
      array[i] = [];
      for (var k = 0; k < m.length; k++) {
        array[i][k] = m[i][k];

      }
    }
    return array
  }

  const cramer = () => {
    var matrix1 = Dimention
    var matrix2 = Bmatrix
    var counter = 0;
    var arrayAns = []
    var deta = []
    var show_carmer1 = []
    show_carmer1.push(matrix1)
    deta.push(Math.round(det(matrix1)))
    while (counter !== matrix1.length) {
      var transformMatrix = copymatrix(matrix1)
      show_carmer1.push(transformMatrix)
      for (var i = 0; i < matrix1.length; i++) {
        for (var j = 0; j < matrix1.length; j++) {
          if (j === counter) {
            transformMatrix[i][j] = matrix2[i]


            break;
          }

        }

      }

      arrayAns[counter] = Math.round(det(transformMatrix)) / Math.round(det(matrix1))
      counter++;

      deta.push(Math.round(det(transformMatrix)))


    }

    setAns(arrayAns)
    set_carmer(show_carmer1)
    set_deta(deta)

  }
  const Addmatrix = (e) => {
    var A = [[]], B = []
    for (var i = 0; i < Number(e.target.value); i++) {
      A[i] = [];
      B[i] = [];
      console.log(A);
      for (var k = 0; k < Number(e.target.value); k++) {

        B[i] = 0
        A[i][k] = 0

      }

    }
    setDimention(A)
    setBmatrix(B)

  }

  const handleChangematrixA = (e, row, column) => {
    Dimention[row][column] = parseFloat(e.target.value)
  }
  const handleChangematrixB = (e, row) => {
    Bmatrix[row] = parseFloat(e.target.value)

  }

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Cramer's Rule</h2>
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control size="lg" type="text" name="dimentions" onChange={Addmatrix} placeholder="Input Number of Dimentions" />
          </Form.Group>
        </Form>

        {Dimention.map((row, i) => (<div key={i}>
          <Table responsive="sm">
            <tbody>
              <tr>
                {row.map((column, j) => (
                  <td><input type="number" onChange={e => handleChangematrixA(e, i, j)} /></td>
                ))}
                |<td><input onChange={e => handleChangematrixB(e, i)} /></td>
              </tr>

            </tbody>
          </Table>
        </div>))}

        <Button as="input" type="submit" value="Submit" onClick={() => cramer()} />
      </Container>

      <br></br>
      <Table  >
        <tbody>
          {Show_carmer.map((row, rowIndex) => (
            <center>
              {row.map((column, columnIndex) => (
                <tr>
                  {column.map((cb, cs) => (
                    <td >
                      <h1>&nbsp;{cb}&nbsp;&nbsp;</h1>
                    </td>
                  ))}
                </tr>
              ))}
              <td><h2>Δ{rowIndex} = </h2></td><td ><h2>{Deta[rowIndex]}</h2></td >

              <br></br>

            </center>
          ))}

        </tbody>
      </Table>

      {Ans.map((Ans, index) => (

        <h1 key={index}>   X{index + 1}= (Δ{index + 1}/Δ  )=     ({Deta[index + 1]} /{Deta[index]} ) =   {Ans}   </h1>



      ))}

      <br></br>
      <br></br>
      <br></br>

      {Ans.map((Ans, index) => (<h1 key={index}>X{index + 1}&nbsp;&nbsp;{Ans}</h1>))

      }


    </div>

  )

}

export default CramerRule;