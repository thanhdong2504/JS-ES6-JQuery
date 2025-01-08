import browserData from "./data.js";

const pagination = document.getElementById("pagination");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pageNumbers = document.getElementById("page-numbers");
const table = document.getElementById("wholeTable");
const tableBody = document.getElementById("tableBody");
const itemsPerPageSelect = document.getElementById("itemsPerPageSelect");
const searchBox = document.getElementById("search-box");
const sortIcons = document.getElementsByClassName("sort-icon");
const sortState = {
    renderingEngine: "none",
    browser: "none",
    platforms: "none",
    engineVersion: "none",
    cssGrade: "none",
};

let pageLinks = document.getElementsByClassName("page-link");
let itemsPerPage = 10; // default value
let currentPage = 1;
let totalPages = Math.ceil(browserData.length / itemsPerPage);
let filteredData = [...browserData];

document.addEventListener("DOMContentLoaded", () => {
    displayPage(currentPage);
    createPaginationLinks();
    updatePagination();

    document.getElementById("totalEntities").textContent = filteredData.length;

    searchBox.addEventListener("keyup", searchFunction);
});

function createPaginationLinks() {
    pagination.innerHTML = "";
    pagination.appendChild(prevButton);
    for (let i = 0; i < totalPages; i++) {
        const links = document.createElement("a");
        links.setAttribute("href", "#");
        links.setAttribute("data-page", i + 1);
        links.classList.add("page-link");
        links.textContent = `${i + 1}`;

        links.addEventListener("click", (e) => {
            e.preventDefault();
            currentPage = parseInt(e.target.getAttribute("data-page"));
            displayPage(currentPage);
            updatePagination();
        });

        pagination.appendChild(links);
    }
    pagination.appendChild(nextButton);
}

// Display items for a specific page
function displayPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

    document.getElementById("startIndex").textContent = startIndex + 1;
    document.getElementById("endIndex").textContent = endIndex;
    document.getElementById("totalEntities").textContent = filteredData.length;

    tableBody.innerHTML = "";

    filteredData.slice(startIndex, endIndex).forEach((data, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${data.renderingEngine}</td>
        <td>${data.browser}</td>
        <td>${data.platforms}</td>
        <td>${data.engineVersion}</td>
        <td>${data.cssGrade}</td>`;

        tableBody.appendChild(row);
    });
}

// Function to update pagination buttons and page numbers
function updatePagination() {
    // Update page numbers
    pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;

    // Update pagination buttons
    prevButton.classList.remove("disabled");
    nextButton.classList.remove("disabled");
    if (currentPage === 1) prevButton.classList.add("disabled");

    if (currentPage === totalPages) nextButton.classList.add("disabled");

    pageLinks = document.getElementsByClassName("page-link");
    // Update active page
    Array.from(pageLinks).forEach((link) => {
        const linkPage = parseInt(link.getAttribute("data-page"));

        link.classList.toggle("active", linkPage === currentPage);
    });
}

function searchFunction(e) {
    let keywordToSearch = e.target.value.toUpperCase();
    filteredData = browserData.filter((data) => {
        return data.renderingEngine.toUpperCase().includes(keywordToSearch) || data.browser.toUpperCase().includes(keywordToSearch) || data.cssGrade.toUpperCase().includes(keywordToSearch) || data.engineVersion.toUpperCase().includes(keywordToSearch);
    });

    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    currentPage = 1;
    displayPage(currentPage);
    createPaginationLinks();
    updatePagination();
}

// Set event listener for "Previous" button
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updatePagination();
    }
});

// Set event listener for "Next" button
nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
        updatePagination();
    }
});

// Set event listener for select entity button
itemsPerPageSelect.addEventListener("change", (e) => {
    itemsPerPage = parseInt(e.target.value);
    totalPages = Math.ceil(browserData.length / itemsPerPage);
    currentPage = 1;
    displayPage(currentPage);
    createPaginationLinks();
    updatePagination();
});

// Set event listener for sort icons
Array.from(sortIcons).forEach((icon, index) => {
    icon.addEventListener("click", () => {
        const columns = Object.keys(sortState);
        const columnKey = columns[index];

        // Reset all sort states and icons first
        for (let state in sortState) {
            if (state === columnKey) {
                // Toggle sort state for clicked column
                sortState[state] = sortState[state] === "asc" ? "desc" : "asc";
            } else {
                // Reset other columns
                sortState[state] = "none";
            }

            // Update all icons
            const columnIndex = columns.indexOf(state);
            const columnIcon = sortIcons[columnIndex].querySelector("img");
            if (sortState[state] === "none") {
                columnIcon.src = "./assets/sort.svg";
            } else if (sortState[state] === "asc") {
                columnIcon.src = "./assets/sort-up.svg";
            } else {
                columnIcon.src = "./assets/sort-down.svg";
            }
        }

        // Sort data
        filteredData.sort((a, b) => {
            if (sortState[columnKey] === "asc") {
                if (!isNaN(a[columnKey])) {
                    return parseInt(a[columnKey]) - parseInt(b[columnKey]);
                }
                return a[columnKey].localeCompare(b[columnKey]);
            } else {
                if (!isNaN(a[columnKey])) {
                    return parseInt(b[columnKey]) - parseInt(a[columnKey]);
                }
                return b[columnKey].localeCompare(a[columnKey]);
            }
        });

        // Redisplay currentPage
        displayPage(currentPage);
    });
});
