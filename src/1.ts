import axios from 'axios';

const get = async () =>
  await axios.get('https://adventofcode.com/2018/day/1/input');

console.log(get());
