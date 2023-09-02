const buttonDelete = document.querySelector('.words__button');
  
buttonDelete.addEventListener('click', async (event) => {
  event.preventDefault();

  const selectedCheckboxes = document.querySelectorAll('.words__list-checkbox:checked');
  const wordIdsToDelete = Array.from(selectedCheckboxes).map(checkbox => checkbox.dataset.id);

  if (wordIdsToDelete.length === 0) {
    alert('Select words to delete.');
    return;
  }

  if (confirm('Are you sure you want to delete the selected words?')) {
    try {
      selectedCheckboxes.forEach(async checkbox => {
        const listItem = checkbox.closest('li');
        listItem.remove();

        const wordId = checkbox.dataset.id;
        try {
          const response = await fetch(`/`, {
            method: 'DELETE'
          });

          if (response.ok) {
            console.log('Word deleted successfully.');
            window.location.reload();
          } else {
            console.error('Error deleting word:', response.statusText);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      });

    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
});


