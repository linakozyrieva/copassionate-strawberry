
function enlargeImage(imageId) {
    const image = document.getElementById(imageId);
    const word = document.querySelector(`span[onclick="enlargeImage('${imageId}')"]`);
  
    if (image && word) {
      image.classList.toggle('enlarged');
  
      document.addEventListener('click', function handleClickOutside(event) {
        if (!word.contains(event.target)) {
          image.classList.remove('enlarged');
          document.removeEventListener('click', handleClickOutside);
        }
      });
    }
  }

  
  document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-review'); 
    const reviewTextarea = document.getElementById('review-textarea'); 
    const submittedReviewsContainer = document.getElementById('submitted-reviews'); 
    const toggleButton = document.createElement('button'); 
  
    toggleButton.id = 'see-more'; 
    toggleButton.textContent = 'See More';
    toggleButton.style.display = 'none'; 
  
    submittedReviewsContainer.parentNode.appendChild(toggleButton); 
  
    let isExpanded = false; 
  
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || []; 
  
    function displayReviews() {
      submittedReviewsContainer.innerHTML = ''; 
  
      const visibleReviews = isExpanded ? storedReviews : storedReviews.slice(0, 2); 
      visibleReviews.forEach((reviewText, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
  
        const deleteIcon = document.createElement('img');
        deleteIcon.setAttribute('class', 'delete-icon');
        deleteIcon.setAttribute('src', '/images/icons/delete.svg'); 
        deleteIcon.setAttribute('alt', 'Delete');
        deleteIcon.setAttribute('width', '20');
        deleteIcon.setAttribute('height', '20');
  
        deleteIcon.style.filter = 'invert(81%) sepia(43%) saturate(521%) hue-rotate(318deg) brightness(94%) contrast(87%)';
  
        reviewItem.textContent = reviewText; 
        reviewItem.appendChild(deleteIcon); 
  
        submittedReviewsContainer.appendChild(reviewItem);
  
        deleteIcon.addEventListener('click', function () {
          storedReviews.splice(index, 1);
  
          localStorage.setItem('reviews', JSON.stringify(storedReviews));
  
          displayReviews();
          updateToggleButtonVisibility();
        });
      });
  
      updateToggleButtonVisibility();
    }
  
    function updateToggleButtonVisibility() {
      if (storedReviews.length > 2) {
        toggleButton.style.display = 'block'; 
        toggleButton.textContent = isExpanded ? 'See Less' : 'See More';
      } else {
        toggleButton.style.display = 'none'; 
      }
    }
  
    displayReviews();
  
    toggleButton.addEventListener('click', function () {
      isExpanded = !isExpanded; 
      displayReviews(); 
    });
  
    submitButton.addEventListener('click', function (e) {
      e.preventDefault(); 
  
      const reviewText = reviewTextarea.value.trim(); 
  
      if (reviewText) {
        storedReviews.push(reviewText);
  
        localStorage.setItem('reviews', JSON.stringify(storedReviews));
  
        displayReviews();
  
        reviewTextarea.value = '';
      } else {
        alert('Please write a review before submitting!');
      }
    });
  });

