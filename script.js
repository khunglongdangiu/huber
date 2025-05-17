document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const giftBox = document.getElementById("gift-box");
  const giftElement = document.querySelector(".gift");
  const cardContainer = document.getElementById("card-container");
  const bookCover = document.querySelector(".book-cover");
  const spreads = document.querySelectorAll(".book-spread");
  const nextButtons = document.querySelectorAll(".btn-next");
  const prevButtons = document.querySelectorAll(".btn-prev");

  // Track current page spread
  let currentSpreadIndex = 0;
  // Track if we're in mobile view
  const isMobile = window.innerWidth < 768;
  // Mobile pages array
  let mobilePages = [];

  // Add drop sound when page loads
  setTimeout(function () {
    playDropSound();
  }, 500);

  // If we're on mobile, create additional mobile spreads
  if (isMobile) {
    setupMobileView();
  }

  // Open gift box
  giftElement.addEventListener("click", function () {
    // Add animation class to gift
    giftElement.classList.add("gift-open");

    // Play unwrap sound
    playUnwrapSound();

    // Start background music loop
    document
      .getElementById("bg-music")
      ?.play()
      .catch((e) => console.warn("bg music failed:", e));

    // Add some visual sparkles
    createSparkles(giftElement);

    // Wait for animation to complete then show the card
    setTimeout(function () {
      // Hide gift box with animation
      giftBox.classList.add("animate__animated", "animate__fadeOut");

      // Wait for gift box to fade out
      setTimeout(function () {
        giftBox.classList.add("d-none");

        // Show card container with animation
        cardContainer.classList.remove("d-none");
        cardContainer.classList.add("animate__animated", "animate__zoomIn");
      }, 500);
    }, 1000);
  });

  // Open the book when clicking on it
  bookCover.addEventListener("click", function (e) {
    e.stopPropagation();
    // Toggle the opened class to animate the book cover
    bookCover.classList.toggle("opened");

    // Add page turning sound effect
    playPageTurnSound();
  });

  // Gallery modal setup (Bootstrap)
  const galleryModal = new bootstrap.Modal(document.getElementById("imgModal"));
  const modalImg = document.getElementById("modal-img");
  document.querySelectorAll(".photo-grid img").forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function (e) {
      e.stopPropagation();
      modalImg.src = img.src;
      galleryModal.show();
    });
  });

  // Page navigation - Next
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-next")) {
      e.stopPropagation(); // Prevent event bubbling to card

      if (isMobile) {
        // Mobile navigation
        if (currentSpreadIndex < mobilePages.length - 1) {
          // Hide current page
          mobilePages[currentSpreadIndex].classList.add("d-none");

          // Show next page with animation
          currentSpreadIndex++;
          mobilePages[currentSpreadIndex].classList.remove("d-none");
          mobilePages[currentSpreadIndex].classList.add("page-transition");

          // Play page turn sound
          playPageTurnSound();
        }
      } else {
        // Desktop navigation
        if (currentSpreadIndex < spreads.length - 1) {
          // Hide current spread
          spreads[currentSpreadIndex].classList.add("d-none");

          // Show next spread with animation
          currentSpreadIndex++;
          spreads[currentSpreadIndex].classList.remove("d-none");
          spreads[currentSpreadIndex].classList.add("page-transition");

          // Play page turn sound
          playPageTurnSound();
        }
      }
    }
  });

  // Page navigation - Previous
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-prev")) {
      e.stopPropagation(); // Prevent event bubbling to card

      if (isMobile) {
        // Mobile navigation
        if (currentSpreadIndex > 0) {
          // Hide current page
          mobilePages[currentSpreadIndex].classList.add("d-none");

          // Show previous page with animation
          currentSpreadIndex--;
          mobilePages[currentSpreadIndex].classList.remove("d-none");
          mobilePages[currentSpreadIndex].classList.add("page-transition");

          // Play page turn sound
          playPageTurnSound();
        }
      } else {
        // Desktop navigation
        if (currentSpreadIndex > 0) {
          // Hide current spread
          spreads[currentSpreadIndex].classList.add("d-none");

          // Show previous spread with animation
          currentSpreadIndex--;
          spreads[currentSpreadIndex].classList.remove("d-none");
          spreads[currentSpreadIndex].classList.add("page-transition");

          // Play page turn sound
          playPageTurnSound();
        }
      }
    }
  });

  // Function to play drop sound
  function playDropSound() {
    const audio = new Audio();
    audio.src =
      "https://www.soundjay.com/mechanical/sounds/drop-on-floor-1.mp3";
    audio.volume = 0.4;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  }

  // Function to play unwrap sound
  function playUnwrapSound() {
    const audio = new Audio();
    audio.src = "https://www.soundjay.com/mechanical/sounds/paper-rip-3.mp3";
    audio.volume = 0.3;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  }

  // Function to play page turning sound
  function playPageTurnSound() {
    const audio = new Audio();
    audio.src = "https://www.soundjay.com/page-flip-sounds/page-flip-1.mp3";
    audio.volume = 0.5;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  }

  // Function to create sparkle effects
  function createSparkles(element) {
    const sparkleContainer = document.createElement("div");
    sparkleContainer.className = "sparkle-container";
    sparkleContainer.style.position = "absolute";
    sparkleContainer.style.top = "0";
    sparkleContainer.style.left = "0";
    sparkleContainer.style.width = "100%";
    sparkleContainer.style.height = "100%";
    sparkleContainer.style.pointerEvents = "none";
    sparkleContainer.style.zIndex = "10";

    // Create sparkles
    for (let i = 0; i < 30; i++) {
      createSparkle(sparkleContainer);
    }

    document.body.appendChild(sparkleContainer);

    // Remove after animation completes
    setTimeout(() => document.body.removeChild(sparkleContainer), 2000);
  }

  // Create individual sparkle
  function createSparkle(container) {
    const sparkle = document.createElement("div");
    const size = Math.random() * 10 + 5;

    // Random position around the gift
    const giftRect = giftElement.getBoundingClientRect();
    const centerX = giftRect.left + giftRect.width / 2;
    const centerY = giftRect.top + giftRect.height / 2;

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 150 + 50;

    const posX = centerX + Math.cos(angle) * distance;
    const posY = centerY + Math.sin(angle) * distance;

    sparkle.style.position = "absolute";
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.backgroundColor = getRandomColor();
    sparkle.style.borderRadius = "50%";
    sparkle.style.left = `${posX}px`;
    sparkle.style.top = `${posY}px`;
    sparkle.style.boxShadow = `0 0 ${size}px ${getRandomColor()}`;
    sparkle.style.animation = `sparkleAnim ${
      Math.random() * 1 + 0.5
    }s ease-out forwards`;
    sparkle.style.opacity = "0";
    sparkle.style.transform = "scale(0)";

    if (!document.getElementById("sparkle-keyframes")) {
      const style = document.createElement("style");
      style.id = "sparkle-keyframes";
      style.innerHTML = `
                @keyframes sparkleAnim {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(0); opacity: 0; }
                }
            `;
      document.head.appendChild(style);
    }
    container.appendChild(sparkle);
  }

  // Get random color
  function getRandomColor() {
    const colors = [
      "#ffdd00",
      "#ff8800",
      "#ff5500",
      "#ff0055",
      "#aa00ff",
      "#0088ff",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Remove animation class after animation completes
  document.addEventListener("animationend", function (e) {
    if (e.target.classList.contains("page-transition")) {
      e.target.classList.remove("page-transition");
    }
  });

  // Setup mobile view
  function setupMobileView() {
    mobilePages = [];
    spreads.forEach((spread) => {
      const rightPage = spread.querySelector(".book-page-right");
      if (rightPage) rightPage.style.display = "none";
      mobilePages.push(spread);
      if (rightPage) createMobilePage(rightPage, spread.id);
    });
    mobilePages.forEach((page, i) =>
      i === 0 ? page.classList.remove("d-none") : page.classList.add("d-none")
    );
    updateMobileNavigation();
  }

  function createMobilePage(rightPage, parentId) {
    const container = document.querySelector(".book-inner-pages");
    const mobilePage = document.createElement("div");
    mobilePage.classList.add("mobile-spread", "d-none");
    mobilePage.id = "mobile-" + parentId + "-right";
    const pageContainer = document.createElement("div");
    pageContainer.classList.add("book-page-left");
    const contentDiv = rightPage.querySelector(".page-content");
    if (contentDiv) {
      pageContainer.appendChild(contentDiv.cloneNode(true));
      mobilePage.appendChild(pageContainer);
      container.appendChild(mobilePage);
      mobilePages.push(mobilePage);
    }
  }

  function updateMobileNavigation() {
    mobilePages.forEach((page, index) => {
      const content = page.querySelector(".page-content");
      if (!content) return;
      let navDiv = content.querySelector(".page-nav");
      if (!navDiv) {
        navDiv = document.createElement("div");
        navDiv.classList.add("page-nav");
        content.appendChild(navDiv);
      } else {
        navDiv.innerHTML = "";
      }
      if (index > 0) {
        const prevBtn = document.createElement("button");
        prevBtn.classList.add("btn-prev");
        prevBtn.textContent = "← Previous";
        navDiv.appendChild(prevBtn);
      } else {
        navDiv
          .appendChild(document.createElement("span"))
          .classList.add("nav-spacer");
      }
      if (index < mobilePages.length - 1) {
        const nextBtn = document.createElement("button");
        nextBtn.classList.add("btn-next");
        nextBtn.textContent = "Next Page →";
        navDiv.appendChild(nextBtn);
      } else {
        navDiv
          .appendChild(document.createElement("span"))
          .classList.add("nav-spacer");
      }
    });
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth < 768 !== isMobile) location.reload();
  });

  // Preload Animation Classes
  ["animate__fadeOut", "animate__zoomIn", "page-transition"].forEach((cls) => {
    const tmp = document.createElement("div");
    tmp.style.opacity = "0";
    tmp.classList.add(cls);
    document.body.appendChild(tmp);
    setTimeout(() => document.body.removeChild(tmp), 10);
  });
});
