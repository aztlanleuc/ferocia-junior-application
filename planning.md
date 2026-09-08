# thoughts
- expected behaviour
  - returns a sensible value (in line with existing calculator)
  - returns a helpful error if input is invalid
  - returns a helpful error if API has an error - is this possible with the test api?
- class refactor
  - is there a specific design pattern i want to use?

# todo
- [x] test suite
  - [x] invalid inputs (individual incorrect ones, both nonsensical numbers and non-numbers)
  - [x] api errors
  - [x] correct values
- [x] make individual functions functional
- [x] refactor into class

# assumptions made
- the api structure is set, only the base url will change
- if a valid api response is recieved, it will include the expected fields in the body
- the maths in gen's work is correct (because i was given no reference)

# would do if i had more time/information
- correctness tests - i did not have correct values to test against to verify Gen's mathematics
- split into multiple files - i had issues with modules that i couldn't solve
- more specific error testing - did it throw the correct error when it rejected
