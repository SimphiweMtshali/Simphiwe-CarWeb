document.addEventListener("DOMContentLoaded", function () {
  var marketplace = window.CarHouseMarketplace;
  var savedRoot = document.getElementById("saved-vehicles");

  if (!marketplace || !savedRoot) {
    return;
  }

  var emptyState = document.getElementById("saved-empty");
  var savedCount = document.getElementById("saved-count");
  var savedBadge = document.getElementById("saved-badge");

  function renderSavedVehicles() {
    var favoriteIds = marketplace.getFavorites();
    var listings = marketplace.getListingsByIds(favoriteIds);

    savedCount.textContent = String(listings.length);
    savedBadge.textContent = listings.length === 1 ? "1 saved car" : listings.length + " saved cars";

    savedRoot.innerHTML = listings
      .map(function (listing) {
        return marketplace.createListingCard(listing, { detailLabel: "View Car" });
      })
      .join("");

    emptyState.hidden = listings.length > 0;
  }

  savedRoot.addEventListener("click", function (event) {
    var target = event.target.closest("[data-action='toggle-favorite']");

    if (!target) {
      return;
    }

    event.preventDefault();
    marketplace.toggleFavorite(target.getAttribute("data-id"));
  });

  window.addEventListener("carhouse:favorites-changed", renderSavedVehicles);
  renderSavedVehicles();
});
