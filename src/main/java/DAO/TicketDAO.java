package DAO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import iDAO.iTicket;
import objects.Ticket;

public class TicketDAO implements iTicket {
    private Connection connection;

    public TicketDAO(Connection connection) {
        this.connection = connection;
    }

    @Override
    public void create(Ticket ticket) {
        String sql = "INSERT INTO tickets (id, inicio, fin, usuarioId) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, ticket.getId());
            statement.setDate(2, ticket.getInicio());
            statement.setDate(3, ticket.getFin());
            statement.setString(4, ticket.getUsuario().getCedula());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Ticket read(int ticketId) {
        String sql = "SELECT * FROM tickets WHERE id = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, ticketId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                Ticket ticket = new Ticket();
                ticket.setId(resultSet.getInt("id"));
                ticket.setInicio(resultSet.getDate("inicio"));
                ticket.setFin(resultSet.getDate("fin"));
                // Suponemos que el Usuario se obtiene por separado
                return ticket;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void update(Ticket ticket) {
        String sql = "UPDATE tickets SET inicio = ?, fin = ?, usuarioId = ? WHERE id = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setDate(1, ticket.getInicio());
            statement.setDate(2, ticket.getFin());
            statement.setString(3, ticket.getUsuario().getCedula());
            statement.setInt(4, ticket.getId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void delete(Ticket ticket) {
        String sql = "DELETE FROM tickets WHERE id = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, ticket.getId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Ticket> findAll() {
        List<Ticket> tickets = new ArrayList<>();
        String sql = "SELECT * FROM tickets";
        try (PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                Ticket ticket = new Ticket();
                ticket.setId(resultSet.getInt("id"));
                ticket.setInicio(resultSet.getDate("inicio"));
                ticket.setFin(resultSet.getDate("fin"));
                // Suponemos que el Usuario se obtiene por separado
                tickets.add(ticket);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return tickets;
    }
}
