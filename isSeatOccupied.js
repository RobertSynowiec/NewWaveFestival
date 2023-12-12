function isSeatOccupied(seats, day, seat) {
    const occupiedSeat = seats.find(existingSeat => (
        (existingSeat.day === day || existingSeat.day === day - 1 || existingSeat.day === day + 1) &&
        existingSeat.seat === seat
    ));

    return !!occupiedSeat; // Zwraca true, jeśli miejsce jest zajęte, false w przeciwnym razie
}

module.exports = isSeatOccupied;