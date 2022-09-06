# SYSTEM
Think of the System Class as a Physical, Hand-held Video Game System. It has a screen, handles memory, receives inputs, etc.

## PROPS
_The System Class has no Props, as it is the Parent class, and isn't very configurable_

## EXPORTED METHODS
These Methods are accessible to any other Class that uses the **System Action Handler**
### START LOADING
`startLoading(callback)`
Tells the Load Manager that loading is happening
### STOP LOADING
`stopLoading()`
Tells the Load Manager that loading is complete
### LOAD IMAGE
`loadImage(images,callback)`
Uses the Image Manager to Load an Image
### FETCH IMAGE
`fetchImage(imageName)`
Uses the Image Manager to Fetch a Stored Image