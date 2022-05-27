### tail

~~`usage: tail [-c # | -n #] [file ...]`~~
`usage: tail  [-r] [-q] [-c # | -n #] [file ...]`

```
  -c number
    The location is number bytes.

  -n number
    The location is number lines.
  
  -q 
    Suppresses printing of headers when multiple files are being examined.

  -r
    The -r option causes the input to be displayed in reverse order, by line. 
```

```
Numbers having a leading plus 
  (`+') sign are relative to the beginning of the input, 
for example, ``-c +2'' starts the display at the second byte of the input.

Numbers having a leading minus
 (`-') sign or no explicit sign are relative to the end of the input,
for example, ``-n 2'' displays the last two lines of the input. 

The default starting location is ``-n 10'', or the last 10 
lines of the input.

If more than a single file is specified,
each file is preceded by a header consisting of the string
 ``==> XXX <=='' where ``XXX'' is the name of the file.
```
------------------------


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
