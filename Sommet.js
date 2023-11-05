
class Sommet{
    
    nom     ;
    links   ;

    constructor(nom){
        this.nom    = nom           ;
        this.links  = new Array()   ;
    }

    addLink(otherSommet,distance){
        var isReady = true ;

        for (const link of this.links) {
            
            if( objectInArrayByReference(otherSommet, link.sommets) ){
                isReady = false ;
                console.error("link already exists why would you link again !");
            }
        }
        for (const link of otherSommet.links) {
            if( objectInArrayByReference(this , link.sommets) ){
                isReady = false ;
                console.error("link already exists why would you link again !");
            }
        }
        
        if(isReady){
            var link = new Link(this,otherSommet,distance)
            this.links.push(link);
            otherSommet.links.push(link);
        }

    }
}