import browserData from "./data.js";

const pagination = document.getElementById("pagination"),
    prevButton = document.getElementById("prev"),
    nextButton = document.getElementById("next"),
    pageNumbers = document.getElementById("page-numbers"),
    tableHeading = document.getElementById("tableHeading"),
    tableBody = document.getElementById("tableBody"),
    itemsPerPageSelect = document.getElementById("itemsPerPageSelect"),
    searchBox = document.getElementById("search-box"),
    totalEntities = document.getElementById("totalEntities"),
    startIndex = document.getElementById("startIndex"),
    endIndex = document.getElementById("endIndex");
const sortState = Object.fromEntries(Object.keys(browserData[0]).map((key) => [key, "none"]));
const options = [10, 25, 50, 100];
let itemsPerPage = 10,
    currentPage = 1,
    filteredData = [...browserData],
    totalPages = Math.ceil(filteredData.length / itemsPerPage);

const createPagination = () => {
    pagination.innerHTML = `<button id="prev" class="${currentPage === 1 ? "disabled" : ""}">Previous</button>` + Array.from({ length: totalPages }, (element, i) => `<a href="#" data-page="${i + 1}" class="page-link${i + 1 === currentPage ? " active" : ""}">${i + 1}</a>`).join("") + `<button id="next" class="${currentPage === totalPages ? "disabled" : ""}">Next</button>`;
};

const displayPage = (page) => {
    const start = (page - 1) * itemsPerPage,
        end = Math.min(start + itemsPerPage, filteredData.length);
    startIndex.textContent = start + 1;
    endIndex.textContent = end;
    totalEntities.textContent = filteredData.length;
    tableBody.innerHTML = filteredData
        .slice(start, end)
        .map(
            (data) =>
                `<tr>${Object.values(data)
                    .map((val) => `<td>${val}</td>`)
                    .join("")}</tr>`
        )
        .join("");
};

const handleSort = (key, element) => {
    const state = (sortState[key] = sortState[key] === "asc" ? "desc" : "asc");
    element.querySelector("img").src = `./assets/sort-${state === "asc" ? "up" : "down"}.svg`;
    filteredData.sort((a, b) => (state === "asc" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])));
    displayPage(currentPage);
};

const generateTableHeading = () => {
    tableHeading.innerHTML = `<tr>${Object.keys(sortState)
        .map((key) => `<th>${key} <span class="sort-icon" data-key="${key}"><img src="./assets/sort.svg" alt="sort"></span></th>`)
        .join("")}</tr>`;
};

const handleSearch = (keyword) => {
    let keywordToSearch = keyword.toUpperCase();
    filteredData = browserData.filter((data) => {
        return data.renderingEngine.toUpperCase().includes(keywordToSearch) || data.browser.toUpperCase().includes(keywordToSearch) || data.cssGrade.toUpperCase().includes(keywordToSearch) || data.engineVersion.toUpperCase().includes(keywordToSearch);
    });
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    currentPage = 1;
    displayPage(currentPage);
    createPagination();
};

document.addEventListener("DOMContentLoaded", () => {
    generateTableHeading();
    itemsPerPageSelect.innerHTML = options.map((option) => `<option>${option}</option>`).join("");
    displayPage(currentPage);
    createPagination();

    searchBox.addEventListener("input", (e) => handleSearch(e.target.value));
    itemsPerPageSelect.addEventListener("change", (e) => {
        itemsPerPage = parseInt(e.target.value);
        totalPages = Math.ceil(filteredData.length / itemsPerPage);
        displayPage((currentPage = 1));
        createPagination();
    });

    pagination.addEventListener("click", (e) => {
        console.log(e.target.tagName);
        if (e.target.tagName === "A") {
            displayPage((currentPage = parseInt(e.target.dataset.page)));
            createPagination();
        } else if (e.target.id === "prev" && currentPage > 1) {
            displayPage(--currentPage);
            createPagination();
        } else if (e.target.id === "next" && currentPage < totalPages) {
            displayPage(++currentPage);
            createPagination();
        }
    });

    tableHeading.addEventListener("click", (e) => {
        // Find the anchestors of current event.target element that has .sort-icon class
        if (e.target.closest(".sort-icon")) handleSort(e.target.closest(".sort-icon").dataset.key, e.target.closest(".sort-icon"));
    });
});
