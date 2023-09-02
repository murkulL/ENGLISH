document.addEventListener('DOMContentLoaded', () => {
  const inputWord = document.querySelectorAll('.words__input-word');
  const inputTranscription = document.querySelectorAll('.words__input-transcription');
  const inputTranslation = document.querySelectorAll('.words__input-translation');

  inputWord.forEach((input) => {
    input.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const newValue = event.target.value;
        const id = event.target.getAttribute('data-id');
        // console.log(id)

        await updateWord(id, newValue);
      }
    });
  });

  inputTranscription.forEach((input) => {
    input.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const newValue = event.target.value;
        const id = event.target.getAttribute('data-id'); 

        await updateTranscription(id, newValue);
      }
    });
  });

  inputTranslation.forEach((input) => {
    input.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const newValue = event.target.value;
        const id = event.target.getAttribute('data-id'); 


        await updateTranslation(id, newValue);
      }
    });
  });
});


async function updateWord(id, newValue) {
  try {
    const response = await fetch('/', { 
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        field: 'word',
        value: newValue,
        id: id }),
    });

    if (response.ok) {
      console.log('Word updated successfully.');
    } else {
      console.error('Error updating word:', response.status);
    }
  } catch (error) {
    console.error('Error updating word:', error);
  }
}


async function updateTranscription(id, newValue) {
  try {
    const response = await fetch('/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        field: 'transcription',
        value: newValue,
        id: id }),
    });

    if (response.ok) {
      console.log('Transcription updated successfully.');
    } else {
      console.error('Error updating transcription:', response.status);
    }
  } catch (error) {
    console.error('Error updating transcription:', error);
  }
}


async function updateTranslation(id, newValue) {
  try {
    const response = await fetch('/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ field: 'translation',
      value: newValue,
      id: id }),
    });

    if (response.ok) {
      console.log('Translation updated successfully.');
    } else {
      console.error('Error updating translation:', response.status);
    }
  } catch (error) {
    console.error('Error updating translation:', error);
  }
}