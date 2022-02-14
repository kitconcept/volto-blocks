![kitconcept GmbH](https://github.com/kitconcept/volto-blocks/raw/master/kitconcept.png)

# Volto Separator Block

<img style="float: right;" src="https://raw.githubusercontent.com/plone/pastanaga-icons/master/Icons/divide-horizontal.svg">

The Volto Separator Block allows editors to add visual separators between blocks.

## Screenshot

![Separator](https://github.com/kitconcept/volto-blocks/raw/master/Separator.png)

## Screencast

![Separator](https://github.com/kitconcept/volto-blocks/raw/master/Separator.gif)

## Installation

Create a new Volto project (you can skip this step if you already have one):

```
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon @kitconcept/volto-separator-block
cd my-volto-project
```

Add `@kitconcept-volto-separator-block`to your package.json:

```
"addons": [
    "@kitconcept/volto-separator-block"
],

"dependencies": {
    "@kitconcept/volto-separator-block": "*"
}
```

Download and install the new add-on by running:

```
yarn install
```

Start Volto with:

````
yarn start
````

Go to http://localhost:3000, login, create a new page. The separator block will show up in the Volto blocks chooser.
