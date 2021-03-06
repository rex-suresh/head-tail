# TAIL
### TODO : 
  - [ ] REFACTOR CODE
  - [x] implement reverse functionality
    - [ ] test reverse functionality

**NOTE**
  - [ ] **follow the todo**
  - [ ] break complex code
  - [ ] errors to be thrown via error stream
  - [x] error changes the exit status of process (1)

### IDEAS / MAYBE :

- [x] create a tailLib
  - [x] core fns
  - [x] test core fns
- [x] handle case of ++100 file
  - [x] make `separateOptions fn` regex to support ++100 as not a option
- [x] make parse option to handle `+10` implies `-n +10`
- [x] handle case tail +n1 '+n1 taken as file' 

### DONE :

- [x] write parser for tail
- [x] write validators for tail args
  - [x] validate the arguments
- [x] throw errors(list in process file)
- [x] catch errors and console error messages
- [x] implement main to be injected with dependencies
- [x] make format output to support quiet '-q' switch
- [x] separate args to support +, - signs of values
- [x] write Todo
- [x] take detailed note of tail contract
- [x] separate arguments as of head
    - ( using head arg parser )


---------------------
# HEAD
### TODO :
- [ ] REFACTOR CODE
- [ ] fix validations contract and throws
  - [ ] create a fn to throw error messages
- [ ] Maintain a fixed contract of outer head and head core
- [ ] 
- [ ] change contract of head file to take content
  - [ ] separate concern of file error catch from headFile
  - [ ] take items and iterate over fileContents

- [ ] write a print outputs function
  - [x] should inject dependencies
  - [x] should print outputs according to files provided

- [ ] re look over old testCases
  - [ ] remove duplicate or useless tests

**NOTE**
  - [ ] **follow the todo**
  - [ ] break complex code
  

### IDEAS / MAYBE :

- [ ] check and rename variable and function names
- [ ] make validation generic / extensible

### DONE :
- [x] change the process flow of printing
 - [x] separate file read concern
 - [x] separate head concern
- [x] refactor fetch to be readable
  - [x] test isOption
- [x] organize readme
- [x] extract fileSystem related try Catch into separate fn
- [x] make formatOutput to support object structured data
- [x] remove eslint exceptions in files
- [x] delete separate and join lines fns
- [x] remove unnecessary assertions in test
- [ ] ~~extract data manipulation into a different file.~~
- [x] solve error throw of head.js -na, asking arg
- [x] change approach based on process written.
- [x] Test main with mocking
- [x] errors to be thrown via error stream
  - [x] error changes the exit status of process (1)
- [x] implement main to be injected with dependencies
- [x] parse and validate options
- [x] implement head to work on file content and options provided
- [x] implement main to work through command line
- [x] validate inputs function to validate all inputs
  - [x] throw error for invalid count
  - [x] throw error for invalid option
  - [x] throw error for option combination use
- [x] implement options to head (-n, -c)
 - [x] change approach to head content
- [x] implement header for head output
- [x] write the separate args function
- [x] write a parser function to handle options
  - [x] options at case '-n8'
  - [x] options at case '-n', '8'
  - [x] options at case '-8'
- [ ] ~~use match instead of regex test~~
- [ ] ~~change approach of passing separator.~~
- [x] errors to be handled
    - [x] when file doesn't exits ,`No such file or directory`
    - [x] when files exist and doesn't (mix),`No such file or directory + 'OUTPUT'`
    - [x] when unknown option provided,`usage: head [-n lines | -c bytes] [file ...]`
- [x] accept arguments without space
- [x] console.error error messages
- [x] change approach of validation inside parsing
- [x] use splice to fetch options passed as args
- [x] add combination key throw (-c and -n)
- [x] add illegal count throw from parser
- [x] when count < 1 ,`illegal line count -- XX`
    - [x] when option provided is unknown,
      `illegal option -- x`; `usage: head [-n lines | -c bytes] [file ...]`
    - [x] when -n, -c both used, `can't combine line and byte counts`
- [x] log `usage` when args not provided
- [x] throw error when -c and -n are used
- [x] print File names when multiple files are given
  - [x] write a format output fn
  - [x] test format name
  - [x] test format output
- [x] chain head with files parser and files
- [x] head with file
  - [x] test headMain
- [x] Head with options
- [x] Make head to return 10 lines by default
- [x] extract data manipulation functions to different file
- [x] change the name of head.js in src
- [x] Take options as object and then pass to head
- [x] ~~extract '\n' to const~~
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
