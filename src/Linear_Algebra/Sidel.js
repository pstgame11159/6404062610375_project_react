import React, { useState } from 'react';

import { Container, Form, Button, Table } from 'react-bootstrap';

function Sidel() {
  const [val, setVal] = useState([]);
  const [show_total, set_show_total] = useState([])
  const [size_array, set_size] = useState(0);

  const [show_martix_web, set_martix_web] = useState([]);

  const handleAdd = (e) => {
    var array = [[]]
    for (var i = 0; i < Number(e.target.value); i++) {
      array[i] = [];
      console.log(array);
      for (var k = 0; k < Number(e.target.value) + 1; k++) {
        array[i][k] = `${i} ${k}`;
      }
      setVal(array)
      set_size(Number(e.target.value))

    }
  }


  const cal_test = () => {

    var ab = [[]]
    var k = 0, i = 0
    for (i = 0; i < size_array; i++) {
      ab[i] = [];
      for (k = 0; k < size_array + 1; k++) {
        ab[i][k] = val[i][k]
      }

    }




    var show_web = [[]]


    var xk = [0, 0, 0, 0];
    var x = []
    var len = ab.length;
    const gauss_seidel = (a, k) => {
      var res = 0;
      var i = 0;
      while (i < len) {
        var calmul = a[k][i] * xk[i];
        if (k !== i) {
          res = res + calmul;
        }
        i++;
      }
      return res;
    }
    const checkErr = (xn, xo) => {
      return Math.abs((xn - xo) / xn) * 100
    }

    do {
      for (i = 0; i < len; i++) {
        x[i] = (1 / ab[i][i]) * (ab[i][len] - gauss_seidel(ab, i))
      }
      var e = checkErr(x[1], xk[1]);
      for (var c = 0; c < xk.length; c++) {
        xk[c] = x[c];
      }
    } while (e > 0.000001);
    for (k = 0; k < len; k++) {
    }



    for (i = 0; i < size_array; i++) {
      show_web[i] = [];
      for (k = 0; k < size_array + 1; k++) {
        if (k < size_array - 1) {
          show_web[i][k] = `(${val[i][k]} *(${x[k]}))+`
        }
        else if (k < size_array) {
          show_web[i][k] = `(${val[i][k]} *(${x[k]}))`
        }
        else if (k === size_array) {
          show_web[i][k] = ` = ${val[i][k]}`
        }
      }


    }
    set_martix_web(show_web)

    set_show_total(x)
  }






  const handleChange = (rowIndex, columnIndex, e) => {
    val[rowIndex][columnIndex] = Number(e.target.value);
  }




  return (
    <>
      <h1>Sidel</h1>
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control size="lg" type="text" name="dimentions" onChange={handleAdd} placeholder="Input Number of Dimentions" />
          </Form.Group>
        </Form>
        <br></br>
        <br></br>

        <Table responsive="sm">
          <tbody>
            {val.map((row, rowIndex) => (
              <tr>
                {row.map((column, columnIndex) => (
                  <td >
                    <input id={column} onChange={e => handleChange(rowIndex, columnIndex, e)} />
                  </td>

                ))}
              </tr>

            ))}

          </tbody>
        </Table>


        <br></br>
        <Button onClick={() => cal_test()}>Cal</Button>
      </Container>
      {show_total.map((total, i) => (
        <h1 id={i}>X{i + 1}&nbsp; &nbsp;{total}</h1>

      ))


      }

      {show_martix_web.map((show_martix, count) => (
        <h1 id={count}>แถวที่{count + 1}&nbsp; &nbsp; {show_martix}</h1>

      ))


      }



    </>
  );
}



export default Sidel;