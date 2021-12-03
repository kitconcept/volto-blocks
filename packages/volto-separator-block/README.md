![kitconcept GmbH](https://raw.githubusercontent.com/kitconcept/volto-form-builder/master/kitconcept.png)

# Volto Separator Block

## Screenshot

![TeaserHero](https://github.com/kitconcept/volto-blocks/raw/master/Separator.png)

## Screencast

![TeaserHero](https://github.com/kitconcept/volto-blocks/raw/master/Separator.mp4)

## Installation

If you already have a Volto project, just update package.json:

````
"addons": [
    "@kitconcept/volto-separator-block"
],

"dependencies": {
    "@kitconcept/volto-separator-block": "*"
}
````

If not, create one:

````
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon @kitconcept/volto-separator-block
cd my-volto-project
````

Install new add-on and restart Volto:

````
yarn install
yarn start
````

Go to http://localhost:3000
