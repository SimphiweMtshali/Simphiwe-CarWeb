(function () {
  var FAVORITES_KEY = "carhouse-favorites";

  var listings = [
    {
      id: "vw-golf-hatchback",
      title: "Volkswagen Golf Hatchback",
      brand: "Volkswagen",
      bodyType: "Hatchback",
      year: 2022,
      price: 289900,
      mileage: 48000,
      transmission: "Automatic",
      fuel: "Petrol",
      location: "Johannesburg",
      sellerType: "Dealer",
      dealerName: "CarHouse Select",
      contactEmail: "info@CarHouse.com",
      contactPhone: "0000000000",
      badge: "Price Drop",
      postedDaysAgo: 2,
      color: "Silver",
      image: "../assets/img/images/buy-home/vw-golf-hatchback.webp",
      gallery: [
        "../assets/img/images/buy-home/vw-golf-hatchback.webp",
        "../assets/img/images/sell/car-aside-1.webp",
        "../assets/img/images/sell/car-aside-3.webp"
      ],
      description:
        "A polished hatchback option with strong everyday comfort, efficient running costs, and enough refinement for commuting or weekend driving.",
      features: ["Service History", "Reverse Camera", "Apple CarPlay", "Multi-Function Steering"]
    },
    {
      id: "bmw-320i-sedan",
      title: "BMW 320i Sedan",
      brand: "BMW",
      bodyType: "Sedan",
      year: 2021,
      price: 469900,
      mileage: 36000,
      transmission: "Automatic",
      fuel: "Petrol",
      location: "Cape Town",
      sellerType: "Dealer",
      dealerName: "City Luxury Hub",
      contactEmail: "info@CarHouse.com",
      contactPhone: "0000000000",
      badge: "Verified Dealer",
      postedDaysAgo: 4,
      color: "Black",
      image: "../assets/img/images/buy-home/bmw-sedan.webp",
      gallery: [
        "../assets/img/images/buy-home/bmw-sedan.webp",
        "../assets/img/images/sell/car-aside-2.webp",
        "../assets/img/images/sell/car-aside-5.webp"
      ],
      description:
        "A premium sedan with a composed ride, upscale cabin feel, and the kind of clean executive look many urban buyers want.",
      features: ["Leather Interior", "Parking Sensors", "Cruise Control", "Sunroof"]
    },
    {
      id: "mercedes-glc-suv",
      title: "Mercedes GLC SUV",
      brand: "Mercedes",
      bodyType: "SUV",
      year: 2020,
      price: 629900,
      mileage: 55000,
      transmission: "Automatic",
      fuel: "Diesel",
      location: "Pretoria",
      sellerType: "Dealer",
      dealerName: "City Luxury Hub",
      contactEmail: "info@CarHouse.com",
      contactPhone: "0000000000",
      badge: "Premium Pick",
      postedDaysAgo: 6,
      color: "White",
      image: "../assets/img/images/buy-home/mb-suv.webp",
      gallery: [
        "../assets/img/images/buy-home/mb-suv.webp",
        "../assets/img/images/sell/car-aside-4.webp",
        "../assets/img/images/sell/car-aside-6.webp"
      ],
      description:
        "A spacious SUV for buyers looking for comfort, elevated visibility, and a more premium family-friendly driving experience.",
      features: ["Panoramic Roof", "LED Headlights", "Powered Tailgate", "Navigation"]
    },
    {
      id: "ford-ranger-raptor",
      title: "Ford Ranger Raptor",
      brand: "Ford",
      bodyType: "Pickup",
      year: 2023,
      price: 799900,
      mileage: 18000,
      transmission: "Automatic",
      fuel: "Diesel",
      location: "Durban",
      sellerType: "Dealer",
      dealerName: "Utility & Adventure",
      contactEmail: "info@CarHouse.com",
      contactPhone: "0000000000",
      badge: "New Arrival",
      postedDaysAgo: 1,
      color: "Blue",
      image: "../assets/img/images/buy-home/raptor-camioneta.webp",
      gallery: [
        "../assets/img/images/buy-home/raptor-camioneta.webp",
        "../assets/img/images/sell/car-aside-6.webp",
        "../assets/img/images/sell/car-aside-1.webp"
      ],
      description:
        "A standout utility vehicle for buyers who need serious road presence, adventure-readiness, and strong load flexibility.",
      features: ["4x4", "Tow Package", "360 Camera", "Terrain Modes"]
    },
    {
      id: "toyota-corolla-cross",
      title: "Toyota Corolla Cross",
      brand: "Toyota",
      bodyType: "Crossover",
      year: 2022,
      price: 389900,
      mileage: 41000,
      transmission: "Automatic",
      fuel: "Hybrid",
      location: "Johannesburg",
      sellerType: "Dealer",
      dealerName: "CarHouse Select",
      contactEmail: "info@CarHouse.com",
      contactPhone: "0000000000",
      badge: "Fuel Saver",
      postedDaysAgo: 8,
      color: "Green",
      image: "../assets/img/images/landing-page/auto-verde.webp",
      gallery: [
        "../assets/img/images/landing-page/auto-verde.webp",
        "../assets/img/images/sell/car-aside-2.webp",
        "../assets/img/images/sell/car-aside-4.webp"
      ],
      description:
        "A practical crossover with efficient running costs, raised ride height, and a modern profile suited to everyday family use.",
      features: ["Hybrid Drive", "Blind Spot Monitor", "Rear Camera", "Keyless Start"]
    },
    {
      id: "honda-civic-sport",
      title: "Honda Civic Sport",
      brand: "Honda",
      bodyType: "Sedan",
      year: 2019,
      price: 259900,
      mileage: 72000,
      transmission: "Manual",
      fuel: "Petrol",
      location: "Cape Town",
      sellerType: "Private",
      dealerName: "Private Seller",
      contactEmail: "info@CarHouse.com",
      contactPhone: "0000000000",
      badge: "Private Seller",
      postedDaysAgo: 10,
      color: "Red",
      image: "../assets/img/images/landing-page/auto-rojo.webp",
      gallery: [
        "../assets/img/images/landing-page/auto-rojo.webp",
        "../assets/img/images/sell/car-aside-3.webp",
        "../assets/img/images/sell/car-aside-5.webp"
      ],
      description:
        "A sporty sedan option with driver-focused handling, strong reliability, and enough style to stand out in a busy segment.",
      features: ["Manual Gearbox", "Alloy Wheels", "Sport Seats", "Bluetooth"]
    },
    {
      id: "suzuki-swift-gl",
      title: "Suzuki Swift GL",
      brand: "Suzuki",
      bodyType: "Hatchback",
      year: 2021,
      price: 199900,
      mileage: 58000,
      transmission: "Manual",
      fuel: "Petrol",
      location: "Pretoria",
      sellerType: "Private",
      dealerName: "Private Seller",
      contactEmail: "info@CarHouse.com",
      contactPhone: "0000000000",
      badge: "Budget Friendly",
      postedDaysAgo: 3,
      color: "White",
      image: "../assets/img/images/sell/car-aside-1.webp",
      gallery: [
        "../assets/img/images/sell/car-aside-1.webp",
        "../assets/img/images/sell/car-aside-4.webp",
        "../assets/img/images/sell/car-aside-5.webp"
      ],
      description:
        "A compact hatchback with low running costs, easy parking, and the kind of everyday practicality first-time buyers appreciate.",
      features: ["Air Conditioning", "USB Audio", "Low Running Costs", "Partial Service History"]
    },
    {
      id: "nissan-xtrail-family",
      title: "Nissan X-Trail Family SUV",
      brand: "Nissan",
      bodyType: "SUV",
      year: 2020,
      price: 349900,
      mileage: 69000,
      transmission: "Automatic",
      fuel: "Petrol",
      location: "Durban",
      sellerType: "Dealer",
      dealerName: "Utility & Adventure",
      contactEmail: "info@CarHouse.com",
      contactPhone: "0000000000",
      badge: "Family Choice",
      postedDaysAgo: 7,
      color: "Grey",
      image: "../assets/img/images/sell/car-aside-6.webp",
      gallery: [
        "../assets/img/images/sell/car-aside-6.webp",
        "../assets/img/images/sell/car-aside-2.webp",
        "../assets/img/images/sell/car-aside-3.webp"
      ],
      description:
        "A comfortable family SUV with flexible cabin space, a relaxed driving feel, and enough practicality for road trips or school runs.",
      features: ["7 Seats", "Roof Rails", "Push Start", "Rear Air Vents"]
    }
  ];

  function readFavorites() {
    try {
      var value = window.localStorage.getItem(FAVORITES_KEY);
      if (!value) {
        return [];
      }

      var parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeFavorites(nextFavorites) {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    window.dispatchEvent(new CustomEvent("carhouse:favorites-changed", { detail: nextFavorites }));
  }

  function getFavorites() {
    return readFavorites();
  }

  function isFavorite(id) {
    return readFavorites().indexOf(id) >= 0;
  }

  function toggleFavorite(id) {
    var current = readFavorites();
    var exists = current.indexOf(id) >= 0;
    var nextFavorites = exists
      ? current.filter(function (item) { return item !== id; })
      : current.concat(id);

    writeFavorites(nextFavorites);
    return !exists;
  }

  function getListingById(id) {
    return listings.find(function (listing) {
      return listing.id === id;
    });
  }

  function getListingsByIds(ids) {
    return ids
      .map(function (id) { return getListingById(id); })
      .filter(Boolean);
  }

  function formatPrice(price) {
    return "R " + Number(price).toLocaleString("en-ZA");
  }

  function formatMileage(mileage) {
    return Number(mileage).toLocaleString("en-ZA") + " km";
  }

  function formatPostedAge(days) {
    if (days <= 0) {
      return "Added today";
    }

    if (days === 1) {
      return "Added yesterday";
    }

    return "Added " + days + " days ago";
  }

  function listingUrl(id) {
    return "./vehicle-details.html?id=" + encodeURIComponent(id);
  }

  function favoriteButtonLabel(id) {
    return isFavorite(id) ? "Saved" : "Save";
  }

  function createListingCard(listing, options) {
    var settings = options || {};
    var showMeta = settings.showMeta !== false;
    var showSave = settings.showSave !== false;
    var detailLabel = settings.detailLabel || "View Details";
    var favoriteLabel = favoriteButtonLabel(listing.id);
    var metaHtml = showMeta
      ? [
          '<div class="listing-card-meta">',
          "  <span>" + listing.year + "</span>",
          "  <span>" + listing.transmission + "</span>",
          "  <span>" + listing.location + "</span>",
          "</div>"
        ].join("")
      : "";

    var saveButtonHtml = showSave
      ? '<button class="listing-save-button" type="button" data-action="toggle-favorite" data-id="' +
        listing.id +
        '">' +
        favoriteLabel +
        "</button>"
      : "";

    return [
      '<article class="listing-card" data-id="' + listing.id + '">',
      '  <div class="listing-card-topline">',
      '    <span class="listing-badge">' + listing.badge + "</span>",
      '    <span class="listing-age">' + formatPostedAge(listing.postedDaysAgo) + "</span>",
      "  </div>",
      '  <a class="listing-card-link" href="' + listingUrl(listing.id) + '">',
      '    <img class="listing-card-image" src="' + listing.image + '" alt="' + listing.title + '">',
      '    <div class="listing-card-body">',
      '      <h3>' + listing.title + "</h3>",
      '      <p class="listing-price">' + formatPrice(listing.price) + "</p>",
      metaHtml,
      '      <p class="listing-description">' + listing.description + "</p>",
      "    </div>",
      "  </a>",
      '  <div class="listing-card-actions">',
      '    <a class="page-button alt listing-detail-button" href="' + listingUrl(listing.id) + '">' + detailLabel + "</a>",
      saveButtonHtml,
      "  </div>",
      "</article>"
    ].join("");
  }

  window.CarHouseMarketplace = {
    listings: listings,
    getFavorites: getFavorites,
    getListingById: getListingById,
    getListingsByIds: getListingsByIds,
    isFavorite: isFavorite,
    toggleFavorite: toggleFavorite,
    formatPrice: formatPrice,
    formatMileage: formatMileage,
    formatPostedAge: formatPostedAge,
    listingUrl: listingUrl,
    createListingCard: createListingCard
  };
})();
