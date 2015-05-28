# HCM4all JavaScript Toolkit
hcm4all.js provides simple access to the HCM4all JSON API. For further details on the API please have a look at the integration section of your installation.

## Installation
- Download the file `hcm4all.js` or `hcm4all.min.js` from the [latest release](https://github.com/hcm4all/hcm4all-js/releases/latest)
- Use Bower `bower install hcm4all-js`
- For Rails use `gem 'rails-assets-hcm4all-js'` with [Rails Assets](https://rails-assets.org/)

## Requirements
Our toolkit has no dependencies. If you use jQuery, all ajax calls will be processed using jQuery. Otherwise there is a small ajax client attached.

## Usage

1. Download the link [latest release of our toolkit](https://github.com/hcm4all/hcm4all-js/releases/latest)
2. Add the hcm4all.js (or hcm4all.min.js) library to your `<head>` tag
3. Implement the following code after the library to get a basic console output:

```JavaScript
HCM4all.config({
    baseUrl: 'http://<your key>.hcm4all.com',
    language: 'en' // 'de' is default
});

HCM4all.positions( function(positions) {
    console.log( positions.models[0].get('name') );
});
```

## Example
Have a look at the examples folder.

## Contribution
If you want to add a feature or fix an issue, please fork the repo and submit a pull request.

1. Clone the repo using `git clone git@github.com:hcm4all/hcm4all-js.git`
2. Install development dependencies using `npm install`
3. Watch for changes by running `grunt watch`
4. Only change CoffeeScript files in `src/` and `src/lib/`
5. When you're done, run `grunt` to build the `dist/hcm4all.js` and `dist/hcm4all.min.js` files
6. Write an example for your feature 
7. Write a good commit message ;-)

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
