import Chart from "react-apexcharts";





function graph(it,xm) {


    return(
<>

<center> <Chart options={it} series={xm} width={700}height={320}/> </center>
</>


    )


}


export default graph;