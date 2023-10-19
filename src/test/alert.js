document.addEventListener('DOMContentLoaded', function() {
    const showAlertButton = document.getElementById('showAlert');
    const alertContainer = document.getElementById('alertContainer');
    const alertList = document.getElementById('alertList');
    const closeAlertButton = document.getElementById('closeAlert');

    showAlertButton.addEventListener('click', function() {
        // Load alerts from alerts.json
        fetch('alerts.json')
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
});
