package iDAO;

import java.util.List;

import objects.Usuario;

public interface iUsuario {
        public void create (Usuario usuario);
    public Usuario read (int usuarioId);
    public void update (Usuario usuario);
    public void delete (Usuario usuario);
    public List <Usuario> findAll();

}
