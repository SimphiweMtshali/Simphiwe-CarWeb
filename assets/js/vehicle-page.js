document.addEventListener("DOMContentLoaded", function () {
  var marketplace = window.CarHouseMarketplace;
  var detailRoot = document.querySelector("[data-vehicle-root]");

  if (!marketplace || !detailRoot) {
    return;
  }

  var query = new URLSearchParams(window.location.search);
  var listingId = query.get("id") || marketplace.listings[0].id;
  var listing = marketplace.getListingById(listingId) || marketplace.listings[0];
  var relatedRoot = document.getElementById("related-vehicles");
  var favoriteButton = document.getElementById("vehicle-save-button");
  var mainImage = document.getElementById("vehicle-main-image");
  var thumbnails = document.getElementById("vehicle-thumbnails");

  document.title = "CarHouse - " + listing.title;
  document.getElementById("vehicle-title").textContent = listing.title;
  document.getElementById("vehicle-hero-copy").textContent = listing.description;
  document.getElementById("vehicle-price").textContent = marketplace.formatPrice(listing.price);
  document.getElementById("vehicle-location").textContent = listing.location;
  document.getElementById("vehicle-age").textContent = marketplace.formatPostedAge(listing.postedDaysAgo);
  document.getElementById("vehicle-overview-body").textContent = listing.bodyType;
  document.getElementById("vehicle-overview-year").textContent = String(listing.year);
  document.getElementById("vehicle-overview-fuel").textContent = listing.fuel;
  document.getElementById("vehicle-overview-transmission").textContent = listing.transmission;
  document.getElementById("vehicle-overview-mileage").textContent = marketplace.formatMileage(listing.mileage);
  document.getElementById("vehicle-overview-seller").textContent = listing.sellerType;
  document.getElementById("vehicle-description").textContent = listing.description;
  document.getElementById("vehicle-dealer-name").textContent = listing.dealerName;
  document.getElementById("vehicle-dealer-copy").textContent =
    listing.sellerType === "Dealer"
      ? "Verified dealership support, finance-friendly assistance, and guided appointment booking."
      : "Private seller listing with direct contact and viewing coordination.";

  document.getElementById("vehicle-email-link").href =
    "mailto:" + listing.contactEmail + "?subject=" + encodeURIComponent("Vehicle Inquiry: " + listing.title);
  document.getElementById("vehicle-call-link").href = "tel:" + listing.contactPhone;
  document.getElementById("vehicle-viewing-mail-link").href =
    "mailto:" + listing.contactEmail + "?subject=" + encodeURIComponent("Book Viewing: " + listing.title);
  document.getElementById("vehicle-viewing-link").href = "#vehicle-viewing-form-section";
  document.getElementById("viewing-form-copy").textContent =
    "Request a viewing for the " + listing.title + ". Add your details below and the seller can follow up with the best appointment time.";
  document.getElementById("viewing-vehicle-id").value = listing.id;

  mainImage.src = listing.image;
  mainImage.alt = listing.title;

  thumbnails.innerHTML = listing.gallery
    .map(function (image, index) {
      return (
        '<button class="vehicle-thumb' +
        (index === 0 ? " is-active" : "") +
        '" type="button" data-image="' +
        image +
        '">' +
        '<img src="' +
        image +
        '" alt="' +
        listing.title +
        " preview " +
        (index + 1) +
        '">' +
        "</button>"
      );
    })
    .join("");

  document.getElementById("vehicle-features").innerHTML = listing.features
    .map(function (feature) {
      return '<span class="tag-pill">' + feature + "</span>";
    })
    .join("");

  relatedRoot.innerHTML = marketplace.listings
    .filter(function (candidate) {
      return candidate.id !== listing.id && (
        candidate.brand === listing.brand ||
        candidate.bodyType === listing.bodyType
      );
    })
    .slice(0, 3)
    .map(function (candidate) {
      return marketplace.createListingCard(candidate, { detailLabel: "Open Listing", showSave: false });
    })
    .join("");

  function syncFavoriteButton() {
    favoriteButton.textContent = marketplace.isFavorite(listing.id) ? "Saved to Profile" : "Save to Profile";
  }

  detailRoot.addEventListener("click", function (event) {
    var thumb = event.target.closest(".vehicle-thumb");

    if (thumb) {
      mainImage.src = thumb.getAttribute("data-image");
      Array.prototype.slice.call(thumbnails.querySelectorAll(".vehicle-thumb")).forEach(function (button) {
        button.classList.remove("is-active");
      });
      thumb.classList.add("is-active");
      return;
    }

    if (event.target.closest("#vehicle-save-button")) {
      marketplace.toggleFavorite(listing.id);
      syncFavoriteButton();
    }
  });

  window.addEventListener("carhouse:favorites-changed", syncFavoriteButton);
  syncFavoriteButton();
});
