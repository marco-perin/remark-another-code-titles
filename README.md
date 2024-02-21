# remark-another-code-titles

<img alt="preview badge" src="https://img.shields.io/npm/dm/remark-another-code-titles?color=informational&logo=npm">

Remark plugin to add a title to code blocks with few customization options.

Based on package [remark-code-title](https://github.com/kevinzunigacuellar/remark-code-title) by [kevinzunigacuellar](https://github.com/kevinzunigacuellar) which is in turn inspired by:

- [gatsby-remark-code-titles](https://github.com/DSchau/gatsby-remark-code-titles)
- [remark-code-titles](https://github.com/mottox2/remark-code-titles) [currently not maintained]

## Why another package for the same things?

While developing in Astro.js, I found [remark-code-title](https://github.com/kevinzunigacuellar/remark-code-title).

The problem is that some styling frameworks reason via classes and not attributes
(see [tailwind.css](https://tailwindcss.com/)),
and I thought that some more customization was easy to add,
without impacting the original usage.

## Installation

```bash
npm install remark-another-code-titles
```

## Usage

Given this markdown file `example.md`:

````markdown
# Example

```js title="example.js"
console.log("Hello World");
```
````

And this script, `example.js`, using `remark-another-code-titles`:

```js
import codeTitle from "remark-another-code-titles";
import html from "remark-html";
import { read } from "to-vfile";
import { remark } from "remark";

const processor = remark().use(codeTitle).use(html, { sanitize: false });
const markdown = await read("example.md");
const result = await processor.process(markdown);
```

Running `node example.js` yields:

```html
<h1>Example</h1>
<div data-remark-another-code-titles data-language="js">example.js</div>
<pre>
  <code>console.log("Hello World");</code>
</pre>
```

### Additional options

It is possible to pass parameters to the `codeTitle` plugin.

**Note that** all options can be used at the same time, in any combination, without producing unexpected results.

The parameter structure has the following type:

```ts
export type Options = {
  baseName?: string | null | undefined;

  useClassInsteadOfAttribute?: boolean | null | undefined;

  additionalClasses?: string | string[] | null | undefined;
};
```

In particular, `useClassInsteadOfAttribute=true` will generate the following HTML, from the previous example:

```html
<h1>Example</h1>
<div class="data-remark-another-code-titles" data-language="js">example.js</div>
<pre>
  <code>console.log("Hello World");</code>
</pre>
```

`baseName="some-other-attribute"` Will generate the following HTML:

```html
<h1>Example</h1>
<div some-other-attribute data-language="js">example.js</div>
<pre>
  <code>console.log("Hello World");</code>
</pre>
```

And finally, `additionalClasses="additional-class"` or `additionalClasses=["additional-class"]`, will generate

```html
<h1>Example</h1>
<div
  data-remark-another-code-titles
  class="additional-class"
  data-language="js"
>
  example.js
</div>
<pre>
  <code>console.log("Hello World");</code>
</pre>
```

Note that if an array of multiple strings is provided, like `additionalClasses=["additional-class1", "additional-class2"]`, the result is

```html
<h1>Example</h1>
<div
  data-remark-another-code-titles
  class="additional-class1 additional-class2"
  data-language="js"
>
  example.js
</div>
<pre>
  <code>console.log("Hello World");</code>
</pre>
```
