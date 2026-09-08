# Assumptions I made

## API 
I assumed that the API would maintain the same paths for endpoints, and that the response returned would always be a valid HTTP response with a consistently structured body.

## Correctness
I assumed that Gen's mathematics was correct. I am aware that the original code somewhat simplified the provided calculator and therefore did not necessarily produce identical values. I also have effectively no background knowledge as to how borrowing power should be calculated, thus leaving me to feel I had no corrections to the mathematics of the `calculateBorrowingPower` function, beyond checking the code matched the behaviour explained in the comments.

# Further work I would have liked to do

## Correctness tests
As discussed above, I knew this calculator was simplified and would not necessarily match the outputs of the proper online calculator, and therefore did not know exactly what outputs should be expected. I therefore settled for writing some simple correctness tests, but would have liked to write detailed ones testing a range of financial circumstances.

## Use TypeScript
In my first attempt to break the classes into modules, I also used TypeScript, as I prefer it to plain JS for a variety of reasons. However, this presented issues as some of the existing functionality relied on CommonJS tools such as require, which is not compatible with ES6 imports, required by TypeScript. I tried to find alternatives but was unable to reconcile the two methods, and therefore went with only using CommonJS style modules.

## More specific error handling and testing
The test suite is currently extremely non-specific in its error testing - it just checks that the Promise rejects. It would be far more rigorous to instead confirm the specific error raised is the one specified. I was unable to determine how to achieve this in the time allowed, as I am unfamiliar with testing in JS, but I will be looking into this more.

# Running this respository

## Setup

Make sure you have Node.js installed.

Install dependencies:
```
npm install
```

## Server

You wil need to run the development API in it's own terminal window.
(The server will be available at http://localhost:3000/).
To start the server run the following command:
```
npm run api
```
Note: You can stop the server with Ctrl+C


## Running

Run the calculator with:
```
npm start
```


## Testing

Run tests with:
```
npm test
```



