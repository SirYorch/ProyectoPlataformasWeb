package DAO;

import java.sql.*;

import iDAO.IHorarioDAO;
import objects.Horario;

public class HorarioDAO implements IHorarioDAO{
     private Connection connection;

    // Constructor para recibir la conexión a la base de datos
    public HorarioDAO (Connection connection) {
        this.connection = connection;
    }

    @Override
    public void create(Horario horario) {
        String sql = "INSERT INTO horarios (horarioId, nombre, fechaInicio, fechaFin, horaInicio, horaFin) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, horario.getHorarioId());
            statement.setString(2, horario.getNombre());
            statement.setDate(3, horario.getFechaInicio());
            statement.setDate(4, horario.getFechaFin());
            statement.setTime(5, horario.getHoraInicio());
            statement.setTime(6, horario.getHoraFin());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Horario read(int horarioId) {
        String sql = "SELECT * FROM horarios WHERE horarioId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, horarioId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                return new Horario(
                        resultSet.getInt("horarioId"),
                        resultSet.getString("nombre"),
                        resultSet.getDate("fechaInicio"),
                        resultSet.getDate("fechaFin"),
                        resultSet.getTime("horaInicio"),
                        resultSet.getTime("horaFin")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void update(Horario horario) {
        String sql = "UPDATE horarios SET nombre = ?, fechaInicio = ?, fechaFin = ?, horaInicio = ?, horaFin = ? WHERE horarioId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, horario.getNombre());
            statement.setDate(2, horario.getFechaInicio());
            statement.setDate(3, horario.getFechaFin());
            statement.setTime(4, horario.getHoraInicio());
            statement.setTime(5, horario.getHoraFin());
            statement.setInt(6, horario.getHorarioId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void delete(Horario horario) {
        String sql = "DELETE FROM horarios WHERE horarioId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, horario.getHorarioId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Horario> findAll() {
        List<Horario> horarios = new ArrayList<>();
        String sql = "SELECT * FROM horarios";
        try (PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                horarios.add(new Horario(
                        resultSet.getInt("horarioId"),
                        resultSet.getString("nombre"),
                        resultSet.getDate("fechaInicio"),
                        resultSet.getDate("fechaFin"),
                        resultSet.getTime("horaInicio"),
                        resultSet.getTime("horaFin")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return horarios;
    }
}
