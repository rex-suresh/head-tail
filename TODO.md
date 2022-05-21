### TODO : 
- [ ] use match instead of regex test
- [ ] change approach of validation inside parsing
- [ ] errors to be handled
    
    - [ ] when file doesn't exits ,`No such file or directory`
    - [ ] when files exist and doesn't (mix),`No such file or directory + 'OUTPUT'`
    - [ ] when unknown option provided,`usage: head [-n lines | -c bytes] [file ...]`

### IDEAS / MAYBE :
- [ ] use splice to fetch options passed as args
- [ ] add combination key throw (-c and -n)
- [ ] add illegal count throw from parser
- [ ] change approach of passing separator.

### DONE :

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
