(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/materials"

  const materialListData = [
    {
      heading: "Precision-Crafted Polymers",
      description: "Our earbuds are meticulously molded from high-quality plastics, ensuring a blend of elegance, comfort, and resilience that's second to none."
    },
    {
      heading: "Luxurious Silicone Harmony",
      description: "Our uniquely engineered ear tips are cocooned in plush silicone, delivering an opulent embrace for your ears, ensuring an unrivaled fit and exquisite audio experience."
    },
    {
      heading: "Rubberized Cables",
      description: "Experience the unparalleled freedom of movement with our flexible rubber cables that promise durability without compromise."
    },
    {
      heading: "Enhanced Comfort Sensors",
      description: "A touch of magic in the form of built-in microphones and sensors empowers your earbuds to obey your every command, making your audio journey seamless and enchanting."
    },
    {
      heading: "Artistic Mesh Guard",
      description: "Shielded by artful mesh screens, our speakers remain untarnished, keeping your listening experience pristine."
    }
  ];

  //functions
  function loadInfoBoxes() {

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      console.log(infoBoxes);

      infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      const titleElement = document.createElement('h2');
      titleElement.textContent = infoBox.heading;

      const textElement = document.createElement('p');
      textElement.textContent = infoBox.description;

      selected.appendChild(titleElement);
      selected.appendChild(textElement);
    });
    })
    .catch(error => {
      //make a meaningful error message and post to DOM
      console.log(error);
    });

   
  }
  loadInfoBoxes();

  function loadMaterialInfo() {

    //Add loader in HTML, write code to show it here

    //make AJAX Call here

     //this is the api url https://swiftpixel.com/earbud/api/materials"


    materialListData.forEach(material => {
      // clone the template li with h3 and p inside
      const clone = materialTemplate.content.cloneNode(true);
      // populate the cloned template
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading;

      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description;

      //Hide the loader

      //Append the populated template to the list
      materialList.appendChild(clone);
    })
  }
  loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

