/** Command-line tool to generate Markov text. */

const axios = require('axios'),
    fs = require('fs'),
    MarkovMachine = require('./markov');

const path = process.argv[3];

function makeTextFromFile() {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        const mm = new MarkovMachine(data);
        console.log(mm.makeText());    
    })
}

async function makeTextFromURL() {
    try {
        const {data} = await axios.get(path);
        const mm = new MarkovMachine(data);
        console.log(mm.makeText());    
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

if (process.argv[2] === 'file') {
    makeTextFromFile();
} else if (process.argv[2] === 'url') {
    makeTextFromURL();
}