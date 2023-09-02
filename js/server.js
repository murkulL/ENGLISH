const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Post = require('../models/post');
const fs = require('fs');
const multer = require('multer'); 
const pdfjsLib = require('pdfjs-dist'); 


const app = express();

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));



const mongoDbUrl = 'mongodb+srv://olegov23445:qwerty1234@cluster0.0qhjbri.mongodb.net/my-app?retryWrites=true&w=majority';

mongoose
  .connect(mongoDbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

app.listen(port, (error) => {
  error ? console.log(error) : console.log(`Listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, '../style')));
app.use(express.static(path.join(__dirname, '../svg')));
app.use(express.static(path.join(__dirname, '../img/favicon')));
app.use(express.static(path.join(__dirname, '../js')));

const createPath = (page) => {
  return path.resolve(__dirname, '../ejs-views', `${page}.ejs`);
};

// --------------------------------------------------------

app.get('/', async (req, res) => {
  try {
    const words = await Post.find();
    
    fs.readFile('text.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Error reading file' });
      }

      const allWords = data.split(' ');
      const uniqueWords = new Set(allWords);
      const uniqueEnglishWords = Array.from(uniqueWords).filter(word => /^[a-zA-Z]+$/.test(word));
      
      res.render(createPath('main'), { title: 'English Learn', words, uniqueEnglishWords });
    });
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).render(createPath('error'), { title: 'Error' });
  }
});



// --------------------------------------------------------

app.get('/reader', (req, res) => {
  const title = 'PDF Reader';
  res.render(createPath('reader'), { title });
});

// ---------------------------------------------------------- доделать 


// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


// app.post('/', upload.single('pdfFile'), async (req, res) => {
//   const pdfData = new Uint8Array(req.file.buffer);
  
//   const loadingTask = pdfjsLib.getDocument({ data: pdfData });
//   const pdfDocument = await loadingTask.promise;

//   const allWords = [];

//   for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
//     const page = await pdfDocument.getPage(pageNum);
//     const pageText = await page.getTextContent();
//     const words = pageText.items.map(item => item.str);
    
//     allWords.push(...words);
//   }

//   const uniqueWords = [...new Set(allWords)]; 

//   const singleWords = uniqueWords
//     .map(word => word.trim())
//     .filter(word => /^[a-zA-Z]+$/.test(word)); 

//     console.log(singleWords.length)
//   const textWords = singleWords.join(' ');


//   fs.writeFile('text.txt', textWords, (err) => {
//     if (err) {
//       console.error('Error writing to file:', err);
//       return res.status(500).json({ error: 'Error writing to file' });
//     }
    
//     console.log('Words saved to text.txt');
//     res.json({ message: 'Words saved to text.txt' });
//   });
// });


app.post('/', async (req, res) => {
  try {
    const { word, transcription, translation } = req.body;
    const post = new Post({ word, transcription, translation });
    await post.save();
    res.status(200).json({ _id: post._id }); // Отправляем JSON объект с _id
    console.log(post._id)
  } catch (error) {
    console.error('Error saving data to database:', error);
    res.status(500).send('An error occurred while saving data');
  }
});

app.delete('/:id' , (req, res) => {
  Post
  .findByIdAndDelete(req.params.id)
  .then(result => {
    res.sendStatus(200)
  })
  .catch((error) => {
    console.log(error)
    res.render(createPath('error'))
  })
})


app.patch('/', async (req, res) => {
  const { id, field, value } = req.body;

  try {
    const updateFields = { [field]: value };
    const updatedElement = await Post.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedElement) {
      return res.status(404).json({ error: 'Element not found' });
    }

    res.json(updatedElement);
  } catch (error) {
    console.error('Error updating element:', error);
    res.status(500).json({ error: 'Error updating element' });
  }
});

app.use((req, res) => {
  const title = 'Error';
  res.status(404).render(createPath('error'), { title });
});




// (async () => {
//   try {
//     const data = await fs.readFile('text.txt', 'utf8');
//     const lines = data.split('\n');
//     const promises = [];

//     for (const line of lines) {
//       const [word, transcription, translation] = parseLine(line);

//       if (word && translation) {
//         promises.push(
//           Post.create({
//             word,
//             transcription,
//             translation,
//           })
//         );
//       }
//     }

//     await Promise.all(promises);
//     console.log('Data added to the database successfully.');
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();

// function parseLine(data) {
//   const parts = data.split(' - ');
//   if (parts.length === 2) {
//     const [wordPart, translationPart] = parts;
//     const [word, transcription] = wordPart.split(' ');
//     const translation = translationPart.trim();
//     return [word, transcription, translation];
//   }
//   return ['', '', ''];
// }




// Post.deleteMany({})
//   .then(() => {
//     console.log('Все записи успешно удалены.');
//   })
//   .catch(error => {
//     console.error('Ошибка при удалении записей:', error);
//   });