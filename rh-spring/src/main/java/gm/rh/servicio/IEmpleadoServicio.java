package gm.rh.servicio;

import gm.rh.entidades.Empleado;

import java.util.List;

public interface IEmpleadoServicio {


    public List<Empleado> listarEmpleados();
    public Empleado buscarEmpleadoPorId(Integer idEmpleado);
    public Empleado guardarEmpleado(Empleado empleado);
    public void eliminarEmpleado(Empleado empleado);


}
