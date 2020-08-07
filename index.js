(function () {
    var searchUrl = 'https://my-json-server.typicode.com/alia-abdelnasser/simple-search/articles';

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

        let term = searchInput.value.trim();

        get(searchUrl + '&q=' + term, function (res) {
            if (res.articles.length > 0) {
                res.articles.forEach(element => {
                    buildCard(element);
                });
            } else {
                buildCard({ title: "No data", description: "no result were returned", url: "#" })
            }
            // enable button
            submitBtn.disabled = false;
        });
    }

    function buildCard(article) {
        const div = document.createElement('div');
        div.insertAdjacentHTML('beforeend', `
            <h3>${article.title}</h3>
            <small>${article.description}</small>
            <a href='${article.url}'>Read ME</a>
        `);

        cards.appendChild(div);
    }

    submitBtn.addEventListener('click', submitForm);
})();
