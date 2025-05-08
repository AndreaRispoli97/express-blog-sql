//const posts = require('../data/posts');
const connection = require('../data/db')

function index(req, res) {
  //Funzione index in cui usiamo la crud index perchiamare il database
  const sql = 'SELECT * FROM `posts`';

  connection.query(sql, (err, results) => {

    if (err) return res.status(500).json({ error: 'Database Error' });

    res.json(results);

  })




  //per far la prova con error500
  // ciao();
  // console.log(req.query);
  // // const tag = req.query.tag;

  // let filteredPosts = posts;

  // if (req.query.tags) {
  //   filteredPosts = posts.filter((post) => post.tags.includes(req.query.tags))

  //   return res.json(filteredPosts);
  // }

  // console.log(req.query.tags);

  // // Restituisci i post filtrati in formato JSON
  // res.json(posts);
}

// function show (req, res){
//     res.send('Dettagli del dolce ' + req.params.id);
// };

function show(req, res) {

  const id = req.params.id;

  const sql = 'SELECT * FROM posts WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query fallita' });
    if (results.lenght === 0) return res.status(404).json({ error: 'Post non trovato' });
    res.json(results[0]);
  })


  // Ottieni l'id del post dalla richiesta
  // const id = parseInt(req.params.id);
  // // Trova il post corrispondente
  // const post = posts.find(post => post.id === id);
  // //if con condizione l'aver trovato un post
  // if (post) {
  //   // Restituisci il post in formato json
  //   res.json(post);
  // } else {
  //   //In caso di errore
  //   res.status(404).json({ message: 'Post non trovato' });
  // }
}

function store(req, res) {
  //nuovo id
  const newId = posts[posts.length - 1].id + 1;
  //creazione oggetto
  const newDolce = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags

  }

  posts.push(newDolce);

  console.log(posts);

  res.status(201).json(newDolce);

};

function update(req, res) {
  const id = parseInt(req.params.id);

  const dolce = posts.find(post => post.id === id);
  if (!dolce) {
    res.status(404);
    return res.json({
      error: "Not Found",
      message: "dolce non trovata"
    })
  }
  dolce.title = req.body.title;
  dolce.content = req.body.content;
  dolce.image = req.body.image;
  dolce.tags = req.body.tags;

  console.log(posts);
  res.json(dolce);


};

function modify(req, res) {
  res.send('Modifica parziale del  dolce ' + req.params.id);
};

// function destroy (req, res){
//     res.send('Eliminazione del dolce ' + req.params.id);
// };

function destroy(req, res) {

  const { id } = req.params;

  connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Cancellazione post non riuscita' });
    res.sendStatus(204)
  });






  // // Ottieni l'id del post dalla richiesta come fatto precedentemente
  // const id = parseInt(req.params.id);
  // // Trova l'indice del post con findIndex
  // const i = posts.findIndex(post => post.id === id);
  // //if in cui andiamo a dare un condizione "se il paramentro è diverso da -1"
  // if (i !== -1) {
  //   // Rimuovi il post dall'array
  //   posts.splice(i, 1);
  //   // Stampa la lista aggiornata
  //   console.log('Lista post aggiornata:', posts);
  //   // Rispondi con stato 204 (Nessun contenuto)
  //   res.status(204).send();
  // } else {
  //   // Gestisci il caso di post non trovato
  //   res.status(404).json({ message: 'Post non trovato' });
  // }
}

module.exports = { index, show, store, update, modify, destroy }