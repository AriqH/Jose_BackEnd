import Reservation from "../models/ReservationModel.js";

export const getReservasi = async (req, res) =>{
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching reservations' });
  }
}
export const createReservation = async (req, res) => {
  const { name, date, email, jenisHewan, whatsapp, tujuan } = req.body;

  try {
    // Create a new reservation
    const reservation = await Reservation.create({
      name,
      date,
      email,
      jenisHewan,
      whatsapp,
      tujuan,
    });

    res.status(201).json({ message: 'Reservation successful', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while making the reservation' });
  }
};


