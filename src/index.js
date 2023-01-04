require('dotenv').config();
const apiKey = process.env.PIXABAY_API_KEY;
console.log(apiKey);
console.log('as');
fetch(`https://pixabay.com/api/?key=${apiKey}&q=yellow+flowers&image_type=photo`).then(data => console.log(data));
