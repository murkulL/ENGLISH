const searchWord = document.querySelector('.header__search');

searchWord.addEventListener('input', (event) => {
  const searchValue = event.target.value.toLowerCase();

  const wordInputs = document.querySelectorAll('.words__input-word');
  const transcriptionInputs = document.querySelectorAll('.words__input-transcription');
  const translationInputs = document.querySelectorAll('.words__input-translation');

  wordInputs.forEach((wordInput, index) => {
    const word = wordInput.getAttribute('placeholder').toLowerCase();
    const transcription = transcriptionInputs[index].getAttribute('placeholder').toLowerCase();
    const translation = translationInputs[index].getAttribute('placeholder').toLowerCase();

    if (word.includes(searchValue) || transcription.includes(searchValue) || translation.includes(searchValue)) {
      wordInput.closest('.words__box-content').style.display = 'block';
    } else {
      wordInput.closest('.words__box-content').style.display = 'none';
    }
  });
});


// async function searchValue() { 
//   const res = await fetch('/');
//   const result = await res.json();
//   console.log(result)
// }

// searchValue()


