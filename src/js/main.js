import ProductList from "./components/ProductList.svelte";
import { renderHeaderFooter } from "./utils.mjs";

// new ProductList({
//   target: document.querySelector(".products"),
//   props: { category: "tents" },
// });

// Call to action-register with site
if (!localStorage.getItem("visitedBefore")) {
  document.getElementById("registrationModal").style.display = "block";
}

document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("registrationModal").style.display = "none";
});

localStorage.setItem("visitedBefore", "true");

showAlertButton.addEventListener('click', function() {
  // Load alerts from alerts.json
  fetch('../json/alerts.json')
      .then(response => response.json())
      .then(data => {
          if (data && data.length > 0) {
              alertList.innerHTML = ''; // Clear any existing alerts

              const alertSection = document.createElement('section');
              alertSection.className = 'alert-list';

              data.forEach(alert => {
                  const alertParagraph = document.createElement('p');
                  alertParagraph.textContent = alert.message;
                  alertParagraph.style.backgroundColor = alert.background;
                  alertParagraph.style.color = alert.color;
                  alertSection.appendChild(alertParagraph);
              });

              // Prepend the alert section to the main element
              const mainElement = document.querySelector('main');
              mainElement.insertBefore(alertSection, mainElement.firstChild);

              //alertContainer.classList.remove('hidden');
          } else {
              alertContainer.classList.add('hidden');
          }
      });
});

closeAlertButton.addEventListener('click', function() {
  console.log('Button clicks');
  alertContainer.classList.add('hidden');
});

renderHeaderFooter();
