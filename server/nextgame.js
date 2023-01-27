const moment = require('moment-timezone');

const DAYS = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
};

const GAMES = [ // Should be sorted by day and then hour
    { day: DAYS.WEDNESDAY, hour: 12, min: 0 },
//    { day: DAYS.THURSDAY, hour: 17, min: 45 },
    { day: DAYS.FRIDAY, hour: 12, min: 0 }
];


const JD_MORGAN = {
    name: 'John D. Morgan Park',
    address: 'Budd Ave, Campbell, CA 95008',
    map: 'https://goo.gl/maps/kVcj8YexLuMiErtW6',
    min: 8
}

const JACK_FISCHER = {
    name: 'Jack Fischer Park',
    address: 'Abbott Ave & Pollard Road, Campbell, CA 95008',
    map: 'https://goo.gl/maps/LukrVq8mEJq',
    min: 6
}

const FRANK_SANTANA = {
    name: 'Frank Santana',
    address: '511 S Monroe St, San Jose, CA 95128',
    map: 'https://goo.gl/maps/ryyo7nf9LHHyay4B9',
    min: 6
}

const CREEKSIDE = {
    name: 'Creekside Turf Sports Park',
    address: '930 University Ave, Los Gatos, CA 95032',
    map: 'https://goo.gl/maps/MTDxuFUC2RT2',
    min: 6
}

const CREEKSIDE_CUP = {
    name: 'Creekside Park',
    address: '10455 Miller Ave, Cupertino, CA 95014',
    map: 'https://goo.gl/maps/7HvokgYZFsijn9TN7',
    min: 8
}

const JOHN_MISE = {
    name: 'John Mise Park',
    address: 'John Mise Ct, San Jose, CA 95129',
    map: 'https://goo.gl/maps/vvQXfGqnXznfwXyZ8',
    min: 8
}

const MANGO = {
    name: 'Mango Park',
    address: 'Mango Ave, Sunnyvale, CA 94087',
    map: 'https://goo.gl/maps/EEoEJYCcH3mu8KmV9',
    min: 6
}

const VENUES = {
    [DAYS.WEDNESDAY]: JOHN_MISE,
    [DAYS.THURSDAY]: MANGO,
    [DAYS.FRIDAY]: JOHN_MISE
}

const DETAILS = {
    [DAYS.WEDNESDAY]: 'https://pickupultimate.com/map/view/netflix',
    [DAYS.THURSDAY]: 'https://pickupultimate.com/map/view/roku',
    [DAYS.FRIDAY]: 'https://pickupultimate.com/map/view/netflix'
}

const RESET_TIME = .30;

/**
 * Handles figuring out which game time is next and then formats it into a human
 * readable string to display on the client.
 * @param {MomentTimezone} mmt - The time to base determine the next game time.
 * @return {string}
 */
const getNextGame = function(mmt) {
    const currTime = parseFloat(mmt.format('HH.mm'));
    const currDay = mmt.day();

    // Find the first game that is upcoming or use the first game
    const nextGame = GAMES.find(game => {
      return currDay < game.day || (game.day === currDay && currTime < game.hour + RESET_TIME);
    }) || GAMES[0];

    const nextGameDay = nextGame.day < currDay ? nextGame.day + 7 : nextGame.day;

    const nextGameMmt = mmt.day(nextGameDay).hour(nextGame.hour).minute(nextGame.min);
    const formattedNextGame = `${nextGameMmt.format('dddd, MMM Do YYYY')} at ${nextGameMmt.format('h:mm a')}`;

    return {
        time: formattedNextGame,
        venue: VENUES[nextGame.day],
        details: DETAILS[nextGame.day]
    }
};

// let testMmt;

// testMmt = moment("2018-05-04 12:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2018-05-07 09:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2018-05-09 12:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2018-05-10 12:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2018-05-11 12:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2018-05-12 09:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2017-06-27 09:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2017-06-28 09:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2017-06-28 11:14").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// console.log('Should switch to Friday')

// testMmt = moment("2017-06-28 11:15").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2017-06-29 09:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2017-06-30 09:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2017-06-30 11:14").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// console.log('Should switch to Wednesday')

// testMmt = moment("2017-06-30 11:15").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2017-07-01 09:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

// testMmt = moment("2017-07-02 09:30").tz('America/Los_Angeles');
// console.log(getNextGame(testMmt));

module.exports = getNextGame;
