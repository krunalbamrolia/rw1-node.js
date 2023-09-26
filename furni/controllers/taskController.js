const defaultRoute = (req, res) => {
    res.render('index');
}
const aboutRoute = (req, res) => {
    res.render('about');
}
const blogRoute = (req, res) => {
    res.render('blog');
}
const cartRoute = (req, res) => {
    res.render('cart');
}
const checkoutRoute = (req, res) => {
    res.render('checkout');
}
const contactRoute = (req, res) => {
    res.render('contact');
}
const servicesRoute = (req, res) => {
    res.render('services');
}
const shopRoute = (req, res) => {
    res.render('shop');
}
const thankyouRoute = (req, res) => {
    res.render('thankyou');
}
module.exports = {defaultRoute,aboutRoute,blogRoute,cartRoute,checkoutRoute,contactRoute,servicesRoute,shopRoute,thankyouRoute}