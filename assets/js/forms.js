(function () {
  function toArray(list) {
    return Array.prototype.slice.call(list || []);
  }

  function getInteractiveFields(form) {
    return toArray(form.querySelectorAll("input, select, textarea")).filter(function (field) {
      return ["hidden", "submit", "button", "reset"].indexOf(field.type) === -1;
    });
  }

  function getFieldWrapper(field) {
    return field.closest(".auth-field, .auth-check, .sign-up-field, .booking-field") || field.parentElement;
  }

  function getErrorNode(field) {
    var wrapper = getFieldWrapper(field);
    var errorNode = wrapper.querySelector(".field-error");

    if (!errorNode) {
      errorNode = document.createElement("p");
      errorNode.className = "field-error";
      wrapper.appendChild(errorNode);
    }

    return errorNode;
  }

  function getFormFeedback(form) {
    return form.querySelector(".form-feedback");
  }

  function showFormFeedback(form, type, message) {
    var feedback = getFormFeedback(form);

    if (!feedback) {
      return;
    }

    feedback.classList.remove("is-hidden", "is-error", "is-success");
    feedback.classList.add(type === "error" ? "is-error" : "is-success");
    feedback.textContent = message;
  }

  function clearFormFeedback(form) {
    var feedback = getFormFeedback(form);

    if (!feedback) {
      return;
    }

    feedback.classList.add("is-hidden");
    feedback.classList.remove("is-error", "is-success");
    feedback.textContent = "";
  }

  function clearFieldState(field) {
    var wrapper = getFieldWrapper(field);
    var errorNode = wrapper.querySelector(".field-error");

    wrapper.classList.remove("has-error", "is-valid");
    field.removeAttribute("aria-invalid");

    if (errorNode) {
      errorNode.textContent = "";
    }
  }

  function setFieldState(field, isValid, message) {
    var wrapper = getFieldWrapper(field);
    var errorNode = getErrorNode(field);
    var hasValue = field.type === "checkbox"
      ? field.checked
      : field.type === "file"
        ? field.files && field.files.length > 0
        : String(field.value || "").trim().length > 0;

    if (isValid) {
      wrapper.classList.remove("has-error");
      wrapper.classList.toggle("is-valid", hasValue);
      field.removeAttribute("aria-invalid");
      errorNode.textContent = "";
      return;
    }

    wrapper.classList.add("has-error");
    wrapper.classList.remove("is-valid");
    field.setAttribute("aria-invalid", "true");
    errorNode.textContent = message;
  }

  function requiredMessage(field) {
    var messages = {
      identity: "Please enter your email address or username.",
      password: "Please enter your password.",
      full_name: "Please enter your full name.",
      email: "Please enter your email address.",
      username: "Please choose a username.",
      phone: "Please enter a phone number we can use to reach you.",
      account_type: "Please choose how you want to use CarHouse first.",
      confirm_password: "Please type your password again.",
      terms: "Please agree to the terms and privacy preview.",
      brand: "Please tell us the brand of the vehicle.",
      model: "Please tell us the model of the vehicle.",
      year: "Please enter the vehicle year.",
      category: "Please choose the vehicle category.",
      color: "Please tell us the color of the vehicle.",
      description: "Please add a description for the vehicle.",
      kilometers: "Please enter the vehicle mileage.",
      motor: "Please enter the engine size or engine description.",
      images: "Please add at least 4 vehicle photos.",
      location: "Please choose where the vehicle is located.",
      owner: "Please tell us the owner's name.",
      price: "Please enter the price you want for the vehicle.",
      visitor_name: "Please enter your full name.",
      visitor_email: "Please enter your email address.",
      visitor_phone: "Please enter your phone number.",
      preferred_date: "Please choose a viewing date.",
      preferred_time: "Please choose a viewing time."
    };

    return messages[field.name] || "Please complete this field.";
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isPhone(value) {
    return /^[0-9+()\-\s]{7,}$/.test(value);
  }

  function todayIso() {
    return new Date().toISOString().split("T")[0];
  }

  function updateUploadCount(field) {
    if (!field || field.name !== "images") {
      return;
    }

    var counter = document.getElementById("upload-image-count");
    var uploadBox = field.closest(".upload-image-box");
    var count = field.files ? field.files.length : 0;

    if (!counter || !uploadBox) {
      return;
    }

    uploadBox.classList.toggle("is-ready", count >= 4);
    counter.classList.toggle("is-ready", count >= 4);

    if (count === 0) {
      counter.textContent = "Add at least 4 clear photos so buyers can see the vehicle properly.";
      return;
    }

    if (count < 4) {
      counter.textContent = count + " photo" + (count === 1 ? "" : "s") + " selected. Add " + (4 - count) + " more.";
      return;
    }

    counter.textContent = count + " photos selected. That meets the minimum and looks much better for buyers.";
  }

  function applyCustomRules(field, formType, form) {
    var value = field.type === "checkbox" ? field.checked : String(field.value || "").trim();
    var currentYear = new Date().getFullYear();
    var passwordField = form.querySelector('[name="password"]');

    field.setCustomValidity("");

    if (field.hasAttribute("required")) {
      if ((field.type === "checkbox" && !field.checked) || (field.type !== "checkbox" && field.type !== "file" && !value)) {
        field.setCustomValidity(requiredMessage(field));
        return;
      }

      if (field.type === "file" && (!field.files || field.files.length === 0)) {
        field.setCustomValidity(requiredMessage(field));
        return;
      }
    }

    switch (field.name) {
      case "identity":
        if (value && value.length < 3) {
          field.setCustomValidity("Use at least 3 characters for your email address or username.");
        }
        break;
      case "password":
        if (field.value && field.value.length < 8) {
          field.setCustomValidity("Your password should be at least 8 characters long.");
        }
        break;
      case "full_name":
        if (value && value.split(/\s+/).length < 2) {
          field.setCustomValidity("Please enter both your first name and surname.");
        }
        break;
      case "email":
      case "visitor_email":
        if (value && !isEmail(value)) {
          field.setCustomValidity("Please enter a valid email address.");
        }
        break;
      case "username":
        if (value && value.length < 3) {
          field.setCustomValidity("Your username should be at least 3 characters long.");
        }
        break;
      case "phone":
      case "visitor_phone":
        if (value && !isPhone(value)) {
          field.setCustomValidity("Please enter a phone number with at least 7 digits.");
        }
        break;
      case "confirm_password":
        if (field.value && field.value.length < 8) {
          field.setCustomValidity("Please confirm your password with at least 8 characters.");
        } else if (passwordField && field.value !== passwordField.value) {
          field.setCustomValidity("Your passwords do not match yet.");
        }
        break;
      case "year":
        if (value) {
          var numericYear = Number(value);

          if (numericYear < 1960 || numericYear > currentYear + 1) {
            field.setCustomValidity("Please enter a realistic vehicle year between 1960 and " + (currentYear + 1) + ".");
          }
        }
        break;
      case "description":
        if (value && value.length < 40) {
          field.setCustomValidity("Please write at least 40 characters so buyers understand the vehicle better.");
        }
        break;
      case "motor":
        if (value && value.length < 2) {
          field.setCustomValidity("Please add the engine size or engine description.");
        }
        break;
      case "brand":
      case "model":
      case "color":
      case "owner":
      case "visitor_name":
        if (value && value.length < 2) {
          field.setCustomValidity("Please add a little more detail here.");
        }
        break;
      case "images":
        if (!field.files || field.files.length < 4) {
          field.setCustomValidity("Please add at least 4 photos of the vehicle.");
        }
        updateUploadCount(field);
        break;
      case "preferred_date":
        if (value && value < todayIso()) {
          field.setCustomValidity("Please choose today or a future date for the viewing.");
        }
        break;
    }

    if (formType === "register" && field.name === "terms" && !field.checked) {
      field.setCustomValidity("Please agree to the terms and privacy preview.");
    }
  }

  function validateField(field, formType, form) {
    applyCustomRules(field, formType, form);
    setFieldState(field, field.checkValidity(), field.validationMessage);
    return field.checkValidity();
  }

  function validateForm(form, formType) {
    var firstInvalid = null;

    clearFormFeedback(form);

    getInteractiveFields(form).forEach(function (field) {
      field.dataset.touched = "true";

      if (!validateField(field, formType, form) && !firstInvalid) {
        firstInvalid = field;
      }
    });

    return firstInvalid;
  }

  function resetFormState(form) {
    getInteractiveFields(form).forEach(function (field) {
      field.dataset.touched = "";
      clearFieldState(field);
    });
  }

  function navigateTo(url) {
    window.location.href = url;
  }

  function handleSuccess(form, formType) {
    var redirect = form.getAttribute("data-success-redirect") || form.getAttribute("action");

    if (formType === "login") {
      navigateTo(redirect || "./profile.html");
      return;
    }

    if (formType === "register") {
      showFormFeedback(form, "success", "Your CarHouse account preview is ready. Taking you to the login page now.");
      window.setTimeout(function () {
        navigateTo(redirect || "./login.html?registered=1");
      }, 900);
      return;
    }

    if (formType === "sell") {
      showFormFeedback(form, "success", "Your listing details look complete. Opening the success page now.");
      window.setTimeout(function () {
        navigateTo(redirect || "./listing-success.html");
      }, 650);
      return;
    }

    if (formType === "viewing") {
      var vehicleTitle = (document.getElementById("vehicle-title") || {}).textContent || "this vehicle";
      var vehicleIdField = form.querySelector('[name="vehicle_id"]');
      var preservedVehicleId = vehicleIdField ? vehicleIdField.value : "";

      showFormFeedback(form, "success", "Your viewing request for " + vehicleTitle + " looks good. Because this is still a front-end preview, it was not sent to a live seller yet.");
      form.reset();
      resetFormState(form);

      if (vehicleIdField) {
        vehicleIdField.value = preservedVehicleId;
      }

      var dateField = form.querySelector('[name="preferred_date"]');

      if (dateField) {
        dateField.min = todayIso();
      }
    }
  }

  function bindFieldEvents(form, formType) {
    getInteractiveFields(form).forEach(function (field) {
      var liveEvent = field.tagName === "SELECT" || field.type === "checkbox" || field.type === "file" ? "change" : "input";

      field.addEventListener(liveEvent, function () {
        if (field.name === "images") {
          updateUploadCount(field);
        }

        if (field.dataset.touched === "true" || getFieldWrapper(field).classList.contains("has-error")) {
          validateField(field, formType, form);
        }
      });

      field.addEventListener("blur", function () {
        field.dataset.touched = "true";
        validateField(field, formType, form);
      });
    });
  }

  function setupSellForm(form) {
    var yearField = form.querySelector('[name="year"]');
    var imageField = form.querySelector('[name="images"]');

    if (yearField) {
      yearField.max = String(new Date().getFullYear() + 1);
    }

    if (imageField) {
      updateUploadCount(imageField);
    }
  }

  function setupViewingForm(form) {
    var dateField = form.querySelector('[name="preferred_date"]');

    if (dateField) {
      dateField.min = todayIso();
    }
  }

  function setupLoginSuccessMessage() {
    var params = new URLSearchParams(window.location.search);
    var loginForm = document.querySelector('form[data-form-type="login"]');

    if (params.get("registered") === "1" && loginForm) {
      showFormFeedback(loginForm, "success", "Your account preview has been created. You can sign in here and continue to your dashboard.");
    }
  }

  function normalizeFooterCopyright() {
    toArray(document.querySelectorAll(".footer h3")).forEach(function (heading) {
      if (heading.textContent.indexOf("Â©") >= 0) {
        heading.innerHTML = "&copy; 2022 CarHouse, Inc.";
      }
    });
  }

  function initForm(form) {
    var formType = form.getAttribute("data-form-type");

    bindFieldEvents(form, formType);

    if (formType === "sell") {
      setupSellForm(form);
    }

    if (formType === "viewing") {
      setupViewingForm(form);
    }

    form.addEventListener("submit", function (event) {
      var firstInvalid = validateForm(form, formType);

      event.preventDefault();

      if (firstInvalid) {
        showFormFeedback(form, "error", "Please fix the highlighted fields and try again.");
        firstInvalid.focus();
        return;
      }

      handleSuccess(form, formType);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    toArray(document.querySelectorAll("form[data-form-type]")).forEach(initForm);
    setupLoginSuccessMessage();
    normalizeFooterCopyright();
  });
})();
