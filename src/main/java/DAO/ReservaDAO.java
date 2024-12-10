package DAO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import iDAO.iReserva;
import objects.Reserva;

public class ReservaDAO implements iReserva {
    private Connection connection;

    public ReservaDAO(Connection connection) {
        this.connection = connection;
    }

    @Override
    public void create(Reserva reserva) {
        String sql = "INSERT INTO reservas (ticketId, inicio, fin, placa, usuarioId) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, reserva.getTicket().getId());
            statement.setDate(2, reserva.getInicio());
            statement.setDate(3, reserva.getFin());
            statement.setString(4, reserva.getUsuario().getPlaca());
            statement.setString(5, reserva.getUsuario().getCedula());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Reserva read(int reservaId) {
        String sql = "SELECT * FROM reservas WHERE reservaId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, reservaId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                Reserva reserva = new Reserva();
                reserva.getTicket().setId(resultSet.getInt("ticketId"));
                reserva.setInicio(resultSet.getDate("inicio"));
                reserva.setFin(resultSet.getDate("fin"));
                reserva.getUsuario().setPlaca(resultSet.getString("placa"));
                // Suponemos que el Usuario se obtiene por separado
                return reserva;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void update(Reserva reserva) {
        String sql = "UPDATE reservas SET ticketId = ?, inicio = ?, fin = ?, placa = ?, usuarioId = ? WHERE reservaId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, reserva.getTicket().getId());
            statement.setDate(2, reserva.getInicio());
            statement.setDate(3, reserva.getFin());
            statement.setString(4, reserva.getUsuario().getPlaca());
            statement.setString(5, reserva.getUsuario().getCedula());
            statement.setInt(6, reserva.getTicket().getId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void delete(Reserva reserva) {
        String sql = "DELETE FROM reservas WHERE reservaId = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, reserva.getTicket().getId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Reserva> findAll() {
        List<Reserva> reservas = new ArrayList<>();
        String sql = "SELECT * FROM reservas";
        try (PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                Reserva reserva = new Reserva();
                reserva.getTicket().setId(resultSet.getInt("ticketId"));
                reserva.setInicio(resultSet.getDate("inicio"));
                reserva.setFin(resultSet.getDate("fin"));
                reserva.getUsuario().setPlaca(resultSet.getString("placa"));
                // Suponemos que el Usuario se obtiene por separado
                reservas.add(reserva);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return reservas;
    }
}
