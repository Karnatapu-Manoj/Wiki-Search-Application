let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {

    let { title, link, description } = result;

    // creating Result Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    // creating Title Element
    let resultTitleEl = document.createElement("a");
    resultTitleEl.href = link;
    resultTitleEl.classList.add("result-title");
    resultTitleEl.target = "_blank";
    resultTitleEl.textContent = title;
    resultItemEl.appendChild(resultTitleEl);

    // creating break element
    let titleBreakEl = document.createElement('br');
    resultItemEl.appendChild(titleBreakEl);

    // creating URL element
    let urlEl = document.createElement('a');
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    // creating break element
    let lineBreakEl = document.createElement('br');
    resultItemEl.appendChild(lineBreakEl);

    //  creating description element
    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
};


function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    searchResultsEl.textContent = "";
    for (let result of searchResults) {
        console.log(result);
        createAndAppendSearchResult(result);
    };
};

function searchWikipedia(event) {

    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInputVal = searchInputEl.value;

        if (searchInputVal === "") {
            alert("please Enter a valid string to search in wikipedia\n\nBut your results for your Search, are as follows : ");
        }

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputVal;
        let options = {
            method: "GET"
        };
        fetch(url, options).then(function (response) {
            return response.json();
        })
            .then(function (jsondata) {
                console.log(jsondata);
                let { search_results } = jsondata;
                displayResults(search_results);
            });
    };


};

searchInputEl.addEventListener("keydown", searchWikipedia);