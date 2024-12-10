package gestion;

import iDAO.iUsuario;
import objects.Usuario;
import java.util.List;

public class UsuarioGestion {
    private iUsuario usuarioDAO;

    public UsuarioGestion(iUsuario usuarioDAO) {
        this.usuarioDAO = usuarioDAO;
    }

    public void agregarUsuario(Usuario usuario) {
        usuarioDAO.create(usuario);
    }

    public Usuario obtenerUsuario(int usuarioId) {
        return usuarioDAO.read(usuarioId);
    }

    public void actualizarUsuario(Usuario usuario) {
        usuarioDAO.update(usuario);
    }

    public void eliminarUsuario(Usuario usuario) {
        usuarioDAO.delete(usuario);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioDAO.findAll();
    }
}
