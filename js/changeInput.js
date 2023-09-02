document.addEventListener('DOMContentLoaded', () => {
  const inputWord = document.querySelectorAll('.words__input-word');
  const inputTranscription = document.querySelectorAll('.words__input-transcription');
  const inputTranslation = document.querySelectorAll('.words__input-translation');

  inputWord.forEach((input) => {
    input.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const newValue = event.target.value;
        const word = event.target.getAttribute('placeholder');
        try {
          const response = await fetch('/', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ field: 'word', value: newValue, word: word }), // Добавьте слово в запрос
          });

          if (response.ok) {
            event.target.placeholder = newValue;
          } else {
            console.error('Error updating word:', response.status);
          }
        } catch (error) {
          console.error('Error updating word:', error);
        }
      }
    });
  });
});