#!/usr/bin/env node
var fs = require('fs');
var outfile = "first-100-primes.txt";
var primes = [];
var MAX = 100;
var i = 1,
    p = 0;
var isPrime = false;

while(++i)
{
	isPrime = true;
	
	for(var p=0;p<primes.length;p++)
	{
		isPrime = isPrime && (i%primes[p]!=0);
		if (!isPrime) break;
	}
	
	if (isPrime)
	{
		primes.push(i);
		if (primes.length>=MAX)
			break;
	}
}

fs.writeFileSync(outfile, primes.join(","));

console.log("first 100 primes: \n" + primes.join(","));
