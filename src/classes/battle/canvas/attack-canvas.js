import config from "../../../config";
import GameCanvas from "../../canvas";

class AttackCanvas extends GameCanvas{
  constructor(drawCB,...args){
    super(...args);

    this.drawCB = () => drawCB(); // Refresh Battle Canvas CB
  }

  /**------------------------------------------------------------------------
   * ANIMATE ATTACK
   * ------------------------------------------------------------------------
   * Draws the attack to the canvas
   * ------------------------------------------------------------------------
   * @param {Number}  targetSpot    Index for getting hit | -1 = all
   * @param {Boolean} isTargetEnemy Whether the Target is an Enemy or not
   * @param {Array}   images        List of Objects with img and frame count
   * @param {Func}    callback      Callback to run after the animation is done
   * ----------------------------------------------------------------------*/
  animateAttack = (targetSpot,isTargetEnemy,images,callback) => {
    if(!isTargetEnemy) this.flip();
    let targets = targetSpot === 'all' ? [0,1,2] : [targetSpot];

    let i = 1;  // Index for current Frame of Attack
    let f = 0;  // Counter for how long a frame should be shown
    let t = 0;  // Counter for current target

    this.paintAttackFrame(targetSpot,images[0].img)
    
    let animationInterval = setInterval(()=>{
      f++;
      if(f > images[i].frameCount){ // If frame is done, move on to next one 
        this.paintAttackFrame(targets[t],images[i].img)
        i++; f = 0 
      }
      if(i >= images.length){ // Last frame
        if(t === targets.length - 1){ // At last target wrap up
          if(!isTargetEnemy) this.flip();
          clearInterval(animationInterval);
          callback();
        } else { t++; f = 0; i = 0 } // Go up 1 target, reset frames
      }
    },66);
  }

  /**------------------------------------------------------------------------
   * PAINT ATTACK FRAME
   * ------------------------------------------------------------------------
   * Draws the specific frame to the canvas
   * ------------------------------------------------------------------------
   * @param {Number}  targetIndex Index for getting hit | -1 = all
   * @param {Image}   frame       Image for the frame
   * ----------------------------------------------------------------------*/
  paintAttackFrame = (targetIndex,frame) => {
    this.clearCanvas();
    this.paintImage(frame,0,(4 * targetIndex)*config.tileSize)
    this.drawCB();
  }
}

export default AttackCanvas;