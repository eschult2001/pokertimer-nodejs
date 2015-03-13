var ids = {
// test app only
facebook: {
 clientID: '862342397156466',
 clientSecret: '',
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
 clientID: 'get_your_own',
 clientSecret: 'get_your_own',
 callbackURL: "http://localhost:8080/auth/google/callback"
}
}

module.exports = ids
