document.addEventListener("DOMContentLoaded", function () {
  var marketplace = window.CarHouseMarketplace;
  var catalogRoot = document.querySelector("[data-catalog-root]");

  if (!marketplace || !catalogRoot) {
    return;
  }

  var listingGrid = document.getElementById("catalog-results");
  var emptyState = document.getElementById("catalog-empty");
  var resultSummary = document.getElementById("catalog-summary");
  var searchInput = document.getElementById("catalog-search");
  var brandSelect = document.getElementById("catalog-brand");
  var bodyTypeSelect = document.getElementById("catalog-body-type");
  var transmissionSelect = document.getElementById("catalog-transmission");
  var sellerTypeSelect = document.getElementById("catalog-seller-type");
  var locationSelect = document.getElementById("catalog-location");
  var maxPriceInput = document.getElementById("catalog-max-price");
  var maxPriceOutput = document.getElementById("catalog-max-price-value");
  var sortSelect = document.getElementById("catalog-sort");
  var clearButton = document.getElementById("catalog-clear");
  var query = new URLSearchParams(window.location.search);

  function setSelectOptions(select, values) {
    values.forEach(function (value) {
      var option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  function uniqueValues(key) {
    return marketplace.listings
      .map(function (listing) { return listing[key]; })
      .filter(function (value, index, values) { return values.indexOf(value) === index; })
      .sort();
  }

  setSelectOptions(brandSelect, uniqueValues("brand"));
  setSelectOptions(bodyTypeSelect, uniqueValues("bodyType"));
  setSelectOptions(transmissionSelect, uniqueValues("transmission"));
  setSelectOptions(sellerTypeSelect, uniqueValues("sellerType"));
  setSelectOptions(locationSelect, uniqueValues("location"));

  if (query.get("brand")) {
    brandSelect.value = query.get("brand");
  }

  if (query.get("bodyType")) {
    bodyTypeSelect.value = query.get("bodyType");
  }

  function updatePriceOutput() {
    maxPriceOutput.textContent = marketplace.formatPrice(maxPriceInput.value);
  }

  function applyFilters() {
    var filtered = marketplace.listings.filter(function (listing) {
      var searchValue = searchInput.value.trim().toLowerCase();
      var matchesSearch = !searchValue || [
        listing.title,
        listing.brand,
        listing.bodyType,
        listing.location,
        listing.description
      ].join(" ").toLowerCase().indexOf(searchValue) >= 0;

      return matchesSearch &&
        (!brandSelect.value || listing.brand === brandSelect.value) &&
        (!bodyTypeSelect.value || listing.bodyType === bodyTypeSelect.value) &&
        (!transmissionSelect.value || listing.transmission === transmissionSelect.value) &&
        (!sellerTypeSelect.value || listing.sellerType === sellerTypeSelect.value) &&
        (!locationSelect.value || listing.location === locationSelect.value) &&
        listing.price <= Number(maxPriceInput.value);
    });

    var sortValue = sortSelect.value;

    filtered.sort(function (left, right) {
      if (sortValue === "price-asc") {
        return left.price - right.price;
      }

      if (sortValue === "price-desc") {
        return right.price - left.price;
      }

      if (sortValue === "mileage-asc") {
        return left.mileage - right.mileage;
      }

      return left.postedDaysAgo - right.postedDaysAgo;
    });

    listingGrid.innerHTML = filtered
      .map(function (listing) {
        return marketplace.createListingCard(listing, { detailLabel: "View Car" });
      })
      .join("");

    resultSummary.textContent = filtered.length + (filtered.length === 1 ? " vehicle found" : " vehicles found");
    emptyState.hidden = filtered.length > 0;
  }

  catalogRoot.addEventListener("click", function (event) {
    var target = event.target.closest("[data-action='toggle-favorite']");

    if (!target) {
      return;
    }

    event.preventDefault();
    marketplace.toggleFavorite(target.getAttribute("data-id"));
    applyFilters();
  });

  [searchInput, brandSelect, bodyTypeSelect, transmissionSelect, sellerTypeSelect, locationSelect, sortSelect].forEach(function (element) {
    element.addEventListener("input", applyFilters);
    element.addEventListener("change", applyFilters);
  });

  maxPriceInput.addEventListener("input", function () {
    updatePriceOutput();
    applyFilters();
  });

  clearButton.addEventListener("click", function () {
    searchInput.value = "";
    brandSelect.value = "";
    bodyTypeSelect.value = "";
    transmissionSelect.value = "";
    sellerTypeSelect.value = "";
    locationSelect.value = "";
    maxPriceInput.value = maxPriceInput.max;
    sortSelect.value = "newest";
    updatePriceOutput();
    applyFilters();
  });

  window.addEventListener("carhouse:favorites-changed", applyFilters);

  updatePriceOutput();
  applyFilters();
});
