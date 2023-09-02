document.addEventListener('DOMContentLoaded', function () {
  const inputAddWord = document.querySelector('.header__addWord');
  const headerForm = document.querySelector('.header__form');
  const ulWordsList = document.querySelector('.words__list'); // Получаем список слов

  class EnglishList {
    constructor(newWord, newTranscription, newTranslation) {
      this.word = newWord;
      this.transcription = newTranscription;
      this.translation = newTranslation;
    }

    addWord(id) { 
      
      const newWordLi = document.createElement('li');
      newWordLi.className = 'words__list-word'; 

      const wordDiv = document.createElement('div');
      wordDiv.className = 'words__box-content'; 

      const inputWord = document.createElement('input');
      inputWord.className = 'words__input'; 
      inputWord.placeholder = this.word;
      inputWord.setAttribute('data-id',id)

      const inputTranscription = document.createElement('input');
      inputTranscription.className = 'words__input'; 
      inputTranscription.placeholder = this.transcription;
      inputTranscription.setAttribute('data-id',id)

      const inputTranslation = document.createElement('input');
      inputTranslation.className = 'words__input'; 
      inputTranslation.placeholder = this.translation;
      inputTranslation.setAttribute('data-id', id)

      wordDiv.appendChild(inputWord);
      wordDiv.appendChild(inputTranscription);
      wordDiv.appendChild(inputTranslation);

      newWordLi.appendChild(wordDiv);

      // Создание <input> для чекбокса
      const checkbox = document.createElement('input');
      checkbox.className = 'words__list-checkbox'; 
      checkbox.type = 'checkbox';
      checkbox.dataset.id = id; 

      newWordLi.appendChild(checkbox);

      ulWordsList.appendChild(newWordLi);
    }

    async saveToDatabase() {
      console.log('Saving data:', this.word, this.transcription, this.translation);

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            word: this.word,
            transcription: this.transcription,
            translation: this.translation,
          }),
        });

        if (response.ok) {
          const { _id } = await response.json(); 
          this.addWord(_id);
          console.log('Data saved successfully.');
        } else {
          console.error('Error saving data:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }

  headerForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const valueInput = inputAddWord.value;
    const boolean = splitWord(valueInput);
    if (boolean) {
      const [word, transcription, translation] = splitWord(valueInput);
      const englishList = new EnglishList(word, transcription, translation);
      englishList.saveToDatabase();
      window.location.reload();
    } else {
      const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
      errorModal.show();
    }
  });

  function splitWord(input) {
    const parts = input.split(' ');
    if (parts.length === 3) {
      const [word, transcription, translation] = parts;
      return [word, transcription, translation];
    } else {
      return false;
    }
  }
});
