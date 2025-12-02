(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loader = document.querySelector("#loader");

  // API URLs
  const materialBaseUrl = "https://swiftpixel.com/earbud/api/materials";
  const infoBoxBaseUrl = "https://swiftpixel.com/earbud/api/infoboxes";

  // Functions

  // Toggle Loader
  function toggleLoader(show) {
    if (show) {
      loader.classList.remove("hidden");
    } else {
      loader.classList.add("hidden");
    }
  }

  // Load Info Boxes
  function loadInfoBoxes() {
    fetch(infoBoxBaseUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(infoBoxes => {
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);
          if (selected) {
            const titleElement = document.createElement('h2');
            titleElement.textContent = infoBox.heading;

            const textElement = document.createElement('p');
            textElement.textContent = infoBox.description;

            selected.appendChild(titleElement);
            selected.appendChild(textElement);
          }
        });
      })
      .catch(error => {
        console.error("Error loading info boxes:", error);
      });
  }

  // Load Material Info
  function loadMaterialInfo() {
    // Show loader before fetching
    toggleLoader(true);

    fetch(materialBaseUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Connection error");
        }
        return response.json();
      })
      .then(materials => {
        // Populate the list
        materials.forEach(material => {
          // Clone the template
          const clone = materialTemplate.content.cloneNode(true);

          // Populate the cloned template
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          // Append to the list
          materialList.appendChild(clone);
        });

        // Hide loader after successful load
        toggleLoader(false);
      })
      .catch(error => {
        console.error("Error loading materials:", error);
        toggleLoader(false);

        // Show error message to user
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "⚠️ Unable to load materials. Please try again later.";
        errorMessage.classList.add("error-message");
        materialList.appendChild(errorMessage);
      });
  }

  // Show/Hide Info
  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event Listeners
  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  // Initialize
  loadInfoBoxes();
  loadMaterialInfo();

})();

