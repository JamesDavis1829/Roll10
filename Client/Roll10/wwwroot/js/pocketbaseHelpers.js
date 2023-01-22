window.initializePB = () => {
    window.pb = new PocketBase("https://roll10.org");
    window.listAuth = async () => {
        return await window.pb.collection('users').listAuthMethods()
    }
}
window.setLocalStorage = (key, value) => {
    window.localStorage.setItem(key, value);
}
window.getOrigin = () => { return window.location.origin };
window.setLocation = (location) => { 
    window.open(location,"_self") 
};

window.handleRedirection = () => {
    const pb = new PocketBase("https://roll10.org");
    const redirectUrl = window.location.origin + '/redirect';

    // parse the query parameters from the redirected url
    const params = (new URL(window.location)).searchParams;

    // load the previously stored provider's data
    const provider = JSON.parse(localStorage.getItem('provider'))

    // compare the redirect's state param and the stored provider's one
    if (provider.state !== params.get('state')) {
        throw "State parameters don't match.";
    }

    console.log(provider);
    console.log(params);

    // authenticate
    return pb.collection('users').authWithOAuth2(
        provider.name,
        params.get('code'),
        provider.codeVerifier,
        redirectUrl,
        // pass optional user create data
        {
            emailVisibility: false,
        }
    )
    .catch(e => console.log(e))
    .finally(() => {

    })
}