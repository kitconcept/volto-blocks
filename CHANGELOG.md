# Change Log

## 10.0.1 (unreleased)

### Breaking

### Feature

- Add lazy loading of draftjs @robgietema

### Bugfix

### Internal

- Move to GHActions @sneridagh

## 10.0.0 (2022-02-23)

### Breaking

- Add lazy loading of draftjs @robgietema
  This makes this version compatible only with Volto 15.0.0-alpha.5 and above.

## 9.5.0 (2022-02-08)

### Feature

- Make carousel block more generic to use either preview or normal image @steffenri

### Bugfix

- Fix `tabindex` typo @sneridagh

## 9.4.1 (2022-01-25)

### Bugfix

- Fix the responsive of carousel block @iFlameing
- Fix heading block @iRohitSingh
- Fix the a11y violation of carousel block @iRohitSingh

## 9.4.0 (2022-01-04)

### Feature

- Implement ImgLoader component @reebalazs

### Bugfix

- Fix build for Volto 14, refactoring using the new addon testing environment based approach @sneridagh

### Internal

- Cleaning after refactor @sneridagh

## 9.3.0 (2021-12-10)

### Feature

- Updating volto-slate to latest @iFlameing

### Bugfix

- Fixed drag-and-drop list placeholder issues @reebalazs

### Internal

- Change the icon of Separator block (#95) @iFlameing

## 9.2.0 (2021-11-29)

### Feature

- New Dates components @sneridagh

### Internal

- Use new Dates components in listings @sneridagh
- Add the screenshot and screencast for separator block @iFlameing

## 9.1.0 (2021-11-26)

### Feature

- Add Heading block @sneridagh
- Add a `packages` infrastructure @sneridagh
- [volto-heading-block] Always center by default the heading @sneridagh
- Add Separator Block @iFlameing
- Add stylelint 14 (Volto 14) compatibility @sneridagh

### Bugfix

- Fix carousel block slidetoscroll when clicking on right arrow or left arrow @iFlameing
- [volto-heading-block] Fix bug in `View` because the default is not set @sneridagh
- [volto-blocks] Remove creation date from Newslisting listing, don't show date if effective is not present @sneridagh
- [volto-blocks] Reorder export, export blocks and blocks_layout last @tisto
- Fix the ci failing @iFlameing

### Internal

- Upgrade @plone/scripts 1.0.3 @sneridagh

## 9.0.1 (2021-09-27)

### Internal

- Upgrade @plone/scripts 1.0.2 @sneridagh
- Use internal @plone/scripts changelogupdater @sneridagh

## 9.0.0 (2021-09-27)

### Breaking

- Deprecate forked `ObjectListWidget`, `ObjectWidget`, `objectByType`, and custom pre-released new-style `QuerytringSidebarWidget` and `QueryStringSortOnWidget` in favor of the released in Volto ones. @sneridagh
- This version is compatible with the new i18n architecture in Volto 14 @sneridagh

## 8.1.0 (2021-09-27)

### Feature

- Custom schema enhancer for accordion block and CSS enhancements @sneridagh

### Internal

- Add transltion for TextWithPillStyle @iFlameing
- Translations for the Text with background color in Volto 14a9 @sneridagh

## 8.0.0 (2021-07-06)

### Breaking

- Text Pill with Background color now is powered by Slate @sneridagh
- All text blocks are assumed to be Slate from now on @sneridagh
- Remove ListingGrid as now it's superseeded by volto-blocks-grid @sneridagh

### Feature

- Add id to the default server export @sneridagh
- Export `show_navigation_portlet` field @sneridagh
- Export with the keys ordered @sneridagh
- Refactoring button block to use schema renderer @iFlameing

### Internal

- Changelog forced by default @sneridagh
- Address Cypress tests for Slate using the new way @sneridagh

## 7.0.0 (2021-06-15)

### Breaking

### Features

- Color Picker pass `defaultColor` prop from config (Victor Fernandez de Alba)
- CSS fix for slate blocks (Victor Fernandez de Alba)
- Fixing the bug when we have length of carousel block is 0 or when we have large number (#66) (Alok Kumar)
- Add missing classname to TextPill, for controlling it via CSS (Victor Fernandez de Alba)
- Fix heading level (Victor Fernandez de Alba)
- Add schema enhancer compatible with V13 (for now in a separate export) (Victor Fernandez de Alba)
- Merge pull request #65 from kitconcept/carousel-arrow (Alok Kumar)
- Replacing the carousel block with svg instead of img tag (iFlameing)
- Slight change in layout z-index for highlights to not colide with the personal menu (Victor Fernandez de Alba)
- missing locales for qs widget (Victor Fernandez de Alba)
- Improve retrieval of exported things (Victor Fernandez de Alba)
- export also the root (Victor Fernandez de Alba)
- Remove filigrane (Victor Fernandez de Alba)
- Improve objectwidget (Victor Fernandez de Alba)
- Add support for external links to the carousel (Victor Fernandez de Alba)
- Add headline to Carousel (Victor Fernandez de Alba)
- Adjustments to better CSS in objectlist widget (Victor Fernandez de Alba)
- prevetdefault in the button of the object_list (Victor Fernandez de Alba)
- Add externals to carousel (Victor Fernandez de Alba)
- Add sort_on (Victor Fernandez de Alba)
- Merge pull request #60 from kitconcept/query (Víctor Fernández de Alba)
- adding querystringsidebarwidget (iFlameing)
- Small adjustments, add more jq transformers to the export middleware (Victor Fernandez de Alba)
- reenable useLargeContainer option in TextPill Block (#59) (steffenri)
- Improve color picker default: now is white (as transparent) instead of black. Added a border to the button. (Victor Fernandez de Alba)

### Bugfix

- Fix to TeaserHeros (Victor Fernandez de Alba)
- Slight CSS correction (Victor Fernandez de Alba)
- Allow the carousel to have 5 elements in one frame @iFlameing

### Internal

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
