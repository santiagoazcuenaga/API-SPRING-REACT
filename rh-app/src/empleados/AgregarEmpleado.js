import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AgregarEmpleado() {
let navegacion = useNavigate();


const [empleado,setEmpleado] = useState({
  nombre:"",
  area:"",
  salario:"",  
})

const{nombre,area,salario} = empleado;

const onInputChange = (e) => {
 //spread operator: ... : para expandir los atributos de nuestro objeto de tipo empleado
 setEmpleado({...empleado, [e.target.name]: e.target.value})   
}

const onSubmit = async(e) =>{
e.preventDefault();
const urlBase = "http://localhost:8080/rh-app/empleados";
await axios.post(urlBase,empleado);
//Redirigimos a la pagina de inicio
navegacion('/');
}


  return (
    <div className='container'>
      <div className='container text-center' style={{margin: "30px"}}>
<h3>Agregar empleado</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
    <div className="mb-3">
        <label for="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="nombre" name="nombre" required={true} value={nombre} onChange={(e)=> onInputChange(e)}/>
    </div>
    <div className="mb-3">
        <label for="area" className="form-label">Area</label>
        <input type="text" className="form-control" id="area" name="area" value={area} onChange={(e)=> onInputChange(e)}/>
    </div>
    <div className="mb-3">
        <label for="salario" className="form-label">Salario</label>
        <input type="number" step="any" className="form-control" id="salario" name="salario"  value={salario} onChange={(e)=> onInputChange(e)}/>
    </div>
    <div className='text-center'>
    <button type="submit" className="btn btn-warning btn-sm me-3">Agregar</button>
    <a href='/' className= 'btn btn-danger btn-sm' >Regresar</a>
    </div>

    </form>
    </div>
  )
}
