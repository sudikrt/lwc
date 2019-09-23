import { LightningElement, api } from 'lwc';
import { loadScript } from  'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import youtube from '@salesforce/resourceUrl/youtube'
export default class SampleYoutubePlayer extends LightningElement {
    @api youtubeId;
    player;

    renderedCallback () {
        if (!this.youtubeId) {
            return;
        }
        if (window.YT) {
            if (this.player) {
                this.player.cueVideoById(this.youTubeId);
            } else {
                this.onYouTubeIframeAPIReady ();
            }
        } else {
            Promise.all ([
                loadScript (this, youtube + '/iframe_api.js'),
                loadScript (this, youtube + '/widget_api.js')
            ]).then (() => {
                    this.onYouTubeIframeAPIReady ();
            }).catch (error => this.showErrorToast(error))
        }
    }
    showErrorToast (data) {
        const eve = ShowToastEvent ({
            title : 'Error in loading player',
            message : data,
            variant : 'error'
        });
        this.dispatchEvent (eve);
    }
    onPlayerError (e) {
        let data = '';
        if (e.data === 2) {
            data = 'Invalid video Id';
        } else if (e.data === 5) {
            data = 'The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.';
        } else if (e.data === 100) {
            data = 'The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.';
        } else if (e.data  === 101 || e.data === 150){
            data = 'The owner of the requested video does not allow it to be played in embedded players.';
        }
        this.showErrorToast (data);
    }
    onYouTubeIframeAPIReady () {
        const youtubeWrapper  = this.template.querySelector ('.player');
        const playerEle = document.createElement ('DIV');
        playerEle.className = 'player';
        youtubeWrapper.appendChild (playerEle);
        this.player = new window.YT.Player (playerEle, {
            height : '390',
            width : '390',
            videoId : this.youtubeId,
            events : {
                onError: this.onPlayerError.bind(this)
            }
        })
    }
}