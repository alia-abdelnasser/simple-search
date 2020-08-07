(function () {
    var searchUrl = 'https://my-json-server.typicode.com/alia-abdelnasser/simple-search/headlines';

    var searchInput = document.querySelector('#searchInput');

    var cards = document.querySelector('#cards');

    var submitBtn = document.querySelector('#submitBtn');

    function get(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            cb(JSON.parse(this.responseText));
        }
        xhr.open('GET', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    }

    function submitForm() {
        // disable button
        submitBtn.disabled = true;

        let term = searchInput.value.toLowerCase().trim();
        cards.innerHTML = '';

        get(searchUrl + '?keyword=' + term, function (res) {
            if (res[0] && res[0].articles && res[0].articles.length > 0) {
                res[0].articles.forEach(element => {
                    buildCard(element);
                });
            } else {
                buildCard({ title: "No data", description: "no result were returned", url: null })
            }
            // enable button
            submitBtn.disabled = false;
        });
    }

    function buildCard(article) {
        const div = document.createElement('div');
        let cardHtml = `
        <h3>${article.title}</h3>
        <small>${article.description} </small>
        `;
        if (article.url) {
            cardHtml += `<small><a href='${article.url}'>READ MORE</a></small>`;
        }

        div.insertAdjacentHTML('beforeend', cardHtml);

        cards.appendChild(div);
    }

    submitBtn.addEventListener('click', submitForm);
})();
