#!/usr/bin/env node
var fs = require('fs');
var outfile = "primes-in-100.txt";
var primes = [];
var max = 100;
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
		if (primes.length>=100)
			break;
	}
}

fs.writeFileSync(outfile, primes.join(","));

console.log("primes in 100: \n" + primes.join(","));
