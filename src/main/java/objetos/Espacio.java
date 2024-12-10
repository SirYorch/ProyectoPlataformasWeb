public class Espacio{
    private int espacioId;
    private int espacioNum;
    private String espacioLetra;
    private String estado;
    
    public Espacio (int espacioId, int espacioNum, String espacioLetra, String estado){
        this.espacioId = espacioId;
        this.espacioNum = espacioNum;
        this.espacioLetra = espacioLetra;
        this.estado = estado;


    }

    public int getEspacioId(){
        return espacioId;
    }

    public void setEspacioId (int espacioId){
        this.espacioId  = espacioId;
    }

    public int getEspacioNum(){
        return espacioNum;
    }

    public void setEspacioNum (int espacioNum){
        this.espacioNum  = espacioNum;
    }

    public String getEspacioLetra(){
        return espacioLetra;
    }

    public void setEspacioLetra (String espacioLetra){
        this.espacioLetra = espacioLetra;
    }

    public String getEstado(){
        return estado;
    }

    public void setEstado (String estado){
        this.estado = estado;
    }



    
}
