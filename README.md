# HCM4all JavaScript Toolkit

```JavaScript
    HCM4all.config({
      baseUrl: 'http://<your key>.hcm4all.com',
      language: 'en' // 'de' is default
    });

HCM4all.positions( function(positions) {
    console.log( positions.models[0].get('name') );
});
```
