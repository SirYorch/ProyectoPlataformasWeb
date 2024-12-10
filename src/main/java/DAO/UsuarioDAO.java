package DAO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import iDAO.iUsuario;
import objects.Usuario;

public class UsuarioDAO implements iUsuario {
    private Connection connection;

    public UsuarioDAO(Connection connection) {
        this.connection = connection;
    }

    @Override
    public void create(Usuario usuario) {
        String sql = "INSERT INTO usuarios (cedula, nombre, telefono, direccion, placa) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, usuario.getCedula());
            statement.setString(2, usuario.getNombre());
            statement.setString(3, usuario.getTelefono());
            statement.setString(4, usuario.getDireccion());
            statement.setString(5, usuario.getPlaca());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Usuario read(int usuarioId) {
        String sql = "SELECT * FROM usuarios WHERE cedula = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, usuarioId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                Usuario usuario = new Usuario();
                usuario.setCedula(resultSet.getString("cedula"));
                usuario.setNombre(resultSet.getString("nombre"));
                usuario.setTelefono(resultSet.getString("telefono"));
                usuario.setDireccion(resultSet.getString("direccion"));
                usuario.setPlaca(resultSet.getString("placa"));
                return usuario;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void update(Usuario usuario) {
        String sql = "UPDATE usuarios SET nombre = ?, telefono = ?, direccion = ?, placa = ? WHERE cedula = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, usuario.getNombre());
            statement.setString(2, usuario.getTelefono());
            statement.setString(3, usuario.getDireccion());
            statement.setString(4, usuario.getPlaca());
            statement.setString(5, usuario.getCedula());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void delete(Usuario usuario) {
        String sql = "DELETE FROM usuarios WHERE cedula = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, usuario.getCedula());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Usuario> findAll() {
        List<Usuario> usuarios = new ArrayList<>();
        String sql = "SELECT * FROM usuarios";
        try (PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                Usuario usuario = new Usuario();
                usuario.setCedula(resultSet.getString("cedula"));
                usuario.setNombre(resultSet.getString("nombre"));
                usuario.setTelefono(resultSet.getString("telefono"));
                usuario.setDireccion(resultSet.getString("direccion"));
                usuario.setPlaca(resultSet.getString("placa"));
                usuarios.add(usuario);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return usuarios;
    }
}
