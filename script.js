// Slider top banner
$(document).ready(function () {
    $('.your-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    });
});

// Sidebar
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
});

// api data 
const API_URL = "https://ecomm.dotvik.com/v2kart/service/categories/men/tree";
const container = document.getElementById("megaMenuContainer");

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const categories = data?.data?.childCategory || [];

        const columns = Array.from({ length: 7 }, () => []);

        categories.forEach((cat, index) => {
            columns[index % 7].push(cat);
        });

        const columnHeadings = [
            "BOTTOM WEAR",
            "FOOT WEAR",
            "WINTER WEAR",
            "INDIAN",
            "New Arrivals",
            "Popular",
            "Explore"
        ];

        columns.forEach((columnItems, idx) => {
            const colDiv = document.createElement("div");

            const heading = document.createElement("h3");
            heading.textContent = columnHeadings[idx] || "Category";
            heading.className = "text-red-500 text-sm font-semibold mb-2 uppercase";
            colDiv.appendChild(heading);

            const ul = document.createElement("ul");
            columnItems.forEach((item) => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="#" class="block py-1 text-gray-700 hover:text-red-500 text-sm">${item.categoryName}</a>`;
                ul.appendChild(li);
            });

            colDiv.appendChild(ul);
            container.appendChild(colDiv);
        });
    })
    .catch((err) => {
        console.error("Error fetching data:", err);
        container.innerHTML = `<p class="text-red-500">Failed to load categories.</p>`;
    });