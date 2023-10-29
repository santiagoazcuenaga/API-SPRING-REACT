package gm.rh.controlador;


import gm.rh.Excepcion.RecursoNoEncontradoExcepcion;
import gm.rh.entidades.Empleado;
import gm.rh.servicio.IEmpleadoServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("rh-app")
@CrossOrigin(value = "http://localhost:3000")
public class EmpleadoControlador {
private static final Logger logger =
        LoggerFactory.getLogger(EmpleadoControlador.class);
@Autowired
    private IEmpleadoServicio empleadoServicio;

@GetMapping("/empleados")
    public List<Empleado> listarEmpleado(){
    var empleados = empleadoServicio.listarEmpleados();
    empleados.forEach(empleado -> logger.info(empleado.toString()));
return empleados;



}
    @PostMapping("/empleados")
    public Empleado agregarEmpleado(@RequestBody Empleado empleado){
    logger.info("Empleado a agregar: "+ empleado);
    return empleadoServicio.guardarEmpleado(empleado);
    }

    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleado> obtenerEmpleadoPorId(@PathVariable Integer id){
    Empleado empleado =empleadoServicio.buscarEmpleadoPorId(id);
 if(empleado == null){
throw new RecursoNoEncontradoExcepcion("no se encontró el empleado_id :" + id);
 }
 return ResponseEntity.ok(empleado);
    }

    @PutMapping("/empleados/{id}")
    public ResponseEntity<Empleado> actualizarEmpleado(@PathVariable Integer id,@RequestBody Empleado empleadoRecibido){
    Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
    if(empleado == null){
       throw new RecursoNoEncontradoExcepcion("no se encontró el id recibido o no existe "+ id);
    }
    empleado.setNombre(empleadoRecibido.getNombre());
    empleado.setArea(empleadoRecibido.getArea());
    empleado.setSalario(empleadoRecibido.getSalario());
    empleadoServicio.guardarEmpleado(empleado);
    return ResponseEntity.ok(empleado);
    }

    @DeleteMapping("/empleados/{id}")
    public ResponseEntity <Map<String,Boolean>> eliminarEmpleado(@PathVariable Integer id){
    Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
    if(empleado == null){
        throw new RecursoNoEncontradoExcepcion("el id recibido no existe : "+ id);
    }
    empleadoServicio.eliminarEmpleado(empleado);
    //respuesta de tipo JSON {"eliminado : true"}
    Map<String,Boolean> respuesta = new HashMap<>();
    respuesta.put("eliminado",Boolean.TRUE);
    return ResponseEntity.ok(respuesta);

    }


}
