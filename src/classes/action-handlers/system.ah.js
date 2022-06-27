/**------------------------------------------------------------------------
 * SYSTEM ACTION HANDLER
 * ------------------------------------------------------------------------
 * Maintains Callbacks (actions) for the System
 * ------
 * Action Handlers create an interface for lower-level Objects to act on
 * higher-level Objects
 * ------
 * Still trying to figure this out, because it's confusing to me, but the IDEA
 * is that you pass this Object into children, and they can send stuff back to the parent
 * ------
 * Pass in Parent Object methods to Constructor
 * ------
 * I'm thinking there should be no methods. Just callbacks in the constructors
 * ----------------------------------------------------------------------*/
 class SystemAH{
    constructor(loadImagesCB,fetchImageCB,startLoadingCB,stopLoadingCB){
        this.loadImages = (images, callback) => { loadImagesCB(images,callback) }
        this.fetchImage = image => { return fetchImageCB(image) }
        this.startLoading = callback => startLoadingCB(callback)
        this.stopLoading = () => stopLoadingCB()
    }
}

export default SystemAH;