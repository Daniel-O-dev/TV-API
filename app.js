const form = document.getElementById('searchForm');
const userInput = document.getElementById('searchInput');
const tbody = document.getElementById('tBody');
const tbl = document.getElementById('tbl');

tbl.hidden = true


form.addEventListener('keyup', async (e) => {
    e.preventDefault();
tbl.hidden = false

    tbody.innerText = '';

    const res = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${userInput.value}`
    );

    for (let i = 0; i < res.data.length; i++) {
        const tr = document.createElement('tr');
        const titleName = document.createElement('td');
        const summary = document.createElement('td');
        const image = document.createElement('img');

        // Adds image
        image.classList.add('image-box');
        try {
            image.src = await res.data[i].show.image.medium;
        } catch {
            image.src = 'image.png';
        }
        tr.append(image);

        // adds title
        titleName.innerText = await res.data[i].show.name;
        tr.append(titleName);
        if (titleName.innerText === '') {
            titleName.innerText = 'Title unavailable';
        } ``;


        // Fills summary section
        summary.innerHTML = await res.data[i].show.summary;
        summary.classList.add('summary');
        tr.append(summary);
        if (summary.innerHTML === '') {
            summary.innerHTML = 'Summary unavailable';
        }
        tbody.append(tr);


    }

    // Prompts start typing when necessary or alerts them that a particular show in unavaliable
    if (tbody.innerHTML === '' && userInput.value === '') {
        noResults = document.getElementById('noResults');
        noResults.innerHTML = "Start typing to search";
    } else if(tbody.innerHTML === '') {
         noResults = document.getElementById('noResults');
        noResults.innerHTML = "No results";
    } else {
        noResults.innerHTML = '';
    }




});
