async function run() {
    console.log("running... ");
    const config = {
        auth: {
            clientId: 'bf81d164-5d47-44e1-9ebe-f643d43b8f64',
            authority: 'https://login.microsoftonline.com/1012c700-e42c-4aa6-9f4d-3dac6033b0f4/',
            redirectUri: 'http://localhost:8080'
        },
        cache: {
            storeAuthStatelnCookie: true, //Set this to "true" if you having issues on IE11
        }

    };

    var client = new Msal.UserAgentApplication(config);
    var request = {
        scopes: [ 'user.read' ]
    };
    let loginResponse = await client.loginPopup(request);
    console.dir(loginResponse);
    let tokenResponse = await client.acquireTokenSilent(request);
    console.dir(tokenResponse);
    let payload =  await fetch("https://graph.microsoft.com/beta/me", {
        headers:{
            'Authorization': 'Bearer ' + tokenResponse.accessToken
        }        
    });
    let json = await payload.json();
    $datosUsuario = payload.json.companyName;

    console.dir(json);
    console.dir(json.companyName);
    document.write( json.companyName + " " + json.department + " " + json.displayName + " " + "u01" + json.employeeId );
    console.dir(json.companyName);


};