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
    const ticket = new Ticket({ 
      owner: user._id, 
      number: ticketNumber, 
      balls: generateRandomBalls(NUM_BALLS_TO_DRAW, MAX_BALL_NUMBER) 
    });
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

function generateRandomBalls(numBalls, maxBallNumber) {
  const balls = [];
  for (let i = 0; i < numBalls; i++) {
    balls.push(Math.floor(Math.random() * maxBallNumber) + 1);
  }
  return balls;
}

async function pickWinner(drawingBalls) {
  try {
    if (!Array.isArray(drawingBalls) || drawingBalls.length !== NUM_BALLS_TO_DRAW) {
      throw new Error('Invalid drawing balls');
    }
    if (!drawingBalls.every((ball) => typeof ball === 'number' && ball >= 1 && ball <= MAX_BALL_NUMBER)) {
      throw new Error('Invalid drawing ball values');
    }
    const tickets = await Ticket.find();
    let winner;
    for (const ticket of tickets) {
      if (ticket.balls.every((ball, index) => ball === drawingBalls[index])) {
        winner = ticket;
        break;
      }
    }
    if (winner) {
      await Winner.create({ ticket: winner._id });
    }
    return winner;
  } catch (error) {
    console.error('Error picking winner:', error);
    throw error;
  }
}

async function updateDrawingResults(drawingBalls) {
  try {
    if (!Array.isArray(drawingBalls) || drawingBalls.length !== NUM_BALLS_TO_DRAW) {
      throw new Error('Invalid drawing balls');
    }
    if (!drawingBalls.every((ball) => typeof ball === 'number' && ball >= 1 && ball <= MAX_BALL_NUMBER)) {
      throw new Error('Invalid drawing ball values');
    }
    const winner = await Winner.findOne().sort({ createdAt: -1 });
    const tickets = await Ticket.find();
    const results = {
      winner: winner ? winner.ticket : null,
      tickets: tickets.map((ticket) => ({ 
        number: ticket.number, 
        balls: ticket.balls, 
        isWinner: ticket._id.toString() === winner.ticket.toString() 
      })),
      drawingBalls,
    };
    return results;
  } catch (error) {
    console.error('Error updating drawing results:', error);
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