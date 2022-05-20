### TODO : 
- [ ] throw error when -c and -n are used
- [ ] log usage when args not provided

### IDEAS / MAYBE :
- [ ] extract '\n' to const
- [ ] Take options as object and then pass to head
- [ ] change the name of head.js in src
- [ ] extract data manipulation functions to different file

### DONE :

- [x] Make parse options 
  - [x] test parseArgs
  - [x] test parseOptions
  - [x] test isOption
- [x] head to pass lineCount, separator
- [x] head to return lines of line count(-n)
  - [x] basic head with default lineCount
- [x] separate string manipulate fns
  - [x] test string manipulate
- [x] change contract of head fn to receive object 
- [x] Implement head for bytes (-c)
- [x] change contract of head to accept separator
- [x] Return number of lines given
    (given lines it has to return given number of lines)
- [x] Provide number of lines as arg
- [x] Create a fn which will return lines of given count ( first n lines)
- [x] create a fn to join lines
- [x] Implement separateLine to take content and return lines
- [x] convert string data to workable data structure
- [x] create a simple head and start with data
  - [x] get head to work for given lines of data
- [x] extract fn into src dir
- [x] test for given content to be returned
- [x] create Dir Structure
- [x] create testHead.js
