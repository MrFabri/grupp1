export class FilterByType {
    
    online = document.querySelector("#online");
    onSite = document.querySelector("#onsite");

    filter (challenge) {
        if (this.online.checked && challenge.type == "online") {
            
            return true;
            
        } else if (this.onSite.checked && challenge.type === "onsite") {

            return true;
        
        } else {
            return false;
        }
    }

    checkDOM() {
        if (this.online.checked || this.onSite.checked) {
            return true;
        } else {
            return false;
        }
    }
}