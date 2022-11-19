import React, { useState } from 'react';

import { Container, Form, Button, Table } from 'react-bootstrap';

function LINEAR_REGRESSION() {
    const [val_x, setVal_x] = useState([{ x: [], y: [] }]);
    const [size_array, set_size] = useState(0);
    const [fXX, set_fx] = useState(0);
    const [Show_POLYNOMIAL, set_POLYNOMIAL] = useState("");


    const handleAdd = (e) => {
        var array_x = []
        for (var i = 0; i < Number(e.target.value); i++) {


            if (i <= 0) {
                array_x[i] = [{ x: i, y: i }]
            }
            else {
                array_x.push({ x: i, y: i })
            }

        }

        setVal_x(array_x)
        set_size(Number(e.target.value))
    }


    const X_fx = (e) => {
        set_fx(Number(e.target.value))
    }


    const cal_test = () => {

        var x = []
        var y = []

        for (var i = 0; i < size_array; i++) {
            x[i] = val_x[i].x
            y[i] = val_x[i].y
        }
        var m = 2
        var a = [[]]
        var b = []
        var n = size_array
        var ans = []

        for (i = 0; i < m + 1; i++) {
            b[i] = 0
            a[i] = []
            for (var j = 0; j < m + 1; j++) {
                a[i][j] = 0
            }
        }

        for (var ir = 0; ir <= m; ir++) {
            for (var ic = 0; ic <= m; ic++) {
                var k = (ir + 1) + (ic + 1) - 2
                for (i = 0; i < n; i++) {
                    a[ir][ic] = a[ir][ic] + x[i] ** k
                }
            }
            for (i = 0; i < n; i++) {
                b[ir] = b[ir] + y[i] * (x[i] ** (ir))
            }
        }

        //gauss cal
        var c = a
        for (i = 0; i < c.length; i++) {
            c[i][a.length] = b[i]
        }

        for (k = 0; k < c.length; k++) {
            for (i = k + 1; i < c.length; i++) {
                var temp = c[i][k] / a[k][k]
                for (j = k + 1; j <= c.length; j++) {
                    c[i][j] = c[i][j] - temp * c[k][j]
                }
            }
        }

        for (i = c.length - 1; i >= 0; i--) {
            ans[i] = c[i][c.length]
            for (j = i + 1; j < c.length; j++) {
                ans[i] = ans[i] - a[i][j] * ans[j]
            }
            ans[i] = ans[i] / a[i][i]
        }

        console.log("a0 = " + ans[0])
        console.log("a1 = " + ans[1])
        console.log("a2 = " + ans[2])
        if (fXX > 0) {
            var resu = ans[0] + ans[1] * (fXX) + ans[2] * (fXX * fXX)
            console.log(`f(${fXX}) = ${ans[0]}+${ans[1]}+(${fXX}) +${ans[2]}+(${fXX}^2)`)
            set_POLYNOMIAL(`f(${fXX}) = ${ans[0]}+${ans[1]}(${fXX}) +${ans[2]}(${fXX}^2) = ${resu}`)

        } else {
            console.log("f(x) = " + ans[0] + " + " + ans[1] + "(x) " + ans[2] + "(x^2)")
            set_POLYNOMIAL("f(x) = " + ans[0] + " + " + ans[1] + "(x) +" + ans[2] + "(x^2)")
        }






    }



    const handleChange_x = (rowIndex, e) => {
        val_x[rowIndex].x = Number(e.target.value);

    }
    const handleChange_y = (rowIndex, e) => {
        val_x[rowIndex].y = Number(e.target.value);

    }




    return (
        <>
            <h1>POLYNOMIAL REGRESSION</h1>
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control size="lg" type="text" name="dimentions" onChange={handleAdd} placeholder="Input Number of Dimentions" />
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
                                <td> <input onChange={e => handleChange_x(rowIndex, e)} /></td>

                                <td> <input onChange={e => handleChange_y(rowIndex, e)} /></td>

                            </tr>
                        ))}


                    </tbody>

                </Table>


                <br></br>
                <Button onClick={() => cal_test()}>Cal</Button>
            </Container>



            <br></br>
            <h1> {Show_POLYNOMIAL}</h1>


        </>


    );
}



export default LINEAR_REGRESSION;