(async () => {
    // define canary state magic numbers
    const canaryok = "11147e162aa1e68833cfe4795e1759aeff23162dd867d4baa4dc54576f47ff94";
    const canaryerror = "d76ca3f62af45a654cff85b6be14009736e29d8866c3a2b929040b16ab0e5f43";

    // collect the domains to poll
    var domains = await fetch("http://canary.snailien.net/domains.txt")
    .then(response => response.text())
    .then(text => text.split('\n'))
    .then(array => array = array.filter(item => item != ""))
    .then(array => domains = array);

    // poll each domain and record the HTTPX status (response.ok)
    var result = "";
    for( var domain of domains )
    {
        var check = await fetch(domain);
        result += `${domain},${check.ok}\n`;
    }

    // if any domain has failed, return the canaryerror. otherwise return the canaryok
    var somethingOffline = /false/.test(result);
    if(somethingOffline)
    {
        result = "At least one site is currently offline!" + "\n\n" + result + "\n" + canaryerror; 
    }
    else
    {
        result = "All site Operational." + "\n\n" + result + "\n" + canaryok;
    }

    // return the result via console
    console.log(result);
    return;
})();