module.exports = function(passport){
 
  /* Requisição GET para página de LOGIN. */
  router.get('/', function(req, res) {
    // Mostra a página de Login com qualquer mensagem flash, caso exista
    res.render('index', { message: req.flash('message') });
  });
 
  /* Requisição POST para LOGIN */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
  }));
 
  /*Requisição GET para página de Registro */
  router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });
 
  /* Requisição POST para Registros */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true
  }));
 
  return router;
}
