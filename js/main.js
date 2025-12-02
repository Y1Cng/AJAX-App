(() => {
  // Variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loader = document.querySelector("#loader");

  // API URLs
  const materialBaseUrl = "https://swiftpixel.com/earbud/api/materials";

  // Functions

  // Toggle Loader
  function toggleLoader(isShowing) {
    if (isShowing) {
      loader.classList.remove("hidden");
    } else {
      loader.classList.add("hidden");
    }
  }

  // Display Error
  function displayError(errorMessage) {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.textContent = errorMessage;
    materialList.appendChild(errorElement);
  }

  // Render Materials
  function renderMaterials(materials) {
    materials.forEach(material => {
      const clone = materialTemplate.content.cloneNode(true);
      const materialHeading = clone.querySelector(".material-heading");
      const materialDescription = clone.querySelector(".material-description");

      materialHeading.textContent = material.heading;
      materialDescription.textContent = material.description;

      materialList.appendChild(clone);
    });
  }

  // Handle Response
  function handleResponse(response) {
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    return response.json();
  }

  // Handle Data
  function handleData(data) {
    toggleLoader(false);
    renderMaterials(data);
  }

  // Handle Fetch Error
  function handleFetchError(error) {
    console.error("An error occurred:", error);
    toggleLoader(false);
    displayError("Unable to load materials. Please check your connection.");
  }

  // Load Material Info
  function loadMaterialInfo() {
    toggleLoader(true);

    fetch(materialBaseUrl)
      .then(handleResponse)
      .then(handleData)
      .catch(handleFetchError);
  }

  // Show/Hide Info
  function showInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event Listeners

  // Load materials on init
  loadMaterialInfo();

  // Hotspot event listeners
  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

