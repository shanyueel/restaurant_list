//basic Express settings
const express = require('express')
const app = express()

const port = 3000

//require express-handlebars
const exphbs = require('express-handlebars')

//require data from restaurant.json
const restaurantList = require('./restaurant.json').results

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//static file usage
app.use(express.static('public'))



app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

//search function
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantsFound = restaurantList.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))

  res.render('index', { restaurants: restaurantsFound, keyword: keyword })
})

//restaurant detail info display
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(movie => movie.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant: restaurant })
})



//listen app
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})