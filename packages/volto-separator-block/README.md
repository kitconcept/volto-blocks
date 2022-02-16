![kitconcept GmbH](https://github.com/kitconcept/volto-blocks/raw/master/kitconcept.png) <span size="50px">|</span> <img width="100px" src="https://raw.githubusercontent.com/plone/pastanaga-icons/master/Icons/divide-horizontal.svg">

# Volto Separator Block

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

# Credits

<img alt="Forschungszentrum Jülich" src="https://github.com/kitconcept/volto-blocks/raw/master/fz-juelich.svg" width="200px" />

The development of this plugin has been kindly sponsored by [Forschungszentrum Jülich](https://fz-juelich.de).

# License

The project is licensed under the MIT license.
