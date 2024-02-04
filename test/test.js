import fs from 'fs';
import nbt from 'nbt';
import minimist from 'minimist';
import { globSync } from 'glob';
import path from 'path';

function removeQuotes(input) {
  return input.substring(1, input.length - 1);
}

//var data = fs.readFileSync('./data/player.dat');
const args = minimist(process.argv.slice(2));

// Check if arguments are supplied
if (!args.mcworld)
  throw Error(
    'Argument for "mcworld" not supplied. This should be the path to your minecraft world.'
  );
if (!args.input)
  throw Error(
    'Argument for "input" not supplied. This should be the path the json file created by Text2Book.'
  );

// Get inputdata
let inputfile;
try {
  inputfile = fs.readFileSync(args.input);
} catch (e) {
  throw Error('Could not load input file, did you input the correct file path?');
}

// Try to parse inputdata
try {
  inputfile = JSON.parse(inputfile);
} catch (e) {
  throw Error('Could not parse inputfile, is it a JSON file generated by Text2Book?');
}

// Get playerdata
let playerdata;
try {
  playerdata = fs.readFileSync(
    globSync(path.join(args.mcworld, 'playerdata') + '/*.dat')[0]
  );
} catch (e) {
  throw Error(
    'Failed to find player inventory file, did you input the correct folder path?'
  );
}

nbt.parse(playerdata, function (error, data) {
  if (error) throw error;
  let targetBook = null;

  // Check for any book named 'text2book'
  data.value.Inventory.value.value.forEach((item) => {
    if (item.id.value === 'minecraft:written_book') {
      if (item.tag.value.title.value === 'text2book') {
        targetBook = item.tag.value;
        return;
      }
    }
  });

  // Throw error if the book is not found
  if (targetBook === null) {
    throw Error(
      'Could not find a written book with the title "text2book" in the players inventory.'
    );
  }

  // Defined for later
  const author = targetBook.author.value;
  const title = targetBook.title.value;
  const pages = targetBook.pages.value.value;

  // Define results for later
  const results = {
    success: [],
    fail: [],
  };

  // Go trough each page and compare Text2Book output with the Minecraft book contents
  pages.forEach((page, index) => {
    const io = { expected: inputfile[index], got: page, page: index };
    if (removeQuotes(page) !== inputfile[index]) {
      results.fail.push(io);
    } else {
      results.success.push(io);
    }
  });

  // Logs either a fail message or success message depending on results
  if (results.fail.length > 0) {
    console.log('FAIL! Text2Book output did not match book contents.');
    console.log(
      results.fail.length + '/' + pages.length + ' pages did not match output.\n'
    );

    results.fail.forEach((item) => {
      console.log(
        `P${item.page} - Expected: \x1b[33m${item.expected}\x1b[0m, Got: \x1b[31m${removeQuotes(item.got)}\x1b[0m`
      );
    });
  } else {
    console.log('SUCCESS! Text2Book output matches Minecraft book contents.');
  }
});
