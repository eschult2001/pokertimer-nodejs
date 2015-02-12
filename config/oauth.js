var ids = {
// test app only
facebook: {
 clientID: '862342397156466',
 clientSecret: '8e5d2d4142107bef391edf73777dcf91',
 callbackURL: 'http://localhost:8080/auth/facebook/callback'
},
twitter: {
 consumerKey: 'get_your_own',
 consumerSecret: 'get_your_own',
 callbackURL: "http://localhost:8080/auth/twitter/callback"
},
github: {
 clientID: 'get_your_own',
 clientSecret: 'get_your_own',
 callbackURL: "http://localhost:8080/auth/github/callback"
},
google: {
 returnURL: 'http://localhost:8080/auth/google/callback',
 realm: 'http://localhost:8080'
}
}

module.exports = ids
