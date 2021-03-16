import SpatialNavigation from 'spatial-navigation-js'

SpatialNavigation.init()
 
// Define navigable elements (anchors and elements with "focusable" class).
SpatialNavigation.add({
	selector: '.focusable'
})

// Make the *currently existing* navigable elements focusable.
SpatialNavigation.makeFocusable()

// Focus the first navigable element.
SpatialNavigation.focus()