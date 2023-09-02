document.addEventListener('DOMContentLoaded', function () {
  const inputAddWord = document.querySelector('.header__addWord');
  const headerForm = document.querySelector('.header__form');
  const UlWord = document.querySelector('.words__list-word');
  
  const UlTranscription = document.querySelector('.words__list-transcription');
  const UlTranslation = document.querySelector('.words__list-translation');

  class EnglishList {
    constructor(newWord, newTranscription, newTranslation) {
      this.word = newWord;
      this.transcription = newTranscription;
      this.translation = newTranslation;
    }
    addWord() {
      // Создание нового элемента <li>
      const newWordLi = document.createElement('li');
      newWordLi.className = 'words__list-word'; // Добавляем класс
    
      // Создание <div> для группировки элементов
      const wordDiv = document.createElement('div');
      wordDiv.className = 'words__box-content'; // Добавляем класс
    
      // Создание <input> для слова, транскрипции и перевода
      const inputWord = document.createElement('input');
      inputWord.className = 'words__input'; // Добавляем класс
      inputWord.placeholder = this.word;
    
      const inputTranscription = document.createElement('input');
      inputTranscription.className = 'words__input'; // Добавляем класс
      inputTranscription.placeholder = this.transcription;
    
      const inputTranslation = document.createElement('input');
      inputTranslation.className = 'words__input'; // Добавляем класс
      inputTranslation.placeholder = this.translation;
    
      // Добавление <input> элементов в <div>
      wordDiv.appendChild(inputWord);
      wordDiv.appendChild(inputTranscription);
      wordDiv.appendChild(inputTranslation);
    
      // Добавление <div> в <li>
      newWordLi.appendChild(wordDiv);
    
      // Создание <input> для чекбокса
      const checkbox = document.createElement('input');
      checkbox.className = 'words__list-checkbox'; // Добавляем класс
      checkbox.type = 'checkbox';
      checkbox.dataset.id = this.id; // Устанавливаем значение атрибута data-id
    
      // Добавление чекбокса в <li>
      newWordLi.appendChild(checkbox);
    
      // Найти соответствующий <ul> контейнер по классу
      const ulWordsList = document.querySelector('.words__list');
    
      // Добавление созданного элемента <li> в <ul>
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
      englishList.addWord();
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


