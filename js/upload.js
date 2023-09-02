document.getElementById('uploadForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'ALL Ready';
});


