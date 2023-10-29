import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { Link, NavLink } from 'react-router-dom';




export default function ListadoEmpleados() {

const urlBase = "http://localhost:8080/rh-app/empleados";

const[empleados,setEmpleados] = useState([]);

useEffect(() =>{
cargarEmpleados();
},[]);

const cargarEmpleados = async () => {
   const resultado = await axios.get(urlBase);
   console.log("resultado de cargar empleados");
   console.log(resultado.data);
   setEmpleados(resultado.data); 
}

const eliminarEmpleado = async (id) => {
await axios.delete(`${urlBase}/${id}`);
cargarEmpleados();
}

  return (
    <div className='container text-center' style={{margin: "30px"}}>
      <h3>Sistema de recursos humanos</h3>
      <table className="table table-striped">
  <thead className = "table-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">NOMBRE</th>
      <th scope="col">DEPARTAMENTO</th>
      <th scope="col">SUELDO</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {
    //momento de conectar el back al html, iteramos el arreglo de empleados!.
    empleados.map((empleado,indice) => (
<tr key = {indice}>
      <th scope="row">{empleado.idEmpleado}</th>
      <td>{empleado.nombre}</td>
      <td>{empleado.area}</td>
      <td><NumericFormat value={empleado.salario}
      
      displayType='text' thousandSeparator=',' prefix={'$'}
      decimalScale={2} fixedDecimalScale /></td>
     <td className= 'text-center'/>
     <div>
      <Link to= {`/editar/${empleado.idEmpleado}`} className='btn btn-warning btn-sm me-3'>Editar</Link>
      <button onClick={()=> eliminarEmpleado(empleado.idEmpleado)} className='btn btn-danger btn-sm'>Eliminar</button>
     </div>

    </tr>
    ))   
    }
  </tbody>
</table>
    </div>
  )
}

