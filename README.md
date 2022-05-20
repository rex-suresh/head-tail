### head

`usage: head [-n lines | -c bytes] [file ...]`

```
  -c bytes 
    prints the bytes(chars) of count passed as arg
    acceptable counts +ve, '\n' as a byte
  
  -n lines 
    prints the lines of count passed as arg
    acceptable counts +ve

  `node head` - should give usage
  // cannot combine byte and line count //
```

```
This filter displays the first count lines or 
bytes of each of the specified files
```

~~or of the standard input if no files are specified~~
```
If count is omitted it defaults to `10`

If more than a single file is specified,
each file is preceded by a header consisting of the string
 ``==> XXX <=='' where ``XXX'' is the name of the file.
```