tesseract.js-core
=================

## Development

To compile the tesseract-core.js, you can utilize docker to prepare the environment, to start the container:

```bash
$ sh scripts/run-container.sh
```

Everything inside this repository will be mounted to `/src`, next you can start compiling:

```bash
$ sh scripts/compile.sh
```

If nothing goes wrong, you can get tesseract-core.js at **./tesseract/tesseract-core.js**
