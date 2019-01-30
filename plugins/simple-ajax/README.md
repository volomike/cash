# SIMPLE AJAX CASH PLUGIN 1.0

This plugin implements just the basic $.get() and $.post() calls of jQuery in Cash syntax. It only handles HTTP 200 responses.
You can fork and revise as you need.

## USAGE

The $.get() and $.post() works pretty much like the jQuery equivalents. Examples:

### GET

```html
$.get('https://example.com',{"item1":"apples","item2":"oranges"},function(result){
  console.log(result);
});
```

### POST

```html
$.post('https://example.com',{"item1":"apples","item2":"oranges"},function(result){
  console.log(result);
});
```



