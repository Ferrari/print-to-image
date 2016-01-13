# print-to-image

Create a printer which will convert what it get to image files, powered by [ipp-printer](https://github.com/watson/ipp-printer).

## Installation

Install package to global will be easy to use it:

```
npm install print-to-image -g 
```

## Usage

```
print-to-image [-t IMAGE TYPE] [-d TARGET DIRECTORY] [-r RESOLUTION RATE]
```

* -t: Convert based on [gm](https://github.com/aheckmann/gm).
* -r: It will multiple of source resolution.

Just run it before you print and setup printer follow [ipp-printer](https://github.com/watson/ipp-printer)
