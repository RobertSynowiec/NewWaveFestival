function isSeatOccupied(seats, day, seat) {
    const occupiedSeat = seats.find(existingSeat => (
        (existingSeat.day === day || existingSeat.day === day - 1 || existingSeat.day === day + 1) &&
        existingSeat.seat === seat
    ));

    return !!occupiedSeat;

}

module.exports = isSeatOccupied;