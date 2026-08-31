const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const QUESTIONS_FILE = path.join(__dirname, '../data/questions.json');

router.get('/', (req, res) => {
  const { category } = req.query;

  fs.readFile(QUESTIONS_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read questions data' });
    }

    try {
      let questions = JSON.parse(data);
      if (category) {
        questions = questions.filter(
          q => q.category.toLowerCase() === category.toLowerCase()
        );
      }
      res.json(questions);
    } catch (e) {
      res.status(500).json({ error: 'Failed to parse questions data' });
    }
  });
});

module.exports = router;
