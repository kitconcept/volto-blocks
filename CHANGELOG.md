# Change Log

## 6.0.0 (2021-02-12)

### Breaking

- Volto 12 onwards compat @sneridagh

### Features

- Merge pull request #56 from kitconcept/exportMiddlewareRemoveServer (Víctor Fernández de Alba)
- Export middleware use jq for remove server part (Victor Fernandez de Alba)
- Merge pull request #55 from kitconcept/object-by-type-props (Alok Kumar)
- passing props to shema (iFlameing)
- Merge pull request #53 from kitconcept/button-block (Víctor Fernández de Alba)
- Merge pull request #52 from kitconcept/color-picker-default-color (Víctor Fernández de Alba)
- Merge pull request #54 from kitconcept/expressexport (Víctor Fernández de Alba)
- Add new express middleware for exports (Victor Fernandez de Alba)
- add button block (jackahl)
- Merge pull request #50 from kitconcept/objectByTypeWidget (Víctor Fernández de Alba)
- add Interface to colorpicker to define a defaultcolor (jackahl)
- Teaser description as TextArea widget in old teasers too, to be consistent (Victor Fernandez de Alba)
- Teaser description as TextArea widget (Victor Fernandez de Alba)
- Add focus to the object list widget (Victor Fernandez de Alba)
- Remove the optional container, make it mandatory to prevent full re-render of the tree. Enhance the schemaEnhancer (Victor Fernandez de Alba)
- Merge pull request #51 from kitconcept/translations (Víctor Fernández de Alba)
- Add production env var to xypress (Victor Fernandez de Alba)
- adding object by type widget (iFlameing)

### Bugfix

### Internal

- Add translations (Victor Fernandez de Alba)
- ESlint (Victor Fernandez de Alba)

## 5.0.0 (2021-02-08)

### Breaking

Might be that the teaser grid is not 100% backwards compatible, so double check.

### Features

- New blocks: Carousel, TextPill, UberGrid, HighLight, HighLightSlider
- Improved TeaserGrid, added Variations and Enhancers support
- Variations and enhancers general components for enabling other blocks as well
- StylingWrapper enhancer
- General util components (MaybeWrap, SchemaRenderer, ...)
- Widgets: ObjectListWidget, SimpleColorPicker

### Internal

- Testing, testing, testing
- Linting and Prettier as well in place

## 3.0.0 (2020-10-07)

- Minimum requirement is now 8.2.2 because of the upgrade of react-dropzone @iFlameing

## 2.0.2 (2020-09-29)

- Add grid css @iFlameing

## 2.0.1 (2020-08-24)

- Remove all appearances of listing block

## 2.0.0 (2020-08-24)

- Remove listing block, as it is already implemented in volto @jackahl

## 1.3.0 (2020-08-18)

- Compatibility for volto 7.x.x @tiberiu

## 1.2.0 (2020-07-13)

- Pass number of columns to the grid @steffenri

## 1.1.0 (2020-07-13)

- Add listing grid block @iFlameing

## 1.0.0 (2020-07-13)

- Initial relase @tisto
