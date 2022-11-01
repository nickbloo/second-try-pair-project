const { client } = require('./index');

async function insertNewShow({ name, description, yearStarted, yearEnded }) {
    try {
        const { rows } = await client.query(`
            INSERT INTO "tvShows"(name,description,"yearStarted","yearEnded")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [name, description, yearStarted, yearEnded]);
        console.log("I am the result: ", rows)
    } catch (error) {
        console.log(error)
    }
};

async function insertNewMovie({ name, description, yearReleased, direction }) {
    try {
        const { rows } = await client.query(`
            INSERT INTO "movies"(name,description,"yearReleased",direction)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [name, description, yearReleased, direction]);
        console.log("I am the result: ", rows)
    } catch (error) {
        console.log(error)
    }
};

buildDB = async () => {
    try {
        client.connect();
        await insertNewShow({
            name: "Breaking Bad",
            description: "Crime drama",
            yearStarted: 2008,
            yearEnded: 2013
        });
        await insertNewShow({
            name: "Tv Show",
            description: "Crime drama",
            yearStarted: 2058,
            yearEnded: 2053
        });
        await insertNewMovie({
            name: "MovieOne",
            description: "Crime drama",
            yearReleased: 2008,
            direction: "DirectorOne"
        });
        await insertNewMovie({
            name: "MovieTwo",
            description: "Crime drama",
            yearReleased: 2009,
            direction: "DirectorTwo"
        });
        client.end();
    } catch (error) {
        console.log(error)
    }
}

buildDB();