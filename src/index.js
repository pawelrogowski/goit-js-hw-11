const apiKey = '32579471-afdc8e0303a1983f0362481fc';

fetch(`https://pixabay.com/api/?key=${apiKey}&q=yellow+flowers&image_type=photo`).then(data => console.log(data));
