# Custom MTA Subway Clock


We all always complain about the inefficiency of the NYC MTA. The F train, commonly known as the "forever" train is perpetually 8 minute delayed and Herald Square seems to have a power outage every other week. It should be no surprise that the MTA's API is a pain and a half to use. I decided to create my own subway clock for my apartment using P5.js. I wanted an easy way to view when the uptown F and M train are arriving without having to click sevearl buttons through an app on my phone. This project required a great deal of data cleaning and setup that was not found in any documentation provided by MTA. My hope is for others to build off this starter code and make cool applicatoins to make NYC for accessible. 

## Step 1: P5 & Node.js
In order to use this API, I needed to host it on locally through node.js. I install node.js through homebrew locally on my machine. (On a side note, using homebrew on the new M1 Macs can be tricky because everything is not M1 compatible  right now.)
I followed this node.js documentation found here: https://nodejs.org/en/download/package-manager/
If you do not already have P5.js installed locally, you will need to install that as well.

## Step 2: API Config  
I have a wonderful professor, Jiwon Shin,  who took on the brunt of configuring the API to load the data through node.js. She created a basic sketch that used a socket to fetch the data. Her starter code in found here. This is an awesome place to start if you are not interested in my cleaned and sifted through subway data. 
Jiwon's starter code is found here: https://github.com/js6450/mta-to-p5.js

## Step 3: Get your own MTA API Access Key 
In order to use the MTA API, you need to head on over to MTA Developer, create a login, and generate your own key. https://api.mta.info/#/landing 
Once you have your own login, a new access key is generated that you can use for 30 days. You will see in the code, there is a place where you will need to input your own access key. 

## Step 4: View Your Data in the Console 
In order to undestand how the MTA data is provided, you will need to play around a bit in the console. Shockingly, it is not well organized and the subway names correcpond with station codes. For example, I live off the Delancy/Essex st stop with a station code '625'. I hard coded in my subway station so I could more easily filter through the data. If you choose not to do that, it will be very overwhelming so I recommend looking up a subway station code and filtering from there.

The sketch is hosted locally through localhost:8000. 

In my code, I have the data being stored to mtaData. Begin by typing that into the console and seeing the objects inside of the data set. From there, you can view 
`mtaData.complexId, mtaData.name, mtaData.lines etc.`

## Step 5: Understanding and Altering My Code 
