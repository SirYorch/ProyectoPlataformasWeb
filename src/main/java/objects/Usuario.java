package objects;


public class Usuario{
    String nombre;
    String telefono;
    String direccion;
    String cedula;
    String placa;
    Usuario(String nombre,String telefono,String direccion, String cedula,String placa){
        this.nombre = nombre;
        this.telefono = telefono;
        this.direccion = direccion;
        this.cedula=cedula;
        this.placa=placa;
    }
    public Usuario(){}

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }
    
}
