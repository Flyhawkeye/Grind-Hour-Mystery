const { DISCORD_TOKEN, DATABASE_URL, PRIZE_AMOUNT, NUM_BALLS_TO_DRAW, MAX_BALL_NUMBER } = process.env;
async function buyTicket(userId) {
  try {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user ID');
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const ticketNumber = await getNewTicketNumber();
    const ticket = new Ticket({ owner: user._id, number: ticketNumber });
    await ticket.save();
    return ticket;
  } catch (error) {
    console.error('Error buying ticket:', error);
    throw error;
  }
}

async function getNewTicketNumber() {
  try {
    const lastTicket = await Ticket.findOne().sort({ number: -1 });
    if (!lastTicket) {
      return 1;
    }
    return lastTicket.number + 1;
  } catch (error) {
    console.error('Error getting new ticket number:', error);
    throw error;
  }
}

async function resetDrawing() {
  try {
    await Ticket.deleteMany({});
    await Winner.deleteMany({});
  } catch (error) {
    console.error('Error resetting drawing:', error);
    throw error;
  }
}

module.exports = {
  pickWinner,
  updateDrawingResults,
  buyTicket,
  getNewTicketNumber,
  resetDrawing,
};